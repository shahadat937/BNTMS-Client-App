import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators,FormControl,FormGroupDirective,NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AttendanceService} from '../../../attendance-management/service/attendance.service'
import { SelectedModel } from '../../../core/models/selectedModel';
import {CodeValueService} from '../../../basic-setup/service/codevalue.service';
import {MasterData} from '../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConfirmService} from '../../../core/service/confirm.service';
import {TraineeNominationService} from '../../../course-management/service/traineenomination.service';
import {CheckboxSelectedModel} from '../../../core/models/checkboxSelectedModel';
import { TraineeList } from '../../../attendance-management/models/traineeList';
import { DatePipe } from '@angular/common';
import{ClassRoutineService} from '../../../routine-management/service/classroutine.service'
import {BNAExamMarkService} from '../../../central-exam/service/bnaexammark.service'


@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendancetraineelist.component.html',
  styleUrls: ['./new-attendancetraineelist.component.sass']
}) 
export class NewAttendanceTraineeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  myModel = true;
  buttonText:string;
  pageTitle: string;
  destination:string;
  AttendanceForm: FormGroup;
  validationErrors: string[] = [];
  selectedclassroutine:SelectedModel[];
  selectedbaseschools:SelectedModel[];
  selectedcoursename:SelectedModel[];
  selectedbnasubjectname:SelectedModel[];
  selectedclassperiod:SelectedModel[];
  selectedbnaattendanceremark:SelectedModel[];
  selectedCourse:SelectedModel[];
  selectedClassPeriodByBaseSchoolNameIdAndCourseNameId:SelectedModel[];
  selectedCourseDurationByParameterRequest:number;
  traineeNominationListForAttendance: TraineeList[];
  selectedvalues:CheckboxSelectedModel[];
  traineeForm: FormGroup;
  subjectNamefromClassRoutine:SelectedModel[];
  selectedCourseDurationByCourseTypeAndCourseName:SelectedModel[];
  subjectName:string;
  bnaSubjectNameId:any;
  classRoutineId:any;
  attendanceDate:any;
  courseDurationId:any;
  courseNameId:any;
  isLoading = false;
  displayedColumnsList: string[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  searchText="";

  displayedColumnsRoutine: string[] = ['ser','bnaSubjectName','date','timeDuration', 'actions'];
  dataSource;
  checked = false;
  isShown: boolean = false ;
  isShownForTraineeList:boolean=false;
  constructor(private snackBar: MatSnackBar,private BNAExamMarkService :BNAExamMarkService,private classRoutineService:ClassRoutineService,private datepipe:DatePipe, private confirmService: ConfirmService,private traineeNominationService:TraineeNominationService,private CodeValueService: CodeValueService,private AttendanceService: AttendanceService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('attendanceId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.bnaSubjectNameId=this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    this.attendanceDate=this.route.snapshot.paramMap.get('date'); 
    this.classRoutineId=this.route.snapshot.paramMap.get('classRoutineId'); 

    console.log("course duration id")
    console.log(this.courseDurationId);
    if (id) {
      this.pageTitle = 'Edit Attendance'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.AttendanceService.find(+id).subscribe(
        res => {
          this.AttendanceForm.patchValue({          
            attendanceId:res.attendanceId, 
            classRoutineId: res.classRoutineId, 
            baseSchoolNameId:res.baseSchoolNameId, 
            courseNameId:res.courseNameId, 
            bnaSubjectNameId:res.bnaSubjectNameId, 
            classPeriodId:res.classPeriodId,
            bnaAttendanceRemarksId:res.bnaAttendanceRemarksId,
            attendanceDate:res.attendanceDate,
            classLeaderName:res.classLeaderName,
            attendanceStatus:res.attendanceStatus,
            isApproved:res.isApproved,
            approvedUser:res.approvedUser,
            approvedDate:res.approvedDate,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Attendance';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getTraineeNominationByCourseDurationId();
    this.getTraineeList();
     this.getselectedbnaattendanceremark();
  }
  getTraineeList(){
    
    
  }
  intitializeForm() {
    this.AttendanceForm = this.fb.group({
      attendanceId: [0],
      baseSchoolNameId:[''],
      bnaSubjectNameId:[''],
      courseNameId:[''],
      courseDurationId:[''],
      classRoutineId:[''],
      classPeriodId:[''], 
      status:[0],
      attendanceDate:[], 
      classLeaderName:[''],
      attendanceStatus:[true],
      traineeListForm: this.fb.array([this.createTraineeData()]),
    })
  }
  getControlLabel(index: number,type: string){
    return  (this.AttendanceForm.get('traineeListForm') as FormArray).at(index).get(type).value;
   }
  private createTraineeData() {
  
    return this.fb.group({
      attendanceId: [],
      baseSchoolNameId:[''],
      courseNameId:[''],
      classPeriodId:[''], 
      bnaSubjectNameId:[''],
      classRoutineId:[''],
      courseDurationId:[''],
      attendanceDate:[],
      attendanceStatus: [''],
      bnaAttendanceRemarksId: [''], 
      traineeId: [''],
      traineePNo:[''],
      traineeName:[''],
      classLeaderName:[''],
      rankPosition:[''],
      dateCreated:[],
      createdBy:[],
    });
  }

  clearList() {
    const control = <FormArray>this.AttendanceForm.controls["traineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }
  getTraineeNominationByCourseDurationId(){
    this.traineeNominationService.getTraineeNominationByCourseDurationId(this.courseDurationId,0).subscribe(res=>{
      this.traineeNominationListForAttendance=res; 
      for(let i=0;i < this.traineeNominationListForAttendance.length;i++ ){
        this.traineeNominationListForAttendance[i].attendanceStatus=true;
      }
    //  this.traineeNominationListForAttendance.find(x=>x.attendanceStatus=true);
      //this.traineeNominationListForAttendance=true
      console.log("Trainee Nomination")
      console.log(this.traineeNominationListForAttendance);
    this.clearList();
    this.getTraineeListonClick();
     });
  }
  getTraineeListonClick(){
    const control = <FormArray>this.AttendanceForm.controls["traineeListForm"];
    // console.log(this.dataSource)   
    
  
    for (let i = 0; i < this.traineeNominationListForAttendance.length; i++) {
      control.push(this.createTraineeData()); 
      console.log("data source");
        console.log(this.traineeNominationListForAttendance[i])
    }
    this.AttendanceForm.patchValue({ traineeListForm: this.traineeNominationListForAttendance });
   }

  getselectedclassroutine(){
    this.AttendanceService.getselectedclassroutine().subscribe(res=>{
      this.selectedclassroutine=res
    });
  } 

  getselectedbaseschools(){
    this.AttendanceService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschools=res
    });
  } 

  getselectedcoursename(){
    this.AttendanceService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
    });
  }

  getselectedbnasubjectname(){
    this.AttendanceService.getselectedbnasubjectname().subscribe(res=>{
      this.selectedbnasubjectname=res
    });
  }
  getselectedclassperiod(){
    this.AttendanceService.getselectedclassperiod().subscribe(res=>{
      this.selectedclassperiod=res
    });
  }

  getselectedbnaattendanceremark(){
    this.AttendanceService.getselectedbnaattendanceremark().subscribe(res=>{
      this.selectedbnaattendanceremark=res
    });
  }

  onSubmit() {
    const id = this.AttendanceForm.get('attendanceId').value;

   this.AttendanceForm.get('courseDurationId').setValue(this.courseDurationId);
   this.AttendanceForm.get('bnaSubjectNameId').setValue(this.bnaSubjectNameId);
   this.AttendanceForm.get('attendanceDate').setValue(this.attendanceDate);
   this.AttendanceForm.get('classRoutineId').setValue(this.classRoutineId);

    console.log(this.AttendanceForm.value)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.AttendanceService.update(+id,JSON.stringify(this.AttendanceForm.value)).subscribe(response => {
            this.router.navigateByUrl('/attendance-management/add-attendance');
            this.snackBar.open('Information Updated Successfully ', '', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
          }, error => {
            this.validationErrors = error;
          })
        }
      })
    }else {
      this.loading=true;
      this.AttendanceService.submitAttendance(this.AttendanceForm.value).subscribe(response => {
        this.router.navigateByUrl('/jcos-training/add-jcosattendance');

        this.snackBar.open('Information Inserted Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
      }, error => {
        this.validationErrors = error;
      })
    }
  }
}

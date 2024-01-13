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
import {TraineeNomination} from '../../../course-management/models/traineenomination';
import { SelectionModel } from '@angular/cdk/collections';
import { Attendance } from '../../../attendance-management/models/attendance';
import {CheckboxSelectedModel} from '../../../core/models/checkboxSelectedModel';
import { TraineeList } from '../../../attendance-management/models/traineeList';
import { DatePipe } from '@angular/common';
import{ClassRoutineService} from '../../../routine-management/service/classroutine.service'
import {BNAExamMarkService} from '../../../central-exam/service/bnaexammark.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClassRoutine } from '../../../routine-management/models/classroutine';
import { TraineeListForExamMark } from 'src/app/exam-management/models/traineeListforexammark';

@Component({
  selector: 'app-new-indexno',
  templateUrl: './new-indexno.component.html',
  styleUrls: ['./new-indexno.component.sass']
}) 
export class NewIndexNoComponent implements OnInit {
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
  bnaSubjectNameId:number;
  classRoutineId:number;
  courseDurationId:any;
  courseNameId:any;
  isLoading = false;
  displayedColumnsList: string[];
  traineeList:TraineeListForExamMark[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  searchText="";

  displayedColumnsRoutine: string[] = ['ser','bnaSubjectName','date','timeDuration', 'actions'];
   dataSource: MatTableDataSource<ClassRoutine> = new MatTableDataSource();

  checked = false;
  isShown: boolean = false ;
  isShownForTraineeList:boolean=false;
  // displayedColumns: string[] = ['ser','traineePNo','attendanceStatus','bnaAttendanceRemarksId'];
  // dataSource ;
  constructor(private snackBar: MatSnackBar,private BNAExamMarkService :BNAExamMarkService,private classRoutineService:ClassRoutineService,private datepipe:DatePipe, private confirmService: ConfirmService,private traineeNominationService:TraineeNominationService,private CodeValueService: CodeValueService,private AttendanceService: AttendanceService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    // 3136
    const id = this.route.snapshot.paramMap.get('attendanceId'); 
    console.log(id);
    this.courseDurationId=this.route.snapshot.paramMap.get('courseDurationId'); 
    console.log("Course duration id");
    console.log(this.courseDurationId);
    if (id) {
      this.pageTitle = 'Edit Nomination Index'; 
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
      this.pageTitle = 'Create Nomination Index';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    //  this.getselectedclassroutine();
    //  this.getselectedbaseschools();
    //  this.getselectedcoursename();
    //  this.getselectedbnasubjectname();
    //  this.getselectedclassperiod();
    //  this.getselectedbnaattendanceremark();
     this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
  }
  intitializeForm() {
    this.AttendanceForm = this.fb.group({
      attendanceId: [0],
      baseSchoolNameId:[''],
      courseNameId:[''],
      courseNameIds:[''],
      courseDurationId:[''],
      classPeriodId:[''], 
      attendanceDate:[], 
      classLeaderName:[''],
      indexNo:[''],
      attendanceStatus:[true],
      traineeListForm: this.fb.array([this.createTraineeData()]),
    })
  }

  // public int? CourseDurationId { get; set; }
  // public string? PresentBillet { get; set; } 
  // public int? FamilyAllowId { get; set; }
  
  private createTraineeData() {

    return this.fb.group({
      courseNameId: [],
      status: [],
      traineePNo: [],
      courseDurationId:[],
      presentBillet:[],
      examCenterId:[],
      dateCreated:[],
      createdBy:[],
      traineeId: [],
      traineeName: [],
      rankPosition: [],
      indexNo: [],
      traineeNominationId:[],

      examAttemptTypeId:[],
      examTypeId:[],
      familyAllowId:[],
      traineeCourseStatusId:[],
      withdrawnDocId:[],
      withdrawnRemarks:[],
      withdrawnDate:[],
      newAtemptId:[],
      menuPosition:[]
    });
  }

  getControlLabel(index: number, type: string) {
    return (this.AttendanceForm.get('traineeListForm') as FormArray).at(index).get(type).value;
  }

  getTraineeListonClick() {
    const control = <FormArray>this.AttendanceForm.controls["traineeListForm"];
    console.log(this.traineeList)
    for (let i = 0; i < this.traineeList.length; i++) {
      control.push(this.createTraineeData());
    }
    this.AttendanceForm.patchValue({ traineeListForm: this.traineeList });
    console.log("value...");
    console.log(this.traineeList)
  }

  clearList() {
    const control = <FormArray>this.AttendanceForm.controls["traineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  onCourseNameSelectionChangeGetSubjectList(dropdown){
    if (dropdown.isUserInput) {
     this.isShown=true;
      var courseNameArr = dropdown.source.value.split('_');
      this.courseDurationId = courseNameArr[0];
      this.courseNameId = courseNameArr[1];
      this.AttendanceForm.get('courseNameId').setValue(this.courseNameId);
      this.AttendanceForm.get('courseDurationId').setValue(this.courseDurationId);

      console.log("Course duration id");
      console.log(this.courseDurationId);
      this.traineeNominationService.getTestTraineeNominationByCourseDurationId(this.courseDurationId,0).subscribe(res => {
        this.traineeList = res;
        console.log("trainee List");
        console.log(this.traineeList);
        this.clearList();
        this.getTraineeListonClick();
      });
    }
  }


  getSelectedCourseDurationByCourseTypeIdAndCourseNameId(){
    this.BNAExamMarkService.getSelectedCourseDurationByCourseTypeIdAndCourseNameId(MasterData.coursetype.CentralExam,MasterData.courseName.QExam).subscribe(res => {
      this.selectedCourseDurationByCourseTypeAndCourseName = res;
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }


  // getselectedclassroutine(){
  //   this.AttendanceService.getselectedclassroutine().subscribe(res=>{
  //     this.selectedclassroutine=res
  //   });
  // } 

  // getselectedbaseschools(){
  //   this.AttendanceService.getselectedbaseschools().subscribe(res=>{
  //     this.selectedbaseschools=res
  //   });
  // } 

  // getselectedcoursename(){
  //   this.AttendanceService.getselectedcoursename().subscribe(res=>{
  //     this.selectedcoursename=res
  //   });
  // }

  // getselectedbnasubjectname(){
  //   this.AttendanceService.getselectedbnasubjectname().subscribe(res=>{
  //     this.selectedbnasubjectname=res
  //   });
  // }
  // getselectedclassperiod(){
  //   this.AttendanceService.getselectedclassperiod().subscribe(res=>{
  //     this.selectedclassperiod=res
  //   });
  // }

  // getselectedbnaattendanceremark(){
  //   this.AttendanceService.getselectedbnaattendanceremark().subscribe(res=>{
  //     this.selectedbnaattendanceremark=res
  //   });
  // }

  onSubmit() {

  //  const id = this.AttendanceForm.get('traineeNominationId').value;

    console.log(this.AttendanceForm.value);
    // if (id) {
    //   this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
    //     console.log(result);
    //     if (result) {
    //       this.traineeNominationService.update(+id, JSON.stringify(this.AttendanceForm.value)).subscribe(response => {
    //         this.router.navigateByUrl('/exam-management/bnaexammark-list');
    //         this.snackBar.open('Information Updated Successfully ', '', {
    //           duration: 2000,
    //           verticalPosition: 'bottom',
    //           horizontalPosition: 'right',
    //           panelClass: 'snackbar-success'
    //         });
    //       }, error => {
    //         this.validationErrors = error;
    //       })
    //     }
    //   })
    // } else {
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.traineeNominationService.updateTraineeNominationList(this.AttendanceForm.value).subscribe(response => {
            this.reloadCurrentRoute();
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
      })

    }
  }
// }

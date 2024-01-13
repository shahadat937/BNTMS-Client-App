import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators,FormControl,FormGroupDirective,NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from '../../service/attendance.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { TraineeNominationService } from 'src/app/course-management/service/traineenomination.service';
import { TraineeNomination } from 'src/app/course-management/models/traineenomination';
import { SelectionModel } from '@angular/cdk/collections';
import { Attendance } from '../../models/attendance';
import { CheckboxSelectedModel } from 'src/app/core/models/checkboxSelectedModel';
import { TraineeList } from '../../models/traineeList';
import { DatePipe } from '@angular/common';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';


@Component({
  selector: 'app-attendance-approved',
  templateUrl: './attendance-approved.component.html',
  styleUrls: ['./attendance-approved.component.sass']
})
export class AttendanceApprovedComponent implements OnInit {
   masterData = MasterData;
  loading = false;
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
  selectedClassPeriodByBaseSchoolNameIdAndCourseNameIdforAttendanceApprove:SelectedModel[];
  subjectName:string;
  bnaSubjectNameId:number;
  classRoutineId:number;
  isShown: boolean = false ;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  //checked = false;
  // selection = new SelectionModel<Attendance>(true, []);
  displayedColumns: string[] = ['ser','traineePNo','attendanceStatus','bnaAttendanceRemarksId'];
  dataSource ;
  constructor(private snackBar: MatSnackBar,private classRoutineService:ClassRoutineService,private datepipe:DatePipe, private confirmService: ConfirmService,private traineeNominationService:TraineeNominationService,private CodeValueService: CodeValueService,private AttendanceService: AttendanceService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('attendanceId'); 
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
            attendanceDate:res.attendanceDate,
            classLeaderName:res.classLeaderName,
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
      this.pageTitle = 'Approve Attendance';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
     this.getselectedclassroutine();
     this.getselectedbaseschools();
     this.getselectedcoursename();
     this.getselectedbnasubjectname();
     this.getselectedclassperiod();
     this.getselectedbnaattendanceremark();
    // this.getAttendanceListForUpdate();
  }
  intitializeForm() {
    this.AttendanceForm = this.fb.group({
      attendanceId: [0],
      baseSchoolNameId:[''],
      courseNameId:[''],
      classPeriodId:[''], 
      attendanceDate:[], 
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
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
  getTraineeListonClick(){
    const control = <FormArray>this.AttendanceForm.controls["traineeListForm"];
    // console.log(this.dataSource)   
    
  
    for (let i = 0; i < this.dataSource.length; i++) {
      control.push(this.createTraineeData()); 
      //  console.log(this.dataSource[i])
    }
    this.AttendanceForm.patchValue({ traineeListForm: this.dataSource });
   }

  // getAttendanceListForUpdate() {
  //   this.AttendanceService.getAttendanceListForUpdate(this.paging.pageIndex, this.paging.pageSize,this.searchText,baseSchoolNameId,courseNameId,classPeriodId).subscribe(response => {
  //   this.dataSource = response.items; 
  //   this.paging.length = response.totalItemsCount    
  //   this.getTraineeListonClick();
  //    console.log(this.dataSource);
  //   })
  // }

  onBaseSchoolNameSelectionChangeGetCourse(baseSchoolNameId){
      this.AttendanceService.getCourseByBaseSchoolNameId(baseSchoolNameId).subscribe(res=>{
        this.selectedCourse=res
      });
     }
      get f() { return this.AttendanceForm.controls; }
      get t() { return this.f.traineeLists as FormArray; }

     onClassPeriodSelectionChangeGetCourseDuration(){      
      var baseSchoolNameId=this.AttendanceForm.value['baseSchoolNameId'];
      var courseNameId=this.AttendanceForm.value['courseNameId']; 
      var classPeriodId=this.AttendanceForm.value['classPeriodId']; 
      var date=this.AttendanceForm.value['attendanceDate']; 

      var  formatedDate=this.datepipe.transform((date), 'MM/dd/yyyy');
      // this.classRoutineService.getSubjectNameFromRoutine(baseSchoolNameId,courseNameId,formatedDate,classPeriodId).subscribe(res=>{
      //   this.subjectNamefromClassRoutine=res;
      //         for (let i =0; i < this.subjectNamefromClassRoutine.length; i++) {
      //               this.bnaSubjectNameId= this.subjectNamefromClassRoutine[i].value
      //              }  
      // })

      this.classRoutineService.getSelectedRoutineId(baseSchoolNameId,courseNameId,classPeriodId).subscribe(res=>{
        this.classRoutineId=res;
      })

       if(baseSchoolNameId != null && courseNameId != null && classPeriodId !=null){
        this.AttendanceService.getSelectedCourseDurationByParameterRequestFromClassRoutine(baseSchoolNameId,courseNameId,classPeriodId).subscribe(res=>{
          this.selectedCourseDurationByParameterRequest=res;  
         this.traineeNominationService.getTraineeNominationByCourseDurationId(this.selectedCourseDurationByParameterRequest).subscribe(res=>{
          this.traineeNominationListForAttendance=res; 
         });
        });
      }  
      this.isShown=true;
      this.clearList();
      
        this.AttendanceService.getAttendanceListForUpdate(this.paging.pageIndex, this.paging.pageSize,this.searchText,baseSchoolNameId,courseNameId,classPeriodId).subscribe(response => {
        this.dataSource = response.items; 
        this.paging.length = response.totalItemsCount    
        this.getTraineeListonClick();
         console.log(this.dataSource);
        })
     }

     onDateSelectionChange(event){
      var date=this.datepipe.transform((event.value), 'MM/dd/yyyy');
           console.log(date);
           var baseSchoolNameId=this.AttendanceForm.value['baseSchoolNameId'];
           var courseNameId=this.AttendanceForm.value['courseNameId'];
            console.log(baseSchoolNameId +" -"+courseNameId);
            if(baseSchoolNameId != null && courseNameId != null){
              this.AttendanceService.getSelectedClassPeriodByBaseSchoolNameIdAndCourseNameIdforAttendances(baseSchoolNameId,courseNameId,date).subscribe(res=>{
                this.selectedClassPeriodByBaseSchoolNameIdAndCourseNameIdforAttendanceApprove=res;     
                console.log( this.selectedClassPeriodByBaseSchoolNameIdAndCourseNameId); 
              });
            }  
     }

     onCourseNameSelectionChangeGetClassPeriod(){
     
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
    //console.log(this.AttendanceForm.value);
    // var classLeaderName= this.AttendanceForm.value['classLeaderName'];
    // var attendanceDate= this.AttendanceForm.value['attendanceDate'];
    // var baseSchoolNameId=this.AttendanceForm.value['baseSchoolNameId'];
    // var classPeriodId = this.AttendanceForm.value['classPeriodId'];
 
    //  for (let i = 0; i < this.traineeNominationListForAttendance.length; i++) {
    //   this.traineeNominationListForAttendance[i]["classLeaderName"] = classLeaderName;
    //   this.traineeNominationListForAttendance[i]["attendanceDate"] = this.datepipe.transform((new Date), 'MM/dd/yyyy');
    //   this.traineeNominationListForAttendance[i]["bnaSubjectNameId"] = this.bnaSubjectNameId; 
    //   this.traineeNominationListForAttendance[i]["baseSchoolNameId"] = baseSchoolNameId;
    //   this.traineeNominationListForAttendance[i]["classPeriodId"] = classPeriodId;
    //   this.traineeNominationListForAttendance[i]["classRoutineId"] = this.classRoutineId;
    // }
    
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
       // console.log(result);
        if (result) {
          console.log("dd");
          this.AttendanceService.updateAttendanceList(JSON.stringify(this.AttendanceForm.value)).subscribe(response => {
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
      this.AttendanceService.updateAttendanceList(JSON.stringify(this.AttendanceForm.value)).subscribe(response => {
        // this.router.navigateByUrl('/attendance-management/add-attendance');
        // this.AttendanceForm.reset();
        // this.AttendanceForm.get('attendanceId').setValue(0);
       // this.AttendanceForm.get('isActive').setValue(true);

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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators,FormControl,FormGroupDirective,NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AttendanceService} from '../../../attendance-management/service/attendance.service'
import { SelectedModel } from '../../../core/models/selectedModel';
import {CodeValueService} from '../../../basic-setup/service/codevalue.service';
import {MasterData} from '../../../../../src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConfirmService} from '../../../../../src/app/core/service/confirm.service';
import {TraineeNominationService} from '../../../../app/course-management/service/traineenomination.service';
import {TraineeNomination} from '../../../../app/course-management/models/traineenomination';
import { SelectionModel } from '@angular/cdk/collections';
import { Attendance } from '../../../attendance-management/models/attendance';
import {CheckboxSelectedModel} from '../../../../app/core/models/checkboxSelectedModel';
import { TraineeList } from '../../../attendance-management/models/traineeList';
import { DatePipe } from '@angular/common';
import{ClassRoutineService} from '../../../../app/routine-management/service/classroutine.service'
import {BNAExamMarkService} from '../../../central-exam/service/bnaexammark.service'
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClassRoutine } from '../../../routine-management/models/classroutine';

@Component({
  selector: 'app-new-attendance',
  templateUrl: './new-attendance.component.html',
  styleUrls: ['./new-attendance.component.sass']
}) 
export class NewAttendanceComponent implements OnInit {
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
     this.getselectedclassroutine();
     this.getselectedbaseschools();
     this.getselectedcoursename();
     this.getselectedbnasubjectname();
     this.getselectedclassperiod();
     this.getselectedbnaattendanceremark();
     this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
  }
  intitializeForm() {
    this.AttendanceForm = this.fb.group({
      attendanceId: [0],
      baseSchoolNameId:[''],
      courseNameId:[''],
      courseDurationId:[''],
      classPeriodId:[''], 
      attendanceDate:[], 
      classLeaderName:[''],
      attendanceStatus:[true],
     traineeList: this.fb.array([this.createTraineeData()]),
    })
  }

  onCourseNameSelectionChangeGetSubjectList(dropdown){
    if (dropdown.isUserInput) {
      // console.log(dropdown);
      var courseNameArr = dropdown.source.value.split('_');
      this.courseDurationId = courseNameArr[0];
      this.courseNameId = courseNameArr[1];

      // console.log("courseDurationId");
      // console.log(this.courseDurationId);

      this.AttendanceForm.get('courseNameId').setValue(this.courseNameId);
      this.AttendanceForm.get('courseDurationId').setValue(this.courseDurationId);

      // this.subjectNameService.getSelectedSubjectNameByCourseNameId(courseNameId).subscribe(res => {
      //   this.selectedSubjectNameByCourseNameId = res;
       
      // });

        this.isLoading = true;
        this.classRoutineService.getClassRoutinesByCourseDurationId(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.courseDurationId).subscribe(response => {
            
          this.dataSource.data = response.items.filter(x=>x.attendanceComplete===0); 
          this.paging.length = response.totalItemsCount    
          this.isLoading = false;
          console.log("Subject name");
          console.log(this.dataSource.data);
        })
    }
  }


  getSelectedCourseDurationByCourseTypeIdAndCourseNameId(){
    this.BNAExamMarkService.getSelectedCourseDurationByCourseTypeIdAndCourseNameId(MasterData.coursetype.CentralExam,MasterData.courseName.QExam).subscribe(res => {
      this.selectedCourseDurationByCourseTypeAndCourseName = res;
    });
  }

  onOptionsSelected(index,value) {
    this.traineeNominationListForAttendance[index]["bnaAttendanceRemarksId"] = value;
 }
  onCheckboxChange(index,event) {
    this.traineeNominationListForAttendance[index]["attendanceStatus"] = event.checked;
  }
  private createTraineeData() {
    return this.fb.group({
      bnaAttendanceRemarksId: [''],
       courseDurationId: [''],
      traineeId: [''],

    });
  }

  // if(baseSchoolNameId != null && courseNameId != null && this.courseDurationId !=null && classPeriodId !=null){
    // this.traineeNominationService.getTraineeNominationByCourseDurationId(this.courseDurationId).subscribe(res=>{
    // this.traineeNominationListForAttendance=res; 
    // for(let i=0;i<=this.traineeNominationListForAttendance.length;i++)
    // {
    //   this.traineeNominationListForAttendance[i].attendanceStatus=true
    // }
  //  });
// } 

  
deleteItem(row) {
  const id = row.classRoutineId; 
  this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
    console.log(result);
    if (result) {
      this.classRoutineService.delete(id).subscribe(() => {
        this.classRoutineService.getClassRoutinesByCourseDurationId(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.courseDurationId).subscribe(response => {
            
          this.dataSource.data = response.items.filter(x=>x.attendanceComplete===0); 
          this.paging.length = response.totalItemsCount    
          this.isLoading = false;
          console.log("Subject name");
          console.log(this.dataSource.data);
        })
        this.snackBar.open('Information Deleted Successfully ', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-danger'
        });
      })
    }
  })
  
}

  onBaseSchoolNameSelectionChangeGetCourse(baseSchoolNameId){
      this.AttendanceService.getCourseByBaseSchoolNameId(baseSchoolNameId).subscribe(res=>{
        this.selectedCourse=res
      });
     }
      get f() { return this.AttendanceForm.controls; }
      get t() { return this.f.traineeLists as FormArray; }

     onClassPeriodSelectionChangeGetCourseDuration(){  
      this.isShown=true
      var baseSchoolNameId=this.AttendanceForm.value['baseSchoolNameId'];
      var courseNameId=this.AttendanceForm.value['courseNameId']; 
      var classPeriodId=this.AttendanceForm.value['classPeriodId']; 
      var date=this.AttendanceForm.value['attendanceDate']; 

           var courseNameArr = courseNameId.split('_');
           this.courseDurationId = courseNameArr[0];
           var courseNameId=courseNameArr[1];

      var  formatedDate=this.datepipe.transform((date), 'MM/dd/yyyy');
      this.classRoutineService.getSubjectNameFromRoutine(baseSchoolNameId,courseNameId,formatedDate,classPeriodId,this.courseDurationId).subscribe(res=>{
        this.subjectNamefromClassRoutine=res;
              for (let i =0; i < this.subjectNamefromClassRoutine.length; i++) {
                    this.bnaSubjectNameId= this.subjectNamefromClassRoutine[i].value
                   }  
      })

      this.classRoutineService.getSelectedRoutineId(baseSchoolNameId,courseNameId,classPeriodId).subscribe(res=>{
        this.classRoutineId=res;
      })

       if(baseSchoolNameId != null && courseNameId != null && this.courseDurationId !=null && classPeriodId !=null){
          this.traineeNominationService.getTraineeNominationByCourseDurationId(this.courseDurationId,0).subscribe(res=>{
          this.traineeNominationListForAttendance=res; 
          for(let i=0;i<=this.traineeNominationListForAttendance.length;i++)
          {
            this.traineeNominationListForAttendance[i].attendanceStatus=true
          }
         });
      }  
     }

    //  onDateSelectionChange(event){
    //   var date=this.datepipe.transform((event.value), 'MM/dd/yyyy');
    //        var baseSchoolNameId=this.AttendanceForm.value['baseSchoolNameId'];
    //        var courseNameId=this.AttendanceForm.value['courseNameId'];

    //        var courseNameArr = courseNameId.split('_');
    //        var courseDurationId = courseNameArr[0];
    //        var courseNameId=courseNameArr[1];

    //         if(baseSchoolNameId != null && courseNameId != null  && courseDurationId !=null){
    //           this.AttendanceService.getSelectedClassPeriodByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId,date).subscribe(res=>{
    //             this.selectedClassPeriodByBaseSchoolNameIdAndCourseNameId=res;     
    //             console.log( this.selectedClassPeriodByBaseSchoolNameIdAndCourseNameId); 
    //           });
    //         }  
    //  }

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
    var classLeaderName= this.AttendanceForm.value['classLeaderName'];
    var attendanceDate= this.AttendanceForm.value['attendanceDate'];
    var baseSchoolNameId=this.AttendanceForm.value['baseSchoolNameId'];
    var classPeriodId = this.AttendanceForm.value['classPeriodId'];
 
     for (let i = 0; i < this.traineeNominationListForAttendance.length; i++) {
      this.traineeNominationListForAttendance[i]["classLeaderName"] = classLeaderName;
      this.traineeNominationListForAttendance[i]["attendanceDate"] = this.datepipe.transform((new Date), 'MM/dd/yyyy');
      this.traineeNominationListForAttendance[i]["bnaSubjectNameId"] = this.bnaSubjectNameId; 
      this.traineeNominationListForAttendance[i]["baseSchoolNameId"] = baseSchoolNameId;
      this.traineeNominationListForAttendance[i]["classPeriodId"] = classPeriodId;
      this.traineeNominationListForAttendance[i]["classRoutineId"] = this.classRoutineId;
    }
    console.log(this.AttendanceForm.value)
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.AttendanceService.update(+id,JSON.stringify(this.traineeNominationListForAttendance)).subscribe(response => {
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
      this.AttendanceService.submit(JSON.stringify(this.traineeNominationListForAttendance) ).subscribe(response => {
        this.AttendanceForm.reset();
        this.AttendanceForm.get('attendanceId').setValue(0);
        this.isShown=false;

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

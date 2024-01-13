import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormArray, Validators,FormControl,FormGroupDirective,NgForm} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraineeAssessmentGroupService } from '../service/TraineeAssessmentGroup.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { TraineeNominationService } from 'src/app/course-management/service/traineenomination.service';
import { BNASubjectNameService } from 'src/app/subject-management/service/BNASubjectName.service';
import { TraineeNomination } from 'src/app/course-management/models/traineenomination';
import { SelectionModel } from '@angular/cdk/collections';
// import { Attendance } from '../../models/attendance';
import { CheckboxSelectedModel } from 'src/app/core/models/checkboxSelectedModel';
import { traineeAssessmentGroupList } from '../models/traineeAssessmentGroupList';
import { DatePipe } from '@angular/common';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-new-assessmentgroup',
  templateUrl: './new-assessmentgroup.component.html',
  styleUrls: ['./new-assessmentgroup.component.sass']
}) 
export class NewAssessmentGroupComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  myModel = true;
  userRole = Role;
  buttonText:string;
  pageTitle: string;
  destination:string;
  TraineeAssessmentGroupForm: FormGroup;
  validationErrors: string[] = [];
  selectedclassroutine:SelectedModel[];
  selectedbaseschools:SelectedModel[];
  selectedcoursename:SelectedModel[];
  selectedbnasubjectname:SelectedModel[];
  selectedclassperiod:SelectedModel[];
  selectedbnaattendanceremark:SelectedModel[];
  selectedCourse:SelectedModel[];
  selectedTraineeAssessmentCreates:SelectedModel[];
  selectedCourseDurationByParameterRequest:number;
  traineeNominationListForAttendance: traineeAssessmentGroupList[];
  selectedvalues:CheckboxSelectedModel[];
  traineeForm: FormGroup;
  subjectNamefromClassRoutine:any;
  groupedTraineeList:any[];
  selectedCourseSection:SelectedModel[];
  subjectName:string;
  bnaSubjectNameId:number;
  classRoutineId:number;
  courseDurationId:any;
  selectedMarkType:any;
  role:any;
  traineeId:any;
  branchId:any;
  baseSchoolId:any;
  traineeNominationListForAttendanceNew:any;
  traineeNominationListForAttendanceFilter:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  checked = false;
  isShown: boolean = false ;
  isShowSubjectName:boolean=false;
  isShownForTraineeList:boolean=false;
  displayedColumns: string[] = ['ser','traineePNo','attendanceStatus'];
  dataSource ;
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private subjectNameService: BNASubjectNameService,private classRoutineService:ClassRoutineService,private datepipe:DatePipe, private confirmService: ConfirmService,private traineeNominationService:TraineeNominationService,private CodeValueService: CodeValueService,private traineeAssessmentGroupService: TraineeAssessmentGroupService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    const id = this.route.snapshot.paramMap.get('attendanceId'); 
    
      this.pageTitle = 'Assign Group'; 
      this.destination = "Add"; 
      this.buttonText= "Save" 
       
     this.intitializeForm();
     if(this.role === this.userRole.SuperAdmin || this.role === this.userRole.BNASchool || this.role === this.userRole.JSTISchool){
      // this.TraineeAssessmentGroupForm.get('baseSchoolNameId').setValue(this.branchId);
      this.onBaseSchoolNameSelectionChangeGetCourse(this.branchId);
     }
    //  this.getselectedclassroutine();
    //  this.getselectedbaseschools();
    //  this.getselectedcoursename();
    //  this.getselectedbnasubjectname();
    //  this.getselectedclassperiod();
    //  this.getselectedbnaattendanceremark();
  }
  intitializeForm() {
    this.TraineeAssessmentGroupForm = this.fb.group({
      traineeAssissmentGroupId:[0],
      traineeAssissmentCreateId:[],
      courseName: [''],      
      courseDurationId: [],      
      assissmentGroupName: [''],
      remarks: [''],
      status: [0],
      menuPosition: [],
      isActive: [true],
      assessmentTraineeGroupListForm: this.fb.array([
        this.createTraineeData()
      ]),
    })
  }

  getControlLabel(index: number,type: string){
    return  (this.TraineeAssessmentGroupForm.get('assessmentTraineeGroupListForm') as FormArray).at(index).get(type).value;
   }

   private createTraineeData() {
  
    return this.fb.group({
      traineeNominationId: [],
      traineeId: [],
      selectedStatus:[],
      rankPosition:[''],
      traineeName:[''],
      traineePNo:[''],
    });
  }
  clearList() {
    const control = <FormArray>this.TraineeAssessmentGroupForm.controls["assessmentTraineeGroupListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  getTraineeListonClick(){
    const control = <FormArray>this.TraineeAssessmentGroupForm.controls["assessmentTraineeGroupListForm"];
    // console.log(this.dataSource)   
    
  
    for (let i = 0; i < this.traineeNominationListForAttendance.length; i++) {
      control.push(this.createTraineeData()); 
      // console.log(this.traineeNominationListForAttendance[i])
    }
    this.TraineeAssessmentGroupForm.patchValue({ assessmentTraineeGroupListForm: this.traineeNominationListForAttendance });
   }
  
  onBaseSchoolNameSelectionChangeGetCourse(baseSchoolNameId){
      this.traineeAssessmentGroupService.getCourseByBaseSchoolNameId(baseSchoolNameId).subscribe(res=>{
        this.selectedCourse=res;
        console.log(res);
      });
    }
    onCourseSelectionGetTraineeList(){ 
      var course = this.TraineeAssessmentGroupForm.value['courseName']; 
      console.log(course);
      this.isShown = true;
      var courseNameArr = course.split('_');
      this.courseDurationId = courseNameArr[0];
      var courseNameId=courseNameArr[1];

      this.TraineeAssessmentGroupForm.get('courseDurationId').setValue(this.courseDurationId);

        this.traineeAssessmentGroupService.getSelectedTraineeAssessmentCreates(this.courseDurationId).subscribe(res=>{
          this.selectedTraineeAssessmentCreates=res
        });

      this.traineeNominationService.getTraineeNominationsListForAssessmentGroupByCourseDurationIdAndTraineeId(this.courseDurationId).subscribe(res=>{
        this.traineeNominationListForAttendance=res.filter(x=>x.withdrawnTypeId === null);

        console.log(this.traineeNominationListForAttendance);

        this.clearList();
        this.getTraineeListonClick();
        
        // for(let i=0;i<=this.traineeNominationListForAttendance.length;i++)
        // {
        //   this.traineeNominationListForAttendance[i].attendanceStatus=true;
        //   this.traineeNominationListForAttendance[i].absentForExamStatus=false;
        // }
       });
    }
      get f() { return this.TraineeAssessmentGroupForm.controls; }
      get t() { return this.f.traineeLists as FormArray; }

     

     

   

  // getselectedbaseschools(){
  //   this.traineeAssessmentGroupService.getselectedbaseschools().subscribe(res=>{
  //     this.selectedbaseschools=res
  //   });
  // } 

  

  // getselectedbnasubjectname(){
  //   this.traineeAssessmentGroupService.getselectedbnasubjectname().subscribe(res=>{
  //     this.selectedbnasubjectname=res
  //   });
  // }
  // getselectedclassperiod(){
  //   this.traineeAssessmentGroupService.getselectedclassperiod().subscribe(res=>{
  //     this.selectedclassperiod=res
  //   });
  // }

  

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    console.log(this.TraineeAssessmentGroupForm.value)
    
    this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
      console.log(result);
      if (result) {
        this.loading=true;
        this.traineeAssessmentGroupService.saveTraineeAssessmentGrouplist(JSON.stringify(this.TraineeAssessmentGroupForm.value)).subscribe(response => {
         this.reloadCurrentRoute();
        //  this.router.navigateByUrl(`/admin/dashboard/courseoutline-list/${this.courseDurationId}`);
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

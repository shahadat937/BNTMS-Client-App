import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { BNAExamMarkService } from '../../service/bnaexammark.service';
// import {BNAExamMarkService} from '../../../central-exam/service/bnaexammark.service'
import {StudentDashboardService} from '../services/StudentDashboard.service';
import { SelectedModel } from '../../core/models/selectedModel';
import {CodeValueService} from '../../basic-setup/service/codevalue.service'
import {MasterData} from '../../../assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConfirmService} from '../../../app/core/service/confirm.service';
 import {BNASubjectName} from '../../subject-management/models/BNASubjectName'
import { SubjectMark } from '../../subject-management/models/SubjectMark';
import { TraineeNominationService } from '../../course-management/service/traineenomination.service'
import { TraineeList } from '../../attendance-management/models/traineeList';
import {TraineeListForExamMark} from '../../exam-management/models/traineeListforexammark';
import {BNASubjectNameService} from '../../bna-subject-management/service/BNASubjectName.service';
import {SubjectMarkService} from '../../bna-subject-management/service/SubjectMark.service';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { MarkTypeService } from 'src/app/basic-setup/service/MarkType.service';
import { AuthService } from 'src/app/core/service/auth.service';
import {Location} from '@angular/common';
//import {BnaSubjectName} from '../../../central-exam/models/BNASubjectName';

@Component({
  selector: 'app-new-assessmentmark',
  templateUrl: './new-assessmentmark.component.html',
  styleUrls: ['./new-assessmentmark.component.sass']
})
export class NewAssessmentMarkComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText: string;
  pageTitle: string;
  destination: string;
  TraineeAssessmentMarkForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools: SelectedModel[];
  showHideDiv= false;
  selectedcoursename: SelectedModel[];
  selectedcoursedurationbyschoolname: SelectedModel[];
  selectedClassTypeByBaseSchoolNameIdAndCourseNameId: SelectedModel[];
  selectedSubjectNameByBaseSchoolNameIdAndCourseNameId: SelectedModel[];
  selectedmarktype: SelectedModel[];
  selectedcoursModulebySchoolAndCourse: SelectedModel[];
  selectedmarkremarks: SelectedModel[];
  getTotalMarkAndPassMark: BNASubjectName;
  totalMark: string;
  baseSchoolNameId: number;
  classRoutineId: number;
  bnaSubjectNameId: number;
  passMarkBna: string;
  subjectPassMark:any;
  subjectMarkList: SubjectMark[]
  selectedCourseDuration: number;
  traineeList: any[];
  examTypeCount: number;
  selectedCourseDurationByCourseTypeAndCourseName:SelectedModel[];
  selectedSubjectNameByCourseNameId:SelectedModel[];
  selectedBranch:SelectedModel[];
  courseDurationId:any;
  markTypeName:any;
  subjectNameList: any[];
  mark:any;
  subjectName:any;
  courseName:any;
  markType:any;
  isBigger:boolean =false;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  role:any;
  traineeId:any;
  branchId:any;

  courseNameId:any;
  courseTypeId:any;
  displayedColumns: string[] = ['sl', 'markType', 'passMark', 'mark'];
  displayedColumnsForTraineeList: string[] = ['sl', 'traineePNo', 'traineeName', 'obtaintMark', 'examMarkRemarksId'];

  constructor(private snackBar: MatSnackBar, private _location: Location, private authService: AuthService, private traineeNominationService: TraineeNominationService, private confirmService: ConfirmService, private studentDashboardService: StudentDashboardService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    
      this.pageTitle = 'Submit Assessment Mark';
      this.destination = "Submit";
      this.buttonText = "Save";

    this.intitializeForm();
    this.setParamDataToForm(this.traineeId);
    //this.getselectedbaseschools();
    //this.getselectedcoursename();
    //this.getSelectedMarkType();
    // this.getselectedexammarkremark();
    //..................................
    //this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
    //this.getSelectedBranch();
  }
  backClicked() {
    this._location.back();
  }
  setParamDataToForm(traineeId){
    // this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    var traineeAssessmentCreateId = this.route.snapshot.paramMap.get('traineeAssessmentCreateId');

    console.log(baseSchoolNameId,this.courseDurationId,traineeAssessmentCreateId,traineeId)

    this.TraineeAssessmentMarkForm.get('baseSchoolNameId').setValue(baseSchoolNameId);
    this.TraineeAssessmentMarkForm.get('courseDurationId').setValue(this.courseDurationId);
    this.TraineeAssessmentMarkForm.get('assessmentTraineeId').setValue(traineeId);
    this.TraineeAssessmentMarkForm.get('traineeAssessmentCreateId').setValue(traineeAssessmentCreateId);
    // this.TraineeAssessmentMarkForm.get('classRoutineId').setValue(classRoutineId);
    // this.TraineeAssessmentMarkForm.get('branchId').setValue(branchId);
    // this.TraineeAssessmentMarkForm.get('bnaSubjectNameId').setValue(bnaSubjectNameId);
    // this.TraineeAssessmentMarkForm.get('SubjectMarkId').setValue(subjectMarkId);
    // this.TraineeAssessmentMarkForm.get('examTypeCount').setValue(1);
    // this.TraineeAssessmentMarkForm.get('courseSectionId').setValue(courseSectionId);

    // this.markTypeService.find(Number(markTypeId)).subscribe(res => {       
    //   this.markTypeName = res.typeName;
    //   this.onSubjectMarkSelectionGetPassMark();
    // });
 
    this.studentDashboardService.getTraineeListForAssessmentGroupByCourseDurationIdAndTraineeId(this.courseDurationId,traineeId,traineeAssessmentCreateId).subscribe(res => {
      this.traineeList = res;
      console.log("Trainee List");
      console.log(this.traineeList);
      this.clearList()
      this.getTraineeListonClick();
    });

    

  }

  intitializeForm() {
    this.TraineeAssessmentMarkForm = this.fb.group({
      traineeAssessmentMarkId: [0],
      courseDurationId: [],
      baseSchoolNameId: [],
      assessmentTraineeId: [],
      traineeAssessmentCreateId: [],      
      status: [0],
      menuPosition: [0],
      isActive: [true],
      assessmentTraineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
    })
  }
  getControlLabel(index: number, type: string) {
    return (this.TraineeAssessmentMarkForm.get('assessmentTraineeListForm') as FormArray).at(index).get(type).value;
  }
  private createTraineeData() {

    return this.fb.group({      
      traineeNominationId:[],
      traineeAssissmentCreateId:[],
      traineeId:[],
      trainee:[],
      traineeRank:[],
      sailorRank:[],
      position:[],
      knowledge:[],
      staffDuty:[],
      leadeship:[],
      remarks:[''],
    });
  }

  

  getTraineeListonClick() {
    const control = <FormArray>this.TraineeAssessmentMarkForm.controls["assessmentTraineeListForm"];
    console.log(this.traineeList)
    for (let i = 0; i < this.traineeList.length; i++) {
      control.push(this.createTraineeData());
      
    }
    this.TraineeAssessmentMarkForm.patchValue({ assessmentTraineeListForm: this.traineeList });
    
  }

  clearList() {
    const control = <FormArray>this.TraineeAssessmentMarkForm.controls["assessmentTraineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  onSubmit() {
    
    console.log(this.TraineeAssessmentMarkForm.value);
    
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.studentDashboardService.saveTraineeAssessmentMarklist(JSON.stringify(this.TraineeAssessmentMarkForm.value)).subscribe(response => {
           this.TraineeAssessmentMarkForm.reset();
           this.router.navigateByUrl(`/admin/dashboard/traineeassessment-list/${this.courseDurationId}`);
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

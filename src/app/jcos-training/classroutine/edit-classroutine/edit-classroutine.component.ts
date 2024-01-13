import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BNAExamMarkService } from '../../../exam-management/service/bnaexammark.service'
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BNASubjectName } from 'src/app/subject-management/models/BNASubjectName';
import { SubjectMark } from '../../../subject-management/models/SubjectMark';
import {TraineeNominationService} from '../../../course-management/service/traineenomination.service'
import { TraineeList } from '../../../attendance-management/models/traineeList';
import { TraineeListForExamMark } from '../../../exam-management/models/traineeListforexammark';

import { ClassRoutineService } from '../../service/classroutine.service';
import { ClassRoutine } from '../../models/classroutine';

@Component({
  selector: 'app-edit-classroutine',
  templateUrl: './edit-classroutine.component.html',
  styleUrls: ['./edit-classroutine.component.sass']
}) 
export class EditClassRoutineComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  EditedClassRoutineForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools:SelectedModel[];
 
   selectedcoursename:SelectedModel[];
    selectedcoursedurationbyschoolname:SelectedModel[];
    selectedClassTypeByBaseSchoolNameIdAndCourseNameId:SelectedModel[];
    selectedSubjectNameByBaseSchoolNameIdAndCourseNameId:SelectedModel[];
    selectedmarktype:SelectedModel[];
    selectedsubjectname:SelectedModel[];
    getTotalMarkAndPassMark:BNASubjectName;
    totalMark: string;
    baseSchoolNameId:number;
    classRoutineId:number;
    bnaSubjectNameId:number;
    passMarkBna:string;
    subjectMarkList:SubjectMark[];
    isShown: boolean = false ;
    selectedCourseDuration:number;
    traineeList:TraineeListForExamMark[];
    examTypeCount:number;
    selectedRoutineByParametersAndDate:any;
    displayedColumns: string[];

    schoolName:any;
    CourseName:any;
    CourseTitle:any;
    weekName:any;

    schoolId:any;
    durationId:any;
    courseId:any;
    weekId:any;
    editedRoutineList:ClassRoutine[];

    ApproveMsgScreen: boolean = false ;
    ApproveMsg:string;


    paging = {
      pageIndex: this.masterData.paging.pageIndex,
      pageSize: this.masterData.paging.pageSize,
      length: 1
    }
  
  constructor(private snackBar: MatSnackBar,private classRoutineService:ClassRoutineService,private traineeNominationService:TraineeNominationService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BNAExamMarkService: BNAExamMarkService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
     
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.durationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.courseId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.weekId = this.route.snapshot.paramMap.get('courseWeekId'); 
    console.log(this.schoolId,this.durationId,this.courseId,this.weekId);
    
     this.intitializeForm();   
     

    this.getEditedRoutineList(this.schoolId,this.durationId,this.courseId,this.weekId)
    this.getSubjectName(this.schoolId,this.courseId);
    this.getModifiedRoutine(this.schoolId,this.courseId,this.weekId)
  }
  intitializeForm() {
    this.EditedClassRoutineForm = this.fb.group({
      
      RoutineList: this.fb.array([
        this.createTraineeData()
      ]) 
      
    })
  }
  getSubjectName(schoolName,courseName){
    this.classRoutineService.getselectedSubjectNamesBySchoolAndCourse(schoolName,courseName).subscribe(res=>{
      this.selectedsubjectname=res;
      console.log(this.selectedsubjectname)
    });
  }
  getEditedRoutineList(schoolId,durationId,courseId,weekId){
    this.classRoutineService.getClassRoutineListByParams(schoolId,durationId,courseId,weekId).subscribe(res=>{
      this.editedRoutineList=res;
      this.schoolName=this.editedRoutineList[0].baseSchoolName;
      this.CourseName=this.editedRoutineList[0].courseName;
      this.CourseTitle=this.editedRoutineList[0].courseDuration;
      this.weekName=this.editedRoutineList[0].courseWeek;
      console.log(this.editedRoutineList);
      this.clearList();
      this.getEditedRoutineListonClick();
    });
    
  }
  getControlLabel(index: number,type: string){
    return  (this.EditedClassRoutineForm.get('RoutineList') as FormArray).at(index).get(type).value;
   }
  private createTraineeData() {
 
    return this.fb.group({
      classRoutineId: [],
      courseModuleId:[],
      courseNameId:[],
      classPeriodId:[''],
      baseSchoolNameId:[''],
      courseDurationId:[],
      subjectName:[''],
      bnaSubjectNameId:[],
      courseWeekId:[],
      examMarkComplete:[],
      attendanceComplete:[0],
      classTypeId:[],
      classCountPeriod:[],
      subjectCountPeriod:[],
      date:[], 
      classLocation:[''],
      isApproved:[],
      approvedDate:[],
      approvedBy:[],
      status:[],
      isActive: [],
      classPeriod:[],
      classPeriodDurationForm:[],
      classPeriodDurationTo:[],
      classType:[],
    });
  }

  onSubjectNameSelectionChangeGet(dropdown){
    console.log("after subject select")
    console.log(dropdown)
    var courseNameArr = dropdown.value.split('_');
    var bnaSubjectNameId = courseNameArr[0];
    var courseModuleId=courseNameArr[1];
    console.log(bnaSubjectNameId)
    console.log(courseModuleId)
    this.EditedClassRoutineForm.controls["RoutineList"].get('subjectName').setValue(dropdown.text);
    this.EditedClassRoutineForm.controls["RoutineList"].get('bnaSubjectNameId').setValue(bnaSubjectNameId);
    this.EditedClassRoutineForm.controls["RoutineList"].get('courseModuleId').setValue(courseModuleId);
}

  

  getEditedRoutineListonClick(){ 
    const control = <FormArray>this.EditedClassRoutineForm.controls["RoutineList"];
    console.log(this.editedRoutineList)   
    for (let i = 0; i < this.editedRoutineList.length; i++) {
      control.push(this.createTraineeData()); 
      console.log(this.editedRoutineList[i])
    }
    this.EditedClassRoutineForm.patchValue({ RoutineList: this.editedRoutineList });
  }

  clearList() {
    const control = <FormArray>this.EditedClassRoutineForm.controls["RoutineList"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  getModifiedRoutine(baseSchoolNameId,courseNameId,courseWeekId){
    this.isShown=true;
    this.classRoutineService.getClassRoutineByCourseNameBaseSchoolNameSpRequest(baseSchoolNameId,courseNameId,courseWeekId).subscribe(res=>{
      this.selectedRoutineByParametersAndDate=res;
      console.log("Routine by Sp request")
      for(let i=0;i<=this.selectedRoutineByParametersAndDate.length;i++){

       console.log("Date"+this.selectedRoutineByParametersAndDate[i]);
      }
      console.log(this.selectedRoutineByParametersAndDate);

      this.displayedColumns =[...Object.keys(this.selectedRoutineByParametersAndDate[0])];
      console.log([...Object.keys(this.selectedRoutineByParametersAndDate[0])]);
      

      console.log(this.selectedRoutineByParametersAndDate);

    });
  }

  onSubmit() {
    //const id = this.EditedClassRoutineForm.get('bnaExamMarkId').value; 
     
    console.log(this.EditedClassRoutineForm.value);
    
      
    
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.classRoutineService.weeklyRoutineUpdate(JSON.stringify(this.EditedClassRoutineForm.value)).subscribe(response => {                        
            this.getModifiedRoutine(this.schoolId,this.courseId,this.weekId)
            this.snackBar.open('Information Inserted Successfully ', '', {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-warn'
            });
          }, error => {
            this.validationErrors = error;
          })
        }
      })          
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { BNAExamMarkService } from '../../service/bnaexammark.service';
import {BNAExamMarkService} from '../../../central-exam/service/bnaexammark.service'
import { SelectedModel } from '../../../core/models/selectedModel';
import {CodeValueService} from '../../../basic-setup/service/codevalue.service'
import {MasterData} from '../../../../assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import {ConfirmService} from '../../../../app/core/service/confirm.service';
 import {BNASubjectName} from '../../../subject-management/models/BNASubjectName'
import { SubjectMark } from '../../../subject-management/models/SubjectMark';
import { TraineeNominationService } from '../../../course-management/service/traineenomination.service'
import { TraineeList } from '../../../attendance-management/models/traineeList';
import {TraineeListForExamMark} from '../../../exam-management/models/traineeListforexammark';
import {BNASubjectNameService} from '../../../bna-subject-management/service/BNASubjectName.service';
import {SubjectMarkService} from '../../../bna-subject-management/service/SubjectMark.service';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { MarkTypeService } from 'src/app/basic-setup/service/MarkType.service';
//import {BnaSubjectName} from '../../../central-exam/models/BNASubjectName';

@Component({
  selector: 'app-new-qexammark',
  templateUrl: './new-qexammark.component.html',
  styleUrls: ['./new-qexammark.component.sass']
})
export class NewQExamMarkComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText: string;
  pageTitle: string;
  destination: string;
  BNAExamMarkForm: FormGroup;
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
  traineeList: TraineeListForExamMark[]
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

  traineeId:any;
  courseNameId:any;
  courseTypeId:any;
  displayedColumns: string[] = ['sl', 'markType', 'passMark', 'mark'];
  displayedColumnsForTraineeList: string[] = ['sl', 'traineePNo', 'traineeName', 'obtaintMark', 'examMarkRemarksId'];

  constructor(private snackBar: MatSnackBar, private markTypeService: MarkTypeService,private classRoutineService: ClassRoutineService,private subjectMarkService:SubjectMarkService,private BNASubjectNameService: BNASubjectNameService, private traineeNominationService: TraineeNominationService, private confirmService: ConfirmService, private CodeValueService: CodeValueService, private BNAExamMarkService: BNAExamMarkService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaExamMarkId');
    if (id) {
      this.pageTitle = 'Edit  Exam Mark';
      this.destination = "Edit";
      this.buttonText = "Update"
      this.BNAExamMarkService.find(+id).subscribe(
        res => {
          this.BNAExamMarkForm.patchValue({
            bnaExamMarkId: res.bnaExamMarkId,
            bnaExamScheduleId: res.bnaExamScheduleId,
            bnaSemesterId: res.bnaSemesterId,
            bnaBatchId: res.bnaBatchId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            examTypeId: res.examTypeId,
            bnaCurriculamTypeId: res.bnaCurriculamTypeId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            totalMark: res.totalMark,
            passMark: res.passMark,
            isApproved: res.isApproved,
            isApprovedBy: res.isApprovedBy,
            isApprovedDate: res.isApprovedDate,
            remarks: res.remarks,
            status: res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
            courseSectionId:res.courseSectionId
          });
        }
      );
    } else {
      this.pageTitle = 'Create Exam Mark';
      this.destination = "Add";
      this.buttonText = "Save"
    }
    this.intitializeForm();
    this.setParamDataToForm();
    //this.getselectedbaseschools();
    //this.getselectedcoursename();
    //this.getSelectedMarkType();
    this.getselectedexammarkremark();
    //..................................
    //this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
    //this.getSelectedBranch();
  }
  setParamDataToForm(){
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId');
    this.courseTypeId = this.route.snapshot.paramMap.get('courseTypeId');
    var classRoutineId = this.route.snapshot.paramMap.get('classRoutineId');
    var branchId = this.route.snapshot.paramMap.get('branchId');
    var bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId');
    var saylorBranchId = this.route.snapshot.paramMap.get('saylorBranchId');
    var saylorSubBranchId = this.route.snapshot.paramMap.get('saylorSubBranchId');
    var courseSectionId = this.route.snapshot.paramMap.get('courseSectionId');
    var subjectMarkId = this.route.snapshot.paramMap.get('subjectMarkId');
    var markTypeId = this.route.snapshot.paramMap.get('markTypeId');
    console.log(markTypeId)
    console.log("markTypeId")

    this.BNAExamMarkForm.get('baseSchoolNameId').setValue(baseSchoolNameId);
    this.BNAExamMarkForm.get('courseDurationId').setValue(courseDurationId);
    this.BNAExamMarkForm.get('traineeId').setValue(this.traineeId);
    this.BNAExamMarkForm.get('courseNameId').setValue(this.courseNameId);
    this.BNAExamMarkForm.get('classRoutineId').setValue(classRoutineId);
    this.BNAExamMarkForm.get('branchId').setValue(branchId);
    this.BNAExamMarkForm.get('bnaSubjectNameId').setValue(bnaSubjectNameId);
    this.BNAExamMarkForm.get('SubjectMarkId').setValue(subjectMarkId);
    this.BNAExamMarkForm.get('examTypeCount').setValue(1);
    this.BNAExamMarkForm.get('courseSectionId').setValue(courseSectionId);

    this.markTypeService.find(Number(markTypeId)).subscribe(res => {  
      console.log("mark TypId")     
      console.log(markTypeId)
      this.markTypeName = res.typeName;
      console.log("mark Type Name")
      console.log(this.markTypeName)
      this.onSubjectMarkSelectionGetPassMark();
    });
 
    if(this.courseNameId == this.masterData.courseName.JCOsTraining){
      this.traineeNominationService.getNewTraineeNominationsForJcoExamByBranch(courseDurationId,saylorBranchId,saylorSubBranchId).subscribe(res => {
        this.traineeList = res;
       console.log("Trainee List");
        console.log(this.traineeList);
        this.clearList()
        this.getTraineeListonClick();
      });
    }else if (this.courseTypeId == this.masterData.coursetype.CentralExam){
      this.getTraineeListByDurationAndSection(courseDurationId,courseSectionId,baseSchoolNameId,this.courseNameId,bnaSubjectNameId,classRoutineId);
    }else{

    }

    this.BNAExamMarkService.GetSubjectMarkByCourseNameIdSubjectNameId(this.courseNameId, bnaSubjectNameId).subscribe(res => {
       
      this.subjectMarkList = res;
       console.log(this.subjectMarkList);
    });
     

    

  }

  getTraineeListByDurationAndSection(courseDurationId,courseSectionId,baseSchoolNameId,courseNameId,bnaSubjectNameId,classRoutineId){
    this.traineeNominationService.getTraineeAttendanceListByCourseDurationId(courseDurationId,courseSectionId,1,baseSchoolNameId,courseNameId,bnaSubjectNameId,classRoutineId).subscribe(res => {
      this.traineeList = res;
     console.log("Trainee List1");
      console.log(this.traineeList);
      console.log("Trainee List1");
      this.clearList()
      this.getTraineeListonClick();
    });
  }

  onSubjectMarkSelectionGetPassMark(){
    var subjectMarkId=this.BNAExamMarkForm.value['SubjectMarkId'];
    console.log(subjectMarkId)
    this.subjectMarkService.find(subjectMarkId).subscribe(res => {
      console.log('subject markId');
      console.log(res);
      this.subjectPassMark = res.passMark;
      var mark = res.mark;
      this.mark =mark;
      this.subjectName=res.bnaSubjectName
      this.courseName=res.courseName
      console.log(this.subjectPassMark);

      this.BNAExamMarkForm.get('totalMark').setValue(mark);
      this.BNAExamMarkForm.get('passMark').setValue(this.subjectPassMark);
      // console.log(this.selectedbaseschools);
    });
    
  }

  OnTextCheck(value,index ){
    console.log(value);
    console.log(this.subjectPassMark)

    if(value >= this.subjectPassMark){
      console.log("pass");
      (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get('resultStatusShow').setValue('Pass');
      (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get('resultStatus').setValue(1);
    }else{
      console.log("fail");
      (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get('resultStatusShow').setValue('Fail');
      (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get('resultStatus').setValue(0);
    }
  }

  onValueChange(value,i){
    console.log(value);
    var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
    var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
    var courseDurationId = this.BNAExamMarkForm.value['courseDurationId'];
    var courseSectionId = this.BNAExamMarkForm.value['courseSectionId'];
    var bnaSubjectNameId = this.BNAExamMarkForm.value['bnaSubjectNameId'];
    var classRoutineId = this.BNAExamMarkForm.value['classRoutineId'];
    
   // console.log(this.markType);

    //this.BNAExamMarkService.getExamMarkForValidation(baseSchoolNameId,courseDurationId,courseSectionId,bnaSubjectNameId,this.markType).subscribe(res=>{
      //this.mark=res;
      console.log("mark");
      console.log(this.mark);
      if( value >this.mark){
          this.isBigger=true;
          (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(i).get('obtaintMark').setValue("");
      }
      else{
        this.isBigger=false;
    }
      console.log(this.mark);
   // });
  }

  getselectedexammarkremark() {
    this.BNAExamMarkService.getselectedexammarkremark().subscribe(res => {
      this.selectedmarkremarks = res
      // console.log(this.selectedbaseschools);
    });
  }

  intitializeForm() {
    this.BNAExamMarkForm = this.fb.group({
      bnaExamMarkId: [0],
      traineeId: [],
      bnaExamScheduleId: [],
      bnaSemesterId: [],
      courseName: [''],
      bnaBatchId: [],
      baseSchoolNameId: [],
      courseNameId: [],
      courseTypeId: [],
      SubjectMarkId: [],
      branchId:[],
      bnaCurriculamTypeId: [],
      bnaSubjectNameId: [],
      bnaSubjectName: [''],
      courseDurationId: [],
      classRoutineId: [],
      totalMark: [''],
      passMark: [''],
      obtaintMark: [],
      examTypeCount: [],
      isApproved: [false],
      isApprovedBy: [],
      isApprovedDate: [],
      courseSectionId:[],
      reExamStatus:['0'],
      remarks: [],
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
      status: [],
      isActive: [true],
    })
  }
  getControlLabel(index: number, type: string) {
    return (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get(type).value;
  }
  private createTraineeData() {

    return this.fb.group({
      courseNameId: [],
      traineeNominationId:[],
      status: [],
      pno: [],
      traineeId: [],
      markTypeId:[],
      name: [],
      position: [],
      indexNo:[],
      obtaintMark: [],
      resultStatusShow:[''],
      resultStatus:[''],
      examMarkRemarksId: []
    });
  }

  

  getTraineeListonClick() {
    const control = <FormArray>this.BNAExamMarkForm.controls["traineeListForm"];
    console.log("traineeList")
    console.log(this.traineeList);
    console.log("traineeList")
    for (let i = 0; i < this.traineeList.length; i++) {
      control.push(this.createTraineeData());
      
    }
    this.BNAExamMarkForm.patchValue({ traineeListForm: this.traineeList });
    
  }

  clearList() {
    const control = <FormArray>this.BNAExamMarkForm.controls["traineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }
  toggle(){
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle(){
    this.showHideDiv= false;
    this.print();
  }
  print(){ 
     
    let printContents, popupWin;
    printContents = document.getElementById('print-routine').innerHTML;
    popupWin = window.open( 'Restricted', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          body{  width: 99%;}
            label { font-weight: 400;
                    font-size: 13px;
                    padding: 2px;
                    margin-bottom: 5px;
                  }
            table, td, th {
                  border: 1px solid silver;
                  
                    }
                    table td {
                  font-size: 13px;
                    }
                    .dynamic-tbl-forroutine tr th span {
                      writing-mode: vertical-rl;
                      transform: rotate(180deg);
                      padding: 5px;
                      text-transform: capitalize;
                      height:195px;
                  }

                    table th {
                  font-size: 13px;
                    }
            .first-col-hide .mat-header-row.cdk-header-row.ng-star-inserted .mat-header-cell:first-child, .first-col-hide .mat-row.cdk-row.ng-star-inserted .mat-cell:first-child {
                      display: none;
                  }
                 
              table {
                    border-collapse: collapse;
                    width: 98%;
                    }
                th {
                    height: 26px;
                    }
                .header-text{
                  text-align:center;
                }
                .header-text h3{
                  margin:0;
                }
                .header-warning{
                  font-size:12px;
                }
                .header-warning.bottom{
                  position:absolute;
                  bottom:0;
                  left:44%;
                }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <span class="header-warning top">CONFIDENTIAL</span>
          <h3> ${this.courseName}</h3>
          <h3> ${this.subjectName}</h3>
        
          <h3> ${this.markTypeName}</h3>
          </div>
          <br>
          <hr>
          ${printContents}
          <span class="header-warning bottom">CONFIDENTIAL</span>
        </body>
      </html>`
    );
    popupWin.document.close();

}
  

  onSubmit() {
    const id = this.BNAExamMarkForm.get('bnaExamMarkId').value;

    


    console.log(this.BNAExamMarkForm.value);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAExamMarkService.update(+id, JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
            this.router.navigateByUrl('/exam-management/bnaexammark-list');
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
    } else {
      var aaa=223;
      var bbb=333;
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAExamMarkService.submit(JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
           this.BNAExamMarkForm.reset();
           if(this.courseTypeId != this.masterData.coursetype.LocalCourse){
            this.router.navigateByUrl(`/admin/dashboard/centralexammarkentry-list/${this.traineeId}/${this.courseTypeId}/${this.courseNameId}`);
           }else{
            this.router.navigateByUrl(`/admin/dashboard/instructorexam-list/${this.traineeId}/0`);
           }
            this.BNAExamMarkForm.get('bnaExamMarkId').setValue(0);
            this.BNAExamMarkForm.get('isActive').setValue(true);
            this.BNAExamMarkForm.get('isApproved').setValue(true);
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
}

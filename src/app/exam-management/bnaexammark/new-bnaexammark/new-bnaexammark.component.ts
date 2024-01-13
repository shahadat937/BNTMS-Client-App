import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAExamMarkService } from '../../service/bnaexammark.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BNASubjectName } from 'src/app/subject-management/models/BNASubjectName';
import { SubjectMark } from '../../../subject-management/models/SubjectMark';
import { TraineeNominationService } from '../../../course-management/service/traineenomination.service'
import { TraineeList } from '../../../attendance-management/models/traineeList';
import { TraineeListForExamMark } from '../../models/traineeListforexammark';
import { AuthService } from 'src/app/core/service/auth.service';
import { MarkTypeService } from 'src/app/basic-setup/service/MarkType.service';
import { SubjectMarkService } from 'src/app/subject-management/service/SubjectMark.service';
import { ClassRoutineService } from 'src/app/routine-management/service/classroutine.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-new-bnaexammark',
  templateUrl: './new-bnaexammark.component.html',
  styleUrls: ['./new-bnaexammark.component.sass']
})
export class NewBNAExamMarkComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  buttonText: string;
  pageTitle: string;
  destination: string;
  BNAExamMarkForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools: SelectedModel[];
  showHideDiv= false
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
  subjectMarkList: SubjectMark[];
  markTypeName:any;
  courseName:any;
  getExamMarkData:any;
  subjectPassMark:any;
  isShown: boolean = false;
  isBigger:boolean =false;
  selectedCourseDuration: number;
  traineeList: TraineeListForExamMark[]
  examTypeCount: number;
  selectedCourseSection:SelectedModel[];
  sectionId:number;
  bnaExamMarkId:any;
  mark:any;
  markType:any;
  role:any;
  traineeId:any;
  branchId:any;
  baseSchoolId:any;
  courseSection:any;
  schoolName:any;
  courseNameTitle:any;
  SubjectMarkId:any;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['sl', 'markType', 'passMark', 'mark'];
  displayedColumnsForTraineeList: string[] = ['sl', 'traineePNo', 'traineeName', 'obtaintMark', 'examMarkRemarksId'];

  constructor(private snackBar: MatSnackBar,private ClassRoutineService: ClassRoutineService, private subjectMarkService: SubjectMarkService, private authService: AuthService, private markTypeService: MarkTypeService, private traineeNominationService: TraineeNominationService, private confirmService: ConfirmService, private CodeValueService: CodeValueService, private BNAExamMarkService: BNAExamMarkService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

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
            courseSectionId:res.courseSectionId,
            isActive: res.isActive,
            reExamStatus:res.reExamStatus
          });
        }
      );
    } else {
      this.pageTitle = 'Create  Exam Mark';
      this.destination = "Add";
      this.buttonText = "Save"
    }
    this.intitializeForm();
    if(this.role === this.userRole.SuperAdmin || this.role === this.userRole.BNASchool || this.role === this.userRole.JSTISchool){
      this.BNAExamMarkForm.get('baseSchoolNameId').setValue(this.branchId);
      this.BNAExamMarkForm.get('schoolDb').setValue(1);
      this.getSelectedCourseDurationByschoolname();
     }
    this.getselectedbaseschools();
    this.getselectedcoursename();
    this.getselectedexammarkremark();

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
      bnaCurriculamTypeId: [],
      bnaSubjectNameId: [],
      bnaSubjectName: [''],
      courseDurationId: [],
      classRoutineId: [],
      totalMark: [''],
      passMark: [''],
      schoolDb: [''],
      obtaintMark: [],
      examTypeCount: [],
      isApproved: [false],
      isApprovedBy: [],
      isApprovedDate: [],
      remarks: [],
      courseSectionId:[''],
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
      status: [],
      isActive: [true],
      reExamStatus:[0]
    })
  }
  getControlLabel(index: number, type: string) {
    return (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get(type).value;
  }
  private createTraineeData() {

    return this.fb.group({
      courseNameId: [],
      status: [],
      pno: [],
      traineeId: [],
      name: [],
      position: [],
      obtaintMark: [],
      resultStatusShow:[''],
      resultStatus:[],
      checkStatus:[],
      examMarkRemarksId: []
    });
  }

  getTraineeListonClick() {
    const control = <FormArray>this.BNAExamMarkForm.controls["traineeListForm"];
    console.log(this.traineeList)
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

  getselectedbaseschools() {
    this.BNAExamMarkService.getselectedbaseschools().subscribe(res => {
      this.selectedbaseschools = res
      // console.log(this.selectedbaseschools);
    });
  }

  onValueChange(value,i){
    console.log(value);
    var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
    var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
    var courseDurationId = this.BNAExamMarkForm.value['courseDurationId'];
    var courseSectionId = this.BNAExamMarkForm.value['courseSectionId'];
    var bnaSubjectNameId = this.BNAExamMarkForm.value['bnaSubjectNameId'];
    var classRoutineId = this.BNAExamMarkForm.value['classRoutineId'];
    
    console.log("base school Name Id");
    console.log(baseSchoolNameId);
    console.log("courseDurationId");
    console.log(courseDurationId);
    console.log("courseSectionId");
    console.log(courseSectionId);
    console.log("bnaSubjectNameId");
    console.log(bnaSubjectNameId);
    console.log("this.markType");
    console.log(this.markType);

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
      console.log("Mark"+ this.mark);
   // });
  }

  OnTextCheck(value,index ){
    if(value >= this.subjectPassMark){
      console.log(this.subjectPassMark);
      console.log("Result pass");
      (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get('resultStatusShow').setValue('Pass');
      (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get('resultStatus').setValue(1);
    }else{
      console.log("Result fail");
      (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get('resultStatusShow').setValue('Fail');
      (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get('resultStatus').setValue(0);
    }
  }

  getselectedexammarkremark() {
    this.BNAExamMarkService.getselectedexammarkremark().subscribe(res => {
      this.selectedmarkremarks = res
      // console.log(this.selectedbaseschools);
    });
  }
  onCourseNameSelectionChangeGetSubjectAndTraineeList(dropdown) {

    if (dropdown.isUserInput) {
      // console.log(dropdown);
      var courseNameArr = dropdown.source.value.value.split('_');
      var courseNameTextArr = dropdown.source.value.text.split('_');
      var courseName = courseNameTextArr[0];
      var coursetitle = courseNameTextArr[1];
      var courseDurationId = courseNameArr[0];
      var courseNameId = courseNameArr[1];
      this.BNAExamMarkForm.get('courseName').setValue(courseName);
      this.BNAExamMarkForm.get('courseNameId').setValue(courseNameId);
      this.BNAExamMarkForm.get('courseDurationId').setValue(courseDurationId);
      this.isShown = false;

      var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
      this.baseSchoolNameId = baseSchoolNameId;
      var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
      // if (baseSchoolNameId != null && courseNameId != null) {
      //   this.BNAExamMarkService.getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId, courseDurationId).subscribe(res => {
      //     this.selectedSubjectNameByBaseSchoolNameIdAndCourseNameId = res;
      //   });
      // }

      // this.BNAExamMarkService.getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId).subscribe(res => {

      //   this.selectedCourseDuration = res;
        
      // });
      this.BNAExamMarkService.getselectedCourseSection(baseSchoolNameId,courseNameId).subscribe(res=>{
        this.selectedCourseSection=res;
        console.log('section');
        console.log(this.selectedCourseSection);
      });
    }
  }

  getSubjectbycourseandsection(){
    var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
    var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
    var courseDurationId = this.BNAExamMarkForm.value['courseDurationId'];
    var courseSectionId = this.BNAExamMarkForm.value['courseSectionId'];


    if (baseSchoolNameId != null && courseNameId != null) {
      this.BNAExamMarkService.getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId, courseDurationId,courseSectionId).subscribe(res => {
        this.selectedSubjectNameByBaseSchoolNameIdAndCourseNameId = res;
      });
    }
  }

  onSubjectNameSelectionChangeGetTotalMarkAndPassMark(dropdown) {

    if (dropdown.isUserInput) {
      console.log(dropdown);

      this.isShown = true;
      var subjectArr = dropdown.source.value.value.split('_');
      
      

      var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
      var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
      var courseDurationId = this.BNAExamMarkForm.value['courseDurationId'];
      var courseSectionId = this.BNAExamMarkForm.value['courseSectionId'];
      
      this.bnaSubjectNameId = subjectArr[0];
      var courseModuleId = subjectArr[1];
      var classRoutineId = subjectArr[2];
      var courseSectionId = subjectArr[3];
      var SubjectMarkId = subjectArr[4];
      var markTypeId = subjectArr[5];
      var bnaExamMarkId = subjectArr[6];

      this.markType =markTypeId;
      console.log(SubjectMarkId,markTypeId+"mark type");
      
      this.BNAExamMarkForm.get('bnaSubjectName').setValue(dropdown.text);
      this.BNAExamMarkForm.get('bnaSubjectNameId').setValue(this.bnaSubjectNameId);
      this.BNAExamMarkForm.get('classRoutineId').setValue(classRoutineId);
      this.BNAExamMarkForm.get('SubjectMarkId').setValue(SubjectMarkId);
      this.BNAExamMarkForm.get('examTypeCount').setValue(1);
      
      this.getTraineeListByDurationAndSection(courseDurationId,courseSectionId,baseSchoolNameId,courseNameId,this.bnaSubjectNameId,classRoutineId);
      this.BNAExamMarkService.GetSubjectMarkByBaseSchoolNameIdCourseNameAndSubjectNameId(baseSchoolNameId, courseNameId, this.bnaSubjectNameId).subscribe(res => {
        console.log('subject Mark List 1111111111');
        this.subjectMarkList = res;
        console.log('subject Mark List');
        console.log(this.subjectMarkList);
      });

      this.markTypeService.find(markTypeId).subscribe(res => {
        console.log(res);
        this.markTypeName = res.typeName;
      });
      // this.BNAExamMarkService.find(this.bnaExamMarkId).subscribe(res=>{
      //     this.courseSection = res.sectionName;
      //   });
      this.ClassRoutineService.getClassRoutineHeaderByParams(baseSchoolNameId,courseNameId,courseDurationId,this.sectionId).subscribe(res=>{
        console.log("res.schoolName")
        console.log(res)
        this.courseSection = res[0].sectionName;
        this.schoolName = res[0].schoolName;
        this.courseNameTitle = res[0].courseNameTitle;
        // this.runningWeek = res[0].runningWeek + 1;
        // this.totalWeek = res[0].totalWeek;
      });
    
      this.subjectMarkService.find(SubjectMarkId).subscribe(res => {
        console.log("SubjectMarkId")
        console.log("MarkId"+-SubjectMarkId)
        console.log("SubjectMarkId")
        console.log(res);
        console.log("SubjectMarkId-res")
        this.subjectPassMark = res.passMark;
        console.log(this.subjectPassMark+'-'+res.passMark)
        console.log("passMark")
        var mark = res.mark;
        this.mark =mark;
        this.BNAExamMarkForm.get('totalMark').setValue(mark);
        this.BNAExamMarkForm.get('passMark').setValue(this.subjectPassMark);
      });

      // this.BNAExamMarkService.getselectedmarktypes(baseSchoolNameId, courseNameId, courseDurationId, this.bnaSubjectNameId, courseModuleId).subscribe(res => {
      //   this.selectedmarktype = res
      //   this.examTypeCount = res.length;
      //   this.BNAExamMarkForm.get('examTypeCount').setValue(this.examTypeCount);
      //   console.log("selectedmarktype count" + this.examTypeCount)
      // });



      this.BNAExamMarkService.GetTotalMarkAndPassMarkByBaseSchoolIdCourseIdAndSubjectId(baseSchoolNameId, courseNameId, this.bnaSubjectNameId).subscribe(res => {
        console.log("getTotalMarkAndPassMark_PassPass")
        this.getTotalMarkAndPassMark = res;
        console.log("getTotalMarkAndPassMark11111Fail")
        console.log(this.getTotalMarkAndPassMark)
        this.totalMark = res[0].totalMark;
        this.passMarkBna = res[0].passMarkBNA;
        this.courseName=res[0].courseName;
        // this.BNAExamMarkForm.get('totalMark').setValue(this.totalMark);
        // this.BNAExamMarkForm.get('passMark').setValue(this.passMarkBna);
      });
      //  this.totalMark="";
      //  this.passMarkBna="";

    }
  }

  getTraineeListByDurationAndSection(courseDurationId,courseSectionId,baseSchoolNameId,courseNameId,subjectNameId,classRoutineId){
    console.log("drop");
      console.log(courseDurationId,courseSectionId,baseSchoolNameId,courseNameId,subjectNameId,classRoutineId);
    this.traineeNominationService.getTraineeAttendanceListByCourseDurationId(courseDurationId,courseSectionId,1,baseSchoolNameId,courseNameId,subjectNameId,classRoutineId).subscribe(res => {
      this.traineeList = res.filter(x=>x.withdrawnTypeId === null);
      console.log(this.traineeList);
      console.log("Trainee List");
      this.clearList()
      this.getTraineeListonClick();
    });
  }

  
  getSelectedCourseDurationByschoolname() {
    var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
    this.isShown = false;

    //console.log(baseSchoolNameId);
    this.BNAExamMarkService.getSelectedCourseDurationByschoolname(baseSchoolNameId).subscribe(res => {
      console.log("check name");
      this.selectedcoursedurationbyschoolname = res;

    });
  }

  
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  onSectionSelectionGet(){
    // this.sectionId = this.BNAExamMarkForm.value['courseSectionId'];
    //this.BNAExamMarkForm.get('courseSectionId').setValue(this.sectionId);
    console.log("ddd");
    

    var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
    var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
    var courseDurationId = this.BNAExamMarkForm.value['courseDurationId'];
    this.sectionId = this.BNAExamMarkForm.value['courseSectionId'];
    console.log(baseSchoolNameId,courseNameId,courseDurationId,this.sectionId);
    if (baseSchoolNameId != null && courseNameId != null) {
      this.BNAExamMarkService.getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId, courseDurationId,this.sectionId).subscribe(res => {
        this.selectedSubjectNameByBaseSchoolNameIdAndCourseNameId = res;
        console.log("selected subject name");
        console.log(this.selectedSubjectNameByBaseSchoolNameIdAndCourseNameId)
      });
    }
  }

  getselectedcoursename() {
    this.BNAExamMarkService.getselectedcoursename().subscribe(res => {
      this.selectedcoursename = res
    });
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
          <h3>School:- ${this.schoolName}</h3>
          <h3>Course:- ${this.courseNameTitle}</h3>
          <h3>Course Section :- ${this.courseSection }</h3>
          <h3>MarkType:- ${this.markTypeName}</h3>
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
          this.loading = true;
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
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.BNAExamMarkService.submit(JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
            //this.router.navigateByUrl('/exam-management/bnaexammark-list');
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
}

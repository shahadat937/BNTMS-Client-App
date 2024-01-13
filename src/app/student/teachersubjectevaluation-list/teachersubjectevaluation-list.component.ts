import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAExamMarkService } from '../../exam-management/service/bnaexammark.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BNASubjectName } from '../../subject-management/models/BNASubjectName';
import { SubjectMark } from '../../subject-management/models/SubjectMark';
import { TraineeNominationService } from '../../course-management/service/traineenomination.service'
import { TraineeList } from '../../attendance-management/models/traineeList';
import { TraineeListForExamMark } from '../../exam-management/models/traineeListforexammark';
import { StudentDashboardService } from '../services/StudentDashboard.service';
import {TdecGroupResultService} from '../services/tdecgroupresult.service'

@Component({
  selector: 'app-teachersubjectevaluation-list',
  templateUrl: './teachersubjectevaluation-list.component.html',
  styleUrls: ['./teachersubjectevaluation-list.component.sass']
}) 
export class TeacherSubjectEvaluationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  BNAExamMarkForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools:SelectedModel[];
 
   selectedcoursename:SelectedModel[];
    selectedcoursedurationbyschoolname:SelectedModel[];
    selectedClassTypeByBaseSchoolNameIdAndCourseNameId:SelectedModel[];
    selectedSubjectNameByBaseSchoolNameIdAndCourseNameId:SelectedModel[];
    selectedmarktype:SelectedModel[];
    SelectedTdecActionStatus:SelectedModel[];
    getTotalMarkAndPassMark:BNASubjectName;
    totalMark: string;
    baseSchoolNameId:number;
    baseSchool:any;
    courseNames:any;
    courseDurations:any;
    courseName:string;
    courseTitle:string;
    subjectName:string;
    Instructor:string;
    InstructorRank:string;
    InstructorPno:string;
    classRoutineId:number;
    bnaSubjectNameId:number;
    passMarkBna:string;
    subjectMarkList:SubjectMark[]
    isShown: boolean = false ;
    selectedCourseDuration:number;
    traineeList:TraineeListForExamMark[];
    examTypeCount:number;
    traineeId:any;
    ApproveMsgScreen: boolean = false ;
    ApproveMsg:string;
    questionList:any;


    paging = {
      pageIndex: this.masterData.paging.pageIndex,
      pageSize: this.masterData.paging.pageSize,
      length: 1
    }
  
    displayedColumns: string[] = ['sl','markType','passMark', 'mark'];
    displayedColumnsForTraineeList: string[] = ['sl','traineePNo','traineeName', 'obtaintMark','examMarkRemarksId'];

  constructor(private snackBar: MatSnackBar,private tdecGroupResultService:TdecGroupResultService,private traineeNominationService:TraineeNominationService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BNAExamMarkService: BNAExamMarkService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, private studentDashboardService: StudentDashboardService ) { }

  ngOnInit(): void {
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId');
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');

    this.baseSchool = this.route.snapshot.paramMap.get('baseSchoolNameId');
    this.courseNames = this.route.snapshot.paramMap.get('courseNameId');
    this.courseDurations = this.route.snapshot.paramMap.get('courseDurationId');

    var bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    console.log(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId);
    this.getTdecQuationGroupByParams(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId);
    this.getSelectedTdecActionStatus();
    const id = this.route.snapshot.paramMap.get('bnaExamMarkId'); 
    if (id) {
      this.pageTitle = 'Edit  Exam Mark'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.BNAExamMarkService.find(+id).subscribe(
        res => {
          this.BNAExamMarkForm.patchValue({          
            bnaExamMarkId:res.bnaExamMarkId, 
            bnaExamScheduleId:res.bnaExamScheduleId, 
            bnaSemesterId:res.bnaSemesterId, 
            bnaBatchId:res.bnaBatchId, 
            baseSchoolNameId:res.baseSchoolNameId,
            courseNameId:res.courseNameId,
            examTypeId:res.examTypeId,
            bnaCurriculamTypeId:res.bnaCurriculamTypeId,
            bnaSubjectNameId:res.bnaSubjectNameId,
            totalMark:res.totalMark,
            passMark:res.passMark,
            isApproved:res.isApproved,
            isApprovedBy:res.isApprovedBy,
            isApprovedDate:res.isApprovedDate,
            remarks:res.remarks,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Teacher Evaluation Form';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
  }

  intitializeForm() {
    this.BNAExamMarkForm = this.fb.group({
      //trainee id will come from login session
      
      bnaExamScheduleId:[],
      traineeId:[''],
      
      remarks:[],
      approveTraineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
      status:[],
      isActive: [true],    
      
    })
  }

  getTdecQuationGroupByParams(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId){
    this.studentDashboardService.getTdecQuationGroupByParams(baseSchoolNameId,courseNameId,courseDurationId,bnaSubjectNameId).subscribe(res=>{
      this.questionList=res
      this.courseName=res[0].courseName;
      this.courseTitle=res[0].courseDuration;
      this.subjectName=res[0].subjectName;
      this.Instructor=res[0].traineeName;
      this.InstructorPno=res[0].traineePno;
      this.InstructorRank=res[0].traineeRank;
      this.clearList();
      console.log(this.courseName)
      this.getEvaluationQuestionList(); 
      //this.clearList();
    });
  }

  getSelectedTdecActionStatus(){
    this.studentDashboardService.getSelectedTdecActionStatus().subscribe(res=>{
      this.SelectedTdecActionStatus=res
    });
  }

  getControlLabel(index: number,type: string){
    return  (this.BNAExamMarkForm.get('approveTraineeListForm') as FormArray).at(index).get(type).value;
   }
  private createTraineeData() {
 
    return this.fb.group({
      tdecQuationGroupId: [],
      baseSchoolNameId:[],
      bnaSubjectNameId: [],
      courseDurationId:[],
      courseNameId:[],
      tdecQuestionNameId: [],
      tdecQuestionName:[],
      TdecActionStatusId:[],
      traineeId:[]
    });
  }

  getEvaluationQuestionList(){ 
    const control = <FormArray>this.BNAExamMarkForm.controls["approveTraineeListForm"];
    console.log(this.questionList)   
    for (let i = 0; i < this.questionList.length; i++) {
      control.push(this.createTraineeData()); 
      console.log(this.questionList[i])
    }
    this.BNAExamMarkForm.patchValue({ approveTraineeListForm: this.questionList });
  }

  clearList() {
    const control = <FormArray>this.BNAExamMarkForm.controls["approveTraineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
   // const id = this.BNAExamMarkForm.get('bnaExamMarkId').value; 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.BNAExamMarkForm.get('traineeId').setValue(this.traineeId);
    console.log(this.BNAExamMarkForm.value);
    // if (id) {
    //   this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
    //     console.log(result);
    //     if (result) {
    //       this.BNAExamMarkService.update(+id,JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
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
    // }else {
      
    
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.tdecGroupResultService.submit(this.BNAExamMarkForm.value).subscribe(response => {
            //this.router.navigateByUrl('/exam-management/bnaexammark-list');
            // this.BNAExamMarkForm.reset();
            // this.isShown = false;
            //this.BNAExamMarkForm.get('bnaExamMarkId').setValue(0);
            // this.BNAExamMarkForm.get('isActive').setValue(true);
            // this.BNAExamMarkForm.get('isApproved').setValue(false); 
          //  this.reloadCurrentRoute();
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

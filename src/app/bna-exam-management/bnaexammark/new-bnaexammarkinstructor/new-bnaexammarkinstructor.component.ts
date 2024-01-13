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
import {TraineeNominationService} from '../../../course-management/service/traineenomination.service'
import { TraineeList } from '../../../attendance-management/models/traineeList';
import { TraineeListForExamMark } from '../../models/traineeListforexammark';

@Component({
  selector: 'app-new-bnaexammarkinstructor',
  templateUrl: './new-bnaexammarkinstructor.component.html',
  styleUrls: ['./new-bnaexammarkinstructor.component.sass']
}) 
export class NewBnaExammarkinstructor implements OnInit {
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
    selectedcoursModulebySchoolAndCourse:SelectedModel[];
    selectedmarkremarks:SelectedModel[];
    getTotalMarkAndPassMark:BNASubjectName;
    totalMark: string;
    baseSchoolNameId:number;
    classRoutineId:number;
    bnaSubjectNameId:number;
    passMarkBna:string;
    subjectMarkList:SubjectMark[]
    isShown: boolean = false ;
    selectedCourseDuration:number;
    traineeList:TraineeListForExamMark[]
    examTypeCount:number;
    selectedInstructorList:any[];
    traineeId:any;

    paging = {
      pageIndex: this.masterData.paging.pageIndex,
      pageSize: this.masterData.paging.pageSize,
      length: 1
    }
  
    displayedColumns: string[] = ['sl','markType','passMark', 'mark'];
    displayedColumnsForTraineeList: string[] = ['sl','traineePNo','traineeName', 'obtaintMark','examMarkRemarksId'];

  constructor(private snackBar: MatSnackBar,private traineeNominationService:TraineeNominationService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BNAExamMarkService: BNAExamMarkService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaExamMarkId');
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
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
      this.pageTitle = 'Create  Exam Mark';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
     this.intitializeForm();   
     this.getselectedbaseschools(); 
     this.getselectedcoursename();
     //this.getSelectedMarkType();
     this.getselectedexammarkremark();
     
     //this.onCourseNameSelectionChangeGetSubjectAndTraineeList("");
  }
  intitializeForm() {
    this.BNAExamMarkForm = this.fb.group({
      bnaExamMarkId: [0],
      traineeId:[],
      bnaExamScheduleId:[],
      bnaSemesterId:[],
      courseName:[''],
      bnaBatchId:[],
      baseSchoolNameId:[],    
      courseNameId:[],
      courseTypeId:[],
      SubjectMarkId:[], 
      bnaCurriculamTypeId:[],
      bnaSubjectNameId:[],
      bnaSubjectName:[''],
      courseDurationId:[],
      classRoutineId:[],
      totalMark:[''],
      passMark:[''],
      obtaintMark:[],
      examTypeCount:[],
      isApproved:[false],
      isApprovedBy:[],
      isApprovedDate:[],
      remarks:[],
      traineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
      status:[],
      isActive: [true],    
    })
  }
  getControlLabel(index: number,type: string){
    return  (this.BNAExamMarkForm.get('traineeListForm') as FormArray).at(index).get(type).value;
   }
  private createTraineeData() {
 
    return this.fb.group({
      courseNameId: [],
      status: [],
      traineePNo:[],
      traineeId: [],
      traineeName:[],
      rankPosition:[],
      obtaintMark: [],
      examMarkRemarksId:[]
    });
  }

 getTraineeListonClick(){ 
  const control = <FormArray>this.BNAExamMarkForm.controls["traineeListForm"];
  console.log(this.traineeList)   
  for (let i = 0; i < this.traineeList.length; i++) {
    control.push(this.createTraineeData()); 
    console.log("value...");
    console.log(this.traineeList)
  }
  this.BNAExamMarkForm.patchValue({ traineeListForm: this.traineeList });
  console.log("value...");
  console.log(this.traineeList)
 }

 clearList() {
  const control = <FormArray>this.BNAExamMarkForm.controls["traineeListForm"];
  while (control.length) {
    control.removeAt(control.length - 1);
  }
  control.clearValidators();
}

  getselectedbaseschools(){
    this.BNAExamMarkService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschools=res
    // console.log(this.selectedbaseschools);
    });
  }

  getselectedexammarkremark(){
    this.BNAExamMarkService.getselectedexammarkremark().subscribe(res=>{
      this.selectedmarkremarks=res
    // console.log(this.selectedbaseschools);
    });
  }
  onCourseNameSelectionChangeGetSubjectAndTraineeList(dropdown){

    if(dropdown.isUserInput) {
     // console.log(dropdown);
    var courseNameArr = dropdown.source.value.value.split('_');
    var courseNameTextArr = dropdown.source.value.text.split('_');
    var courseName = courseNameTextArr[0];
    var coursetitle = courseNameTextArr[1];
    var courseDurationId=courseNameArr[0];
    var courseNameId=courseNameArr[1];

    console.log("COurseDurationId");
    console.log(courseDurationId)

   // console.log("coursename"+courseNameId);
    this.BNAExamMarkForm.get('courseName').setValue(courseName);
    this.BNAExamMarkForm.get('courseNameId').setValue(courseNameId);
    this.BNAExamMarkForm.get('courseDurationId').setValue(courseDurationId);
    this.isShown=false;

    var baseSchoolNameId=this.BNAExamMarkForm.value['baseSchoolNameId'];
    this.baseSchoolNameId=baseSchoolNameId;
    var courseNameId=this.BNAExamMarkForm.value['courseNameId'];
     if(baseSchoolNameId != null && courseNameId != null){
       this.BNAExamMarkService.getSelectedSubjectNameListForInstructorDashBoardByBaseSchoolNameIdAndCourseNameId(this.traineeId,baseSchoolNameId,courseDurationId).subscribe(res=>{
        this.selectedInstructorList=res;   
        console.log("instructor List");  
        console.log(this.selectedInstructorList);
       });
     }
     
     this.BNAExamMarkService.getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId).subscribe(res=>{

      this.selectedCourseDuration=res;
      this.traineeNominationService.getTestTraineeNominationByCourseDurationId(courseDurationId,0).subscribe(res=>{
        this.traineeList=res; 
        console.log(this.traineeList);
                
       });
     });
     
  }
}

  onSubjectNameSelectionChangeGetTotalMarkAndPassMark(dropdown){

    if(dropdown.isUserInput) {
  
      console.log("dropdown value subject array");
      console.log(dropdown);
    this.isShown=true;
    var baseSchoolNameId=this.BNAExamMarkForm.value['baseSchoolNameId'];  
    var courseNameId=this.BNAExamMarkForm.value['courseNameId'];
    console.log("Subject array");
    console.log(courseNameId);


    this.bnaSubjectNameId = dropdown.source.value.bnaSubjectNameId;
    var courseModuleId = dropdown.source.value.courseModuleId;
    var bnaSubjectName =dropdown.source.value.subjectName
 
    this.BNAExamMarkForm.get('bnaSubjectName').setValue(bnaSubjectName);
    this.BNAExamMarkForm.get('bnaSubjectNameId').setValue(this.bnaSubjectNameId);
    this.clearList()
    this.getTraineeListonClick();
    this.BNAExamMarkService.GetSubjectMarkByBaseSchoolNameIdCourseNameAndSubjectNameId(baseSchoolNameId,courseNameId,this.bnaSubjectNameId).subscribe(res=>{
      this.subjectMarkList=res;
      console.log("ddddddddddddd");
      console.log(this.subjectMarkList);
    });

    this.BNAExamMarkService.GetRoutineIdWithSchoolCourseSubject(baseSchoolNameId,courseNameId,this.bnaSubjectNameId).subscribe(res=>{
      this.classRoutineId=res;
      this.BNAExamMarkForm.get('classRoutineId').setValue(this.classRoutineId);
      
     
    });

    this.BNAExamMarkService.getselectedmarktypes(baseSchoolNameId,courseNameId,this.bnaSubjectNameId,courseModuleId).subscribe(res=>{
      this.selectedmarktype=res
      this.examTypeCount = res.length;
      this.BNAExamMarkForm.get('examTypeCount').setValue(this.examTypeCount);
      console.log("selectedmarktype count"+this.examTypeCount)
    });

   


    this.BNAExamMarkService.GetTotalMarkAndPassMarkByBaseSchoolIdCourseIdAndSubjectId(baseSchoolNameId,courseNameId,this.bnaSubjectNameId).subscribe(res=>{
         
      this.getTotalMarkAndPassMark=res; 
      this.totalMark=res[0].totalMark;
      this.passMarkBna=res[0].passMarkBNA
      this.BNAExamMarkForm.get('totalMark').setValue(this.totalMark);
      this.BNAExamMarkForm.get('passMark').setValue(this.passMarkBna);
     });
    
  }
}


  getselectedcoursedurationbyschoolname(){
    var baseSchoolNameId=this.BNAExamMarkForm.value['baseSchoolNameId'];
    this.isShown=false;
    
    //console.log(baseSchoolNameId);
    this.BNAExamMarkService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
     console.log("check name");
      this.selectedcoursedurationbyschoolname=res;

    }); 
  }
  
  getselectedcoursename(){
    this.BNAExamMarkService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
    });
  }

  onSubmit() {
    const id = this.BNAExamMarkForm.get('bnaExamMarkId').value; 
     
    console.log(this.BNAExamMarkForm.value);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAExamMarkService.update(+id,JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
            this.router.navigateByUrl('/bna-exam-management/bnaexammark-list');
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
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAExamMarkService.submit(JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
            this.router.navigateByUrl('/admin/dashboard/instructor-dashboard');
            this.BNAExamMarkForm.reset();
            this.isShown = false;
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAExamMarkService } from '../../../central-exam/service/bnaexammark.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BNASubjectName } from 'src/app/subject-management/models/BNASubjectName';
import { SubjectMark } from '../../../subject-management/models/SubjectMark';
import {TraineeNominationService} from '../../../course-management/service/traineenomination.service'
import { TraineeList } from '../../../attendance-management/models/traineeList';
import { TraineeListForExamMark } from '../../../exam-management/models/traineeListforexammark';
import { AuthService } from 'src/app/core/service/auth.service';
import { SubjectMarkService } from 'src/app/subject-management/service/SubjectMark.service';

@Component({
  selector: 'app-qexammark-approve',
  templateUrl: './qexammark-approve.component.html',
  styleUrls: ['./qexammark-approve.component.sass']
}) 
export class QExamMarkApproveComponent implements OnInit {
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
    selectedCourseDurationByCourseTypeAndCourseName:SelectedModel[];
    selectedSubjectNameByCourseNameId:SelectedModel[];
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
    traineeList:TraineeListForExamMark[];
    examTypeCount:number;
    subjectPassMark:any;

    ApproveMsgScreen: boolean = false ;
    ApproveMsg:string;
    courseDurationId:any;
    courseTypeId:any;
    role:any;
    traineeId:any;
    branchId:any;
    baseSchoolId:any;
    courseNameId:any;

    paging = {
      pageIndex: this.masterData.paging.pageIndex,
      pageSize: this.masterData.paging.pageSize,
      length: 1
    }
  
    displayedColumns: string[] = ['sl','markType','passMark', 'mark'];
    displayedColumnsForTraineeList: string[] = ['sl','traineePNo','traineeName', 'obtaintMark','examMarkRemarksId'];

  constructor(private snackBar: MatSnackBar,private subjectMarkService:SubjectMarkService,private authService: AuthService,private traineeNominationService:TraineeNominationService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BNAExamMarkService: BNAExamMarkService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaExamMarkId'); 

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

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
      this.pageTitle = 'Approve  Exam Mark';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
     this.intitializeForm();   
     if(this.role === 'Super Admin'){
      this.BNAExamMarkForm.get('baseSchoolNameId').setValue(this.branchId);
      this.getselectedcoursedurationbyschoolname();
     }
     this.getselectedbaseschools(); 
     this.getselectedcoursename();
     this.getselectedexammarkremark();
     this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
     this.setParamDataToForm();
  }

  setParamDataToForm(){
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId');
    this.courseTypeId = this.route.snapshot.paramMap.get('courseTypeId');
    var classRoutineId = this.route.snapshot.paramMap.get('classRoutineId');
    var branchId = this.route.snapshot.paramMap.get('branchId');
    var bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId');
    
    this.BNAExamMarkForm.get('baseSchoolNameId').setValue(baseSchoolNameId);
    this.BNAExamMarkForm.get('courseDurationId').setValue(courseDurationId);
    this.BNAExamMarkForm.get('courseNameId').setValue(this.courseNameId);
    this.BNAExamMarkForm.get('classRoutineId').setValue(classRoutineId);
    this.BNAExamMarkForm.get('branchId').setValue(branchId);
    this.BNAExamMarkForm.get('bnaSubjectNameId').setValue(bnaSubjectNameId);

    this.BNAExamMarkService.GetSubjectMarkByCourseNameIdSubjectNameId(this.courseNameId, bnaSubjectNameId).subscribe(res => {       
      this.subjectMarkList = res;
       console.log("check");
       console.log(this.subjectMarkList);
     });

     this.BNAExamMarkService.getapprovedMarkTypeByParametersForCentralExam(this.courseNameId, courseDurationId, bnaSubjectNameId,true).subscribe(res => {
      this.selectedmarktype = res
      this.examTypeCount = res.length;
      this.BNAExamMarkForm.get('examTypeCount').setValue(this.examTypeCount);
      console.log("selectedmarktype count" + this.examTypeCount)
    });


    this.BNAExamMarkService.GetTotalMarkAndPassMarkByCourseNameIdAndSubjectId(this.courseNameId, bnaSubjectNameId).subscribe(res => {

      this.getTotalMarkAndPassMark = res;
      this.totalMark = res[0].totalMark;
      this.passMarkBna = res[0].passMarkBNA
      this.BNAExamMarkForm.get('totalMark').setValue(this.totalMark);
      this.BNAExamMarkForm.get('passMark').setValue(this.passMarkBna);
    });
    
  }

  intitializeForm() {
    this.BNAExamMarkForm = this.fb.group({
      bnaExamScheduleId:[],
      bnaSemesterId:[],
      courseName:[''],
      bnaBatchId:[],
      baseSchoolNameId:[],    
      courseNameId:[],
      courseTypeId:[],
      SubjectMarkId:[], 
      branchId:[], 
      bnaCurriculamTypeId:[],
      bnaSubjectNameId:[],
      bnaSubjectName:[''],
      courseDurationId:[],
      classRoutineId:[],
      totalMark:[''],
      passMark:[''],
      obtaintMark:[],
      examTypeCount:[],
      isApproved:[true],
      isApprovedBy:[],
      isApprovedDate:[],
      
      remarks:[],
      approveTraineeListForm: this.fb.array([
        this.createTraineeData()
      ]),
      status:[],
      isActive: [true],    
      
    })
  }
  getControlLabel(index: number,type: string){
    return  (this.BNAExamMarkForm.get('approveTraineeListForm') as FormArray).at(index).get(type).value;
   }
  private createTraineeData() {
 
    return this.fb.group({
      bnaExamMarkId: [],
      traineePNo:[],
      traineeNomination:[''],
      traineeNominationId:[''],
      traineeId: [],
      traineeName:[],
      rankPosition:[],
      obtaintMark: [],
      resultStatusShow:[''],
      resultStatus:[],
      examMarkRemarksId:[],      
      submissionStatus:[],
      createdBy:[],
      dateCreated:[]
    });
  }

  onSubjectMarkSelectionGetPassMark(){
    var subjectMarkId=this.BNAExamMarkForm.value['SubjectMarkId'];
    console.log(subjectMarkId)
    this.subjectMarkService.find(subjectMarkId).subscribe(res => {
      this.subjectPassMark = res.passMark;
      console.log(this.subjectPassMark)
      // console.log(this.selectedbaseschools);
    });
    
  }

  OnTextCheck(value,index ){
    console.log(value);
    console.log(this.subjectPassMark)

    if(value >= this.subjectPassMark){
      console.log("pass");
      (this.BNAExamMarkForm.get('approveTraineeListForm') as FormArray).at(index).get('resultStatusShow').setValue('Pass');
      (this.BNAExamMarkForm.get('approveTraineeListForm') as FormArray).at(index).get('resultStatus').setValue(1);
    }else{
      console.log("fail");
      (this.BNAExamMarkForm.get('approveTraineeListForm') as FormArray).at(index).get('resultStatusShow').setValue('Fail');
      (this.BNAExamMarkForm.get('approveTraineeListForm') as FormArray).at(index).get('resultStatus').setValue(0);
    }
  }

  getSelectedCourseDurationByCourseTypeIdAndCourseNameId(){
    this.BNAExamMarkService.getSelectedCourseDurationByCourseTypeIdAndCourseNameId(MasterData.coursetype.CentralExam,MasterData.courseName.StaffCollage).subscribe(res => {
      console.log("courseName");
      this.selectedCourseDurationByCourseTypeAndCourseName = res;
    });
  }
  onSubjectNameSelectionChangeGetTotalMarkAndPassMark(dropdown) {

    if (dropdown.isUserInput) {
      //console.log(dropdown);

      
      var subjectNameId = dropdown.source.value.value;
      var subjectName = dropdown.source.value.text;
      console.log("dropdown");
      console.log(dropdown);

      var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
      var courseDurationId = this.BNAExamMarkForm.value['courseDurationId'];
      //this.bnaSubjectNameId = dropdown.source.value.value;

      this.bnaSubjectNameId = subjectNameId;
      //var courseModuleId = subjectArr[1]; GetSubjectMarkByCourseNameIdSubjectNameId
      this.BNAExamMarkForm.get('bnaSubjectName').setValue(subjectName);
      this.BNAExamMarkForm.get('bnaSubjectNameId').setValue(this.bnaSubjectNameId);
      
      // this.BNAExamMarkService.GetSubjectMarkByBaseSchoolNameIdCourseNameAndSubjectNameId(baseSchoolNameId, courseNameId, this.bnaSubjectNameId).subscribe(res => {
      //   console.log("ddddddddddddd");
      //   this.subjectMarkList = res;
      //   console.log(this.subjectMarkList);
      // });

      this.BNAExamMarkService.GetSubjectMarkByCourseNameIdSubjectNameId(courseNameId, this.bnaSubjectNameId).subscribe(res => {       
       this.subjectMarkList = res;
        console.log("check");
        console.log(this.subjectMarkList);
      });


      this.BNAExamMarkService.getClassRoutineIdForStaffCollege(this.courseDurationId, courseNameId, this.bnaSubjectNameId).subscribe(res => {
        this.classRoutineId = res;
        console.log("ddddddddddddd");
        console.log(this.classRoutineId);
        this.BNAExamMarkForm.get('classRoutineId').setValue(this.classRoutineId);
      });
      // getClassRoutineIdForStaffCollege
      // this.BNAExamMarkService.getselectedmarktypes(baseSchoolNameId, courseNameId, this.bnaSubjectNameId, 5).subscribe(res => {
      //   this.selectedmarktype = res
      //   this.examTypeCount = res.length;
      //   this.BNAExamMarkForm.get('examTypeCount').setValue(this.examTypeCount);
      //   console.log("selectedmarktype count" + this.examTypeCount)
      // });

      // this.BNAExamMarkService.getapprovedMarkTypeByParametersForCentralExam(courseNameId, courseDurationId, this.bnaSubjectNameId).subscribe(res => {
      //   this.selectedmarktype = res
      //   this.examTypeCount = res.length;
      //   this.BNAExamMarkForm.get('examTypeCount').setValue(this.examTypeCount);
      //   console.log("selectedmarktype count" + this.examTypeCount)
      // });

      // GetTotalMarkAndPassMarkByCourseNameIdAndSubjectId

      this.BNAExamMarkService.GetTotalMarkAndPassMarkByCourseNameIdAndSubjectId(courseNameId, this.bnaSubjectNameId).subscribe(res => {

        this.getTotalMarkAndPassMark = res;
        this.totalMark = res[0].totalMark;
        this.passMarkBna = res[0].passMarkBNA
        this.BNAExamMarkForm.get('totalMark').setValue(this.totalMark);
        this.BNAExamMarkForm.get('passMark').setValue(this.passMarkBna);
      });
    }
    //   this.BNAExamMarkService.GetTotalMarkAndPassMarkByBaseSchoolIdCourseIdAndSubjectId(baseSchoolNameId, courseNameId, this.bnaSubjectNameId).subscribe(res => {

    //     this.getTotalMarkAndPassMark = res;
    //     this.totalMark = res[0].totalMark;
    //     this.passMarkBna = res[0].passMarkBNA
    //     this.BNAExamMarkForm.get('totalMark').setValue(this.totalMark);
    //     this.BNAExamMarkForm.get('passMark').setValue(this.passMarkBna);
    //   });
    // }
  }
  onCourseNameSelectionChangeGetSubjectAndTraineeList(dropdown) {

    if (dropdown.isUserInput) {
      // console.log(dropdown);
      var courseNameArr = dropdown.source.value.value.split('_');
      var courseNameTextArr = dropdown.source.value.text.split('_');
      var courseName = courseNameTextArr[0];
      var coursetitle = courseNameTextArr[1];
      this.courseDurationId = courseNameArr[0];
      var courseNameId = courseNameArr[1];

   //   console.log(courseDurationId+ ' - '+courseNameId);
      // console.log("coursename"+courseNameId);
      this.BNAExamMarkForm.get('courseName').setValue(courseName);
      this.BNAExamMarkForm.get('courseNameId').setValue(courseNameId);
      this.BNAExamMarkForm.get('courseDurationId').setValue(this.courseDurationId);
      this.isShown = false;

      var baseSchoolNameId = this.BNAExamMarkForm.value['baseSchoolNameId'];
      this.baseSchoolNameId = baseSchoolNameId;
      var courseNameId = this.BNAExamMarkForm.value['courseNameId'];
      // console.log(baseSchoolNameId +" -"+courseNameId);
      // if (baseSchoolNameId != null && courseNameId != null) {
      //   this.BNAExamMarkService.getSelectedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId, courseNameId, courseDurationId).subscribe(res => {
      //     this.selectedSubjectNameByBaseSchoolNameIdAndCourseNameId = res;
      //   });
      // }
      this.BNAExamMarkService.getSelectedSubjectNameByCourseNameId(courseNameId).subscribe(res => {
             this.selectedSubjectNameByCourseNameId = res;
        });

    }
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
  

  getselectedtraineebytype(){
    var courseNameId=this.BNAExamMarkForm.value['courseNameId'];
    var bnaSubjectNameId=this.BNAExamMarkForm.value['bnaSubjectNameId'];
    var SubjectMarkId=this.BNAExamMarkForm.value['SubjectMarkId'];
    this.isShown = true;
    this.BNAExamMarkService.getCentralexamMarkListByParameters(courseNameId,bnaSubjectNameId,SubjectMarkId,false,1).subscribe(res=>{
      var unapprovedlistItemCount = res.length;
      console.log(unapprovedlistItemCount);
      if(unapprovedlistItemCount > 0){
        this.traineeList=res;  
        this.ApproveMsgScreen=false;
        this.isShown=true;   
        this.clearList();
        this.getTraineeListonClick(); 
      }else{
        this.isShown=false;  
        this.ApproveMsgScreen=true;
        this.BNAExamMarkService.getCentralexamMarkListByParameters(courseNameId,bnaSubjectNameId,SubjectMarkId,true,1).subscribe(response=>{
          var approvedlistItemCount = response.length;
          console.log("check")
          console.log(response)
          if(approvedlistItemCount > 0 ){
            this.ApproveMsg = "Records are already Approved!";
            console.log(this.ApproveMsg)
          }else{
            this.ApproveMsg = "Marks are not isnerted Yet!";
            console.log(this.ApproveMsg)
          }
        });
        
      }
      
    }); 
    this.onSubjectMarkSelectionGetPassMark();
  }




  getselectedcoursedurationbyschoolname(){
    var baseSchoolNameId=this.BNAExamMarkForm.value['baseSchoolNameId'];
    this.isShown=false;
    
    this.BNAExamMarkService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
    
      this.selectedcoursedurationbyschoolname=res;
    }); 
  }
  
  getselectedcoursename(){
    this.BNAExamMarkService.getselectedcoursename().subscribe(res=>{
      this.selectedcoursename=res
    });
  }

  getTraineeListonClick(){ 
    const control = <FormArray>this.BNAExamMarkForm.controls["approveTraineeListForm"];
    console.log(this.traineeList)   
    for (let i = 0; i < this.traineeList.length; i++) {
      control.push(this.createTraineeData()); 
      console.log(this.traineeList[i]);
      if(this.traineeList[i].resultStatus == 1){
        (this.BNAExamMarkForm.get('approveTraineeListForm') as FormArray).at(i).get('resultStatusShow').setValue('Pass');
      }else{
        (this.BNAExamMarkForm.get('approveTraineeListForm') as FormArray).at(i).get('resultStatusShow').setValue('Fail');
      }
    }
    this.BNAExamMarkForm.patchValue({ approveTraineeListForm: this.traineeList });
  }

  clearList() {
    const control = <FormArray>this.BNAExamMarkForm.controls["approveTraineeListForm"];
    while (control.length) {
      control.removeAt(control.length - 1);
    }
    control.clearValidators();
  }

  onSubmit() {
     
    console.log(this.BNAExamMarkForm.value);
    
      
    
      this.confirmService.confirm('Confirm Save message', 'Are You Sure Save This Records?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAExamMarkService.approve(JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
            
            this.BNAExamMarkForm.reset();
            if(this.courseNameId == this.masterData.courseName.StaffCollage){
              this.router.navigateByUrl(`/staff-collage/staffcollegeexamapprove-list`);
            }else if(this.courseNameId == this.masterData.courseName.QExam){
              this.router.navigateByUrl(`/central-exam/qexamapprove-list`);
            }else if(this.courseNameId == this.masterData.courseName.JCOsTraining){
              this.router.navigateByUrl(`/jcos-training/jcosexamapprove-list`);
            }
            this.isShown = false;
           
            this.BNAExamMarkForm.get('isActive').setValue(true);
            this.BNAExamMarkForm.get('isApproved').setValue(false); 
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
      
    //}
  }
}

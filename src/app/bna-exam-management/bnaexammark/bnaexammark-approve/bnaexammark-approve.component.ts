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
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-bnaexammark-approve',
  templateUrl: './bnaexammark-approve.component.html',
  styleUrls: ['./bnaexammark-approve.component.sass']
}) 
export class BNAExamMarkApproveComponent implements OnInit {
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

    ApproveMsgScreen: boolean = false ;
    ApproveMsg:string;

    role:any;
    traineeId:any;
    branchId:any;
    baseSchoolId:any;

    paging = {
      pageIndex: this.masterData.paging.pageIndex,
      pageSize: this.masterData.paging.pageSize,
      length: 1
    }
  
    displayedColumns: string[] = ['sl','markType','passMark', 'mark'];
    displayedColumnsForTraineeList: string[] = ['sl','traineePNo','traineeName', 'obtaintMark','examMarkRemarksId'];

  constructor(private snackBar: MatSnackBar,private authService: AuthService,private traineeNominationService:TraineeNominationService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BNAExamMarkService: BNAExamMarkService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

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
     //this.getSelectedMarkType();
     this.getselectedexammarkremark();
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
      traineeId: [],
      traineeName:[],
      rankPosition:[],
      obtaintMark: [],
      examMarkRemarksId:[],
      createdBy:[],
      dateCreated:[]
    });
  }

  

  getselectedbaseschools(){
    this.BNAExamMarkService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschools=res
   
    });
  }

  getselectedexammarkremark(){
    this.BNAExamMarkService.getselectedexammarkremark().subscribe(res=>{
      this.selectedmarkremarks=res
    
    });
  }
  onCourseNameSelectionChangeGetSubjectAndTraineeList(dropdown){
    if(dropdown.isUserInput) {
    var courseNameArr = dropdown.source.value.value.split('_');
    var courseNameTextArr = dropdown.source.value.text.split('_');
    var courseName = courseNameTextArr[0];
    var coursetitle = courseNameTextArr[1];
    var courseDurationId=courseNameArr[0];
    var courseNameId=courseNameArr[1];
    this.BNAExamMarkForm.get('courseName').setValue(dropdown.text);
    this.BNAExamMarkForm.get('courseNameId').setValue(courseNameId);
    this.BNAExamMarkForm.get('courseDurationId').setValue(courseDurationId);
    this.isShown=false;

    var baseSchoolNameId=this.BNAExamMarkForm.value['baseSchoolNameId'];
    this.baseSchoolNameId=baseSchoolNameId;
    var courseNameId=this.BNAExamMarkForm.value['courseNameId'];
     if(baseSchoolNameId != null && courseNameId != null){
       this.BNAExamMarkService.getApprovedSubjectNameByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId,courseDurationId).subscribe(res=>{
         
        this.selectedSubjectNameByBaseSchoolNameIdAndCourseNameId=res; 
       });
     }
     
     this.BNAExamMarkService.getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId).subscribe(res=>{

      this.selectedCourseDuration=res;   
      console.log("course duration "+this.selectedCourseDuration);
     });
     
  }
}

  getselectedtraineebytype(){
    var baseSchoolNameId=this.BNAExamMarkForm.value['baseSchoolNameId'];
    var courseNameId=this.BNAExamMarkForm.value['courseNameId'];
    var bnaSubjectNameId=this.BNAExamMarkForm.value['bnaSubjectNameId'];
    var SubjectMarkId=this.BNAExamMarkForm.value['SubjectMarkId'];
    
    this.BNAExamMarkService.getexamMarkListByParameters(baseSchoolNameId,courseNameId,bnaSubjectNameId,SubjectMarkId,false).subscribe(res=>{
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
        this.BNAExamMarkService.getexamMarkListByParameters(baseSchoolNameId,courseNameId,bnaSubjectNameId,SubjectMarkId,true).subscribe(response=>{
          var approvedlistItemCount = response.length;
          console.log(approvedlistItemCount)
          if(approvedlistItemCount > 0){
            this.ApproveMsg = "Records are already Approved!";
            console.log(this.ApproveMsg)
          }else{
            this.ApproveMsg = "Marks are not isnerted Yet!";
            console.log(this.ApproveMsg)
          }
        });
        
      }
      
    });   
    console.log("list check - "+this.traineeList); 
    console.log("Final id to get traineelist - " + baseSchoolNameId + " - " + courseNameId + " - " + bnaSubjectNameId + " - " + SubjectMarkId)
   
  }

  onSubjectNameSelectionChangeGetTotalMarkAndPassMark(dropdown){

    if(dropdown.isUserInput) {
        console.log(dropdown);
        
      this.isShown=false;
      var subjectArr = dropdown.source.value.value.split('_');
      
      var baseSchoolNameId=this.BNAExamMarkForm.value['baseSchoolNameId'];  
      var courseNameId=this.BNAExamMarkForm.value['courseNameId'];

      this.bnaSubjectNameId = subjectArr[0];
      var courseModuleId = subjectArr[1];
      this.BNAExamMarkForm.get('bnaSubjectName').setValue(dropdown.text);
      this.BNAExamMarkForm.get('bnaSubjectNameId').setValue(this.bnaSubjectNameId);
     
      this.BNAExamMarkService.GetSubjectMarkByBaseSchoolNameIdCourseNameAndSubjectNameId(baseSchoolNameId,courseNameId,this.bnaSubjectNameId).subscribe(res=>{
        this.subjectMarkList=res;
      });

      this.BNAExamMarkService.GetRoutineIdWithSchoolCourseSubject(baseSchoolNameId,courseNameId,this.bnaSubjectNameId).subscribe(res=>{
        this.classRoutineId=res;
        this.BNAExamMarkForm.get('classRoutineId').setValue(this.classRoutineId);
        
      });

      this.BNAExamMarkService.getapprovededmarktypes(baseSchoolNameId,courseNameId,this.bnaSubjectNameId,courseModuleId).subscribe(res=>{
        this.selectedmarktype=res
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
      console.log(this.traineeList[i])
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
    //const id = this.BNAExamMarkForm.get('bnaExamMarkId').value; 
     
    console.log(this.BNAExamMarkForm.value);
    // if (id) {
    //   this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
    //     console.log(result);
    //     if (result) {
    //       this.BNAExamMarkService.update(+id,JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
    //         this.router.navigateByUrl('/bna-exam-management/bnaexammark-list');
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
          this.BNAExamMarkService.approve(JSON.stringify(this.BNAExamMarkForm.value)).subscribe(response => {
            //this.router.navigateByUrl('/bna-exam-management/bnaexammark-list');
            this.BNAExamMarkForm.reset();
            this.isShown = false;
            //this.BNAExamMarkForm.get('bnaExamMarkId').setValue(0);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectMarkService } from '../../service/SubjectMark.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { SubjectMark } from '../../models/SubjectMark';
import {MasterData} from '../../../../../src/assets/data/master-data';
import { BNAExamMarkService } from '../../service/bnaexammark.service';

@Component({
  selector: 'app-new-subjectmark',
  templateUrl: './new-subjectmark.component.html',
  styleUrls: ['./new-subjectmark.component.sass']
})
export class NewSubjectMarkComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  pageTitle: string;
  destination:string;
  btnText:string;
  SubjectMarkForm: FormGroup;
  validationErrors: string[] = [];
  selectedmarktype:SelectedModel[];
  selectedSchoolName:SelectedModel[];
  selectedCourseModuleByBaseSchoolAndCourseNameId:SelectedModel[];
  selectedsubjectname:SelectedModel[];
  selectedBranch:SelectedModel[];
  selectedSubjectValue:SelectedModel[];
  courseNameId:number;
  isShown: boolean = false ;
  selectedSubjectMark:SubjectMark[];
  selectedCourseDurationByCourseTypeAndCourseName:SelectedModel[];
  courseTypeId:any;

  options = [];
  filteredOptions;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = [ 'ser', 'markType', 'mark', 'passMark', 'actions'];

  constructor(private snackBar: MatSnackBar,private BNAExamMarkService: BNAExamMarkService,private confirmService: ConfirmService,private SubjectMarkService: SubjectMarkService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('subjectMarkId'); 
    if (id) {
      this.pageTitle = 'Edit Subject Mark';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.SubjectMarkService.find(+id).subscribe(
        res => {
          this.SubjectMarkForm.patchValue({          

            subjectMarkId: res.subjectMarkId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId:  res.courseNameId,
            bnaSubjectNameId: res.bnaSubjectNameId,
            branchId:res.branchId,
            courseModuleId: res.courseModuleId,
            markTypeId: res.markTypeId,
            passMark: res.passMark,
            mark: res.mark,
            remarks:res.remarks,    
            status:res.status,
            menuPosition:res.menuPosition,
            course:res.courseName,
            isActive: res.isActive
            //menuPosition: res.menuPosition,
          
          }); 
          this.onSelectedSubjectNameByBranchId(res.branchId);
          this.courseNameId = res.courseNameId;     
          //this.onSelectedSubjectNameByBranchId()     
        }
      );
    } else {
      this.pageTitle = 'Create Central Exam Subject Mark';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getSelectedBranch();
    this.getSelectedKindOfSubject();
    this.getSelectedSchoolName();
    this.getSelectedCourseDurationByCourseTypeIdAndCourseNameId();
    this.getSelectedSubjectNameByCourseNameId();
  }
  intitializeForm() {
    this.SubjectMarkForm = this.fb.group({
      subjectMarkId: [0],
      baseSchoolNameId: [''],
      courseNameId:  [''],
      course:[''],
      courseNames:[''],
      bnaSubjectNameId:[],
      branchId:[],
      courseModuleId: [],
      markTypeId: [],
      passMark: [],
      mark: [],
      remarks:[''],    
      status:[],
      menuPosition:[],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    })
    this.SubjectMarkForm.get('course').valueChanges
    .subscribe(value => {
     
        this.getSelectedCourseAutocomplete(value);
       //console.log(this.courseDurationId+" "+this.courseNameId +" "+this.traineeId)
    })
  }

  getSelectedCourseDurationByCourseTypeIdAndCourseNameId(){
    this.BNAExamMarkService.getSelectedCourseDurationByCourseTypeIdAndCourseNameId(MasterData.coursetype.CentralExam,MasterData.courseName.QExam).subscribe(res => {
      console.log("courseName");
      this.selectedCourseDurationByCourseTypeAndCourseName = res;
    });
  }
  getSelectedSubjectNameByCourseNameId(){
    this.SubjectMarkService.getSelectedSubjectNameByCourseNameId(MasterData.courseName.QExam).subscribe(res=>{
      this.selectedsubjectname=res;
    });
  }
  getSelectedBranch() {
    this.SubjectMarkService.getSelectedBranch().subscribe(res => {
      this.selectedBranch = res
    });
  }
  onSelectedSubjectNameByBranchId(branchId) {
    this.SubjectMarkService.getSelectedSubjectNameByBranchId(branchId).subscribe(res => {
      this.selectedSubjectValue = res
    });
  }

  onCourseNameSelectionChangeGetSelectedSubjectNameList(dropdown){
    var item=dropdown.source.value.value;
    var courseNameArr = item.split('_');
    this.courseTypeId = courseNameArr[0];
    var courseNameId =courseNameArr[1];
  
    this.SubjectMarkForm.get('courseNameId').setValue(courseNameId);

    // this.SubjectMarkService.getSelectedSubjectNameByCourseNameId(courseNameId).subscribe(res=>{
    //   this.selectedsubjectname=res;
    // });
  }
    

  onsubjectSelectionChangeGetsubjectMarkList(){
    // var baseSchoolNameId=this.SubjectMarkForm.value['baseSchoolNameId'];
    var courseNameId=MasterData.courseName.QExam;
    this.SubjectMarkForm.get('courseNameId').setValue(courseNameId);
    console.log("course name id");
    console.log(courseNameId);
    // var courseModuleId=this.SubjectMarkForm.value['courseModuleId'];
    var bnaSubjectNameId=this.SubjectMarkForm.value['bnaSubjectNameId'];
    console.log(courseNameId+"-"+bnaSubjectNameId);
    this.isShown=true;
    if(courseNameId != null  && bnaSubjectNameId !=null){
      this.SubjectMarkService.getSelectedSubjectMarkByCourseNameIdAndBnaSubjectNameId(courseNameId,bnaSubjectNameId).subscribe(res=>{
        this.selectedSubjectMark=res;  
        console.log(this.selectedSubjectMark); 
      }); 
    }
  }

  getselectedbnasubjectname(){
    var baseSchoolNameId=this.SubjectMarkForm.value['baseSchoolNameId'];
    var courseNameId=this.SubjectMarkForm.value['courseNameId'];
    var courseModuleId=this.SubjectMarkForm.value['courseModuleId'];    
    this.SubjectMarkService.getselectedbnasubjectnamebyparameters(baseSchoolNameId,courseNameId,courseModuleId).subscribe(res=>{
      this.selectedsubjectname=res;
    });
  } 



  SubjectMarkListAfterDelete(baseSchoolNameId,courseNameId,courseModuleId,bnaSubjectNameId){
    this.isShown=true;
    if(baseSchoolNameId != null && courseNameId != null && courseModuleId !=null && bnaSubjectNameId !=null){
      this.SubjectMarkService.getselectedsubjectmarkbyparameters(baseSchoolNameId,courseNameId,courseModuleId,bnaSubjectNameId).subscribe(res=>{
        this.selectedSubjectMark=res;  
        console.log(this.selectedSubjectMark); 
      }); 
    }
  }

  getSelectedKindOfSubject(){
    this.SubjectMarkService.getselectedmarktypes().subscribe(res=>{
      this.selectedmarktype=res
    });
  }

  getSelectedSchoolName(){
    this.SubjectMarkService.getSelectedSchoolName().subscribe(res=>{
      this.selectedSchoolName=res
    });
  }

  

  //autocomplete
  onCourseSelectionChanged(item) {
    // console.log(item);
    this.courseNameId = item.value 
    // this.SubjectMarkForm.get('courseNameId').setValue(item.value);
    // this.SubjectMarkForm.get('course').setValue(item.text);
    this.onBaseNameSelectionChangeGetModule();
  }
  getSelectedCourseAutocomplete(cName){
    this.SubjectMarkService.getSelectedCourseByName(cName).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }

  onBaseNameSelectionChangeGetModule(){
    var baseSchoolNameId=this.SubjectMarkForm.value['baseSchoolNameId'];
    var courseNameId=this.SubjectMarkForm.value['courseNameId'];
     
    if(baseSchoolNameId != null && courseNameId != null){
      this.SubjectMarkService.getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId).subscribe(res=>{
        this.selectedCourseModuleByBaseSchoolAndCourseNameId=res;     
      });
    }  
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  
  onSubmit() {
    const id = this.SubjectMarkForm.get('subjectMarkId').value;  
    console.log(this.SubjectMarkForm.value);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.SubjectMarkService.update(+id,this.SubjectMarkForm.value).subscribe(response => {
            this.router.navigateByUrl('/central-exam/add-qexamsubjectmark');
            
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
    }  else {
      this.loading=true;
      this.SubjectMarkService.submit(this.SubjectMarkForm.value).subscribe(response => {
        // this.router.navigateByUrl('/subject-management/add-subjectmark');
        this.reloadCurrentRoute();
        this.onsubjectSelectionChangeGetsubjectMarkList();
        this.SubjectMarkForm.reset();
        this.SubjectMarkForm.get('subjectMarkId').setValue(0);
        this.SubjectMarkForm.get('isActive').setValue(true);
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

  deleteItem(row) {
    const id = row.subjectMarkId; 
    var baseSchoolNameId=row.baseSchoolNameId;
    var courseNameId=row.courseNameId;
    var courseModuleId=row.courseModuleId;
    var bnaSubjectNameId=row.bnaSubjectNameId;
    console.log("deleted - "+baseSchoolNameId,courseModuleId,courseNameId,bnaSubjectNameId)
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.SubjectMarkService.delete(id).subscribe(() => {
          this.SubjectMarkListAfterDelete(baseSchoolNameId,courseNameId,courseModuleId,bnaSubjectNameId);
          this.reloadCurrentRoute();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })    
  }

}

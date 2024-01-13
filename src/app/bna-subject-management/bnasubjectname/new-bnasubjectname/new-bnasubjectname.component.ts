import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNASubjectNameService } from '../../service/BNASubjectName.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { CourseNameService } from '../../../basic-setup/service/CourseName.service';
import { MasterData } from 'src/assets/data/master-data';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BNASubjectName } from '../../models/BNASubjectName';


@Component({
  selector: 'app-edit-bnasubjectname',
  templateUrl: './new-bnasubjectname.component.html',
  styleUrls: ['./new-bnasubjectname.component.sass'] 
})
export class NewBNASubjectNameComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  pageTitle: string; 
  destination:string;
  btnText:string;
  courseNameId:number;
  BNASubjectNameForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];
  selectedSemester:SelectedModel[];
  selectedSchoolName:SelectedModel[];
  selectedCourseName:SelectedModel[];
  selectedSubjectCategory:SelectedModel[];
  selectedSubjectCurriculum:SelectedModel[];
  selectedSubjectType:SelectedModel[];
  selectedKindOfSubject:SelectedModel[];
  selectedSubjectClassification:SelectedModel[];
  selectedResultStatus:SelectedModel[];
  selectedCourseModule:SelectedModel[];
  selectedCourseModuleByBaseSchoolAndCourseNameId:SelectedModel[];
  selectedCourseByParameterRequest:BNASubjectName[];
  status=1;
  isShown: boolean = false ;

  options = [];
  filteredOptions;


  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser','subjectName','subjectCode','subjectCategoryName','bnaSubjectCurriculum','subjectType','kindOfSubject','subjectClassification','totalMark','passMarkBna','passMarkBup',/*'bnaSemesterId','courseNameId','isActive',*/ 'actions'];
  constructor(private snackBar: MatSnackBar,private CourseNameService: CourseNameService,private confirmService: ConfirmService,private CodeValueService:CodeValueService,private BNASubjectNameService: BNASubjectNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Subject Name';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.BNASubjectNameService.find(+id).subscribe(
        res => {
          this.BNASubjectNameForm.patchValue({          

            bnaSubjectNameId: res.bnaSubjectNameId,
           //bnaSemesterId: res.bnaSemesterId,
            courseModuleId:res.courseModuleId,
            subjectCategoryId:res.subjectCategoryId,
            bnaSubjectCurriculumId:res.bnaSubjectCurriculumId,
            courseNameId:res.courseNameId,
            resultStatusId:res.resultStatusId,
            subjectTypeId:res.subjectTypeId,
            kindOfSubjectId:res.kindOfSubjectId,
            baseSchoolNameId:res.baseSchoolNameId,
            subjectClassificationId:res.subjectClassificationId,
            subjectName:res.subjectName,
            subjectNameBangla:res.subjectNameBangla,
            subjectShortName:res.subjectShortName,
            subjectCode:res.subjectCode,
            totalMark:res.totalMark,
            passMarkBna:res.passMarkBna,
            passMarkBup:res.passMarkBup,
            classTestMark:res.classTestMark,
            assignmentMark:res.assignmentMark,
            caseStudyMark:res.caseStudyMark,
            totalPeriod:res.totalPeriod,
            course:res.courseName,
            isActive:res.isActive
            //menuPosition: res.menuPosition,
          });
          this.courseNameId = res.courseNameId;    
          this.onBaseNameSelectionChangeGetModule();     
        }
      );
    } else {
      this.pageTitle = 'Create BNA Subject Name';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.getSelectedBnaSemester();
    this.getSelectedSchoolName();
    this.getSelectedCourseName();
    this.getSelectedSubjectCategory();
    this.getSelectedSubjectCurriculum();
    this.getSelectedSubjectType();
    this.getSelectedKindOfSubject();
    this.getSelectedSubjectClassification();
    this.getSelectedResultStatus();
    this.getSelectedCourseModule();
    //this.getSelectedModule();

    this.intitializeForm();
  }
  intitializeForm() {
    this.BNASubjectNameForm = this.fb.group({
      bnaSubjectNameId: [0],
      //bnaSemesterId: [''],
      courseModuleId:[''],
      subjectCategoryId: ['', Validators.required],
      bnaSubjectCurriculumId: ['', Validators.required],
      courseNameId: ['', Validators.required],
      course:[''],
      resultStatusId: [''],
      subjectTypeId: [''],
      kindOfSubjectId: [''],
      baseSchoolNameId: ['', Validators.required],
      subjectClassificationId: ['', Validators.required],
      subjectName:['', Validators.required],
      subjectNameBangla:[''],
      subjectShortName:[''],
      subjectCode:['', Validators.required],
      totalMark:[''],
      passMarkBna:[''],
      passMarkBup:[''],
      classTestMark:[''],
      assignmentMark:[''],
      caseStudyMark:[''],
      totalPeriod:[''],
      status:[this.status],
      isActive: [true],
    
    })
    this.BNASubjectNameForm.get('course').valueChanges
    .subscribe(value => {
     
        this.getSelectedCourseAutocomplete(value);
       //console.log(this.courseDurationId+" "+this.courseNameId +" "+this.traineeId)
    })
  }
  inActiveItem(value){

  }

  onBaseNameSelectionChangeGetModule(){
   var baseSchoolNameId=this.BNASubjectNameForm.value['baseSchoolNameId'];
   var courseNameId=this.BNASubjectNameForm.value['courseNameId'];
    
    if(baseSchoolNameId != null && courseNameId != null){
      this.BNASubjectNameService.getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId).subscribe(res=>{
        this.selectedCourseModuleByBaseSchoolAndCourseNameId=res;     
        console.log( this.selectedCourseModuleByBaseSchoolAndCourseNameId); 
      });
    }  
  }

  onModuleSelectionChangeGetsubjectList(){
    var baseSchoolNameId=this.BNASubjectNameForm.value['baseSchoolNameId'];
    var courseNameId=this.BNASubjectNameForm.value['courseNameId'];
    var courseModuleId=this.BNASubjectNameForm.value['courseModuleId'];
    console.log(baseSchoolNameId +" -"+courseNameId+"- "+courseModuleId);
    this.isShown=true;
    if(baseSchoolNameId != null && courseNameId != null && courseModuleId !=null){
      this.BNASubjectNameService.getSelectedCourseByParameters(baseSchoolNameId,courseNameId,courseModuleId,this.status).subscribe(res=>{
        this.selectedCourseByParameterRequest=res;  
        console.log("6666");
        console.log(this.selectedCourseByParameterRequest); 
      }); 
    }
  }
  getSelectedCourseModule(){
    this.BNASubjectNameService.getSelectedCourseModule().subscribe(res=>{
      this.selectedCourseModule=res;     
      //console.log(this.selectedCourseModule); 
    })
  }

  getSelectedResultStatus(){
    this.CodeValueService.getSelectedCodeValueByType(this.masterData.codevaluetype.ResultStatus).subscribe(res=>{
      this.selectedResultStatus=res;     
     // console.log(this.selectedResultStatus); 
    })
  }
  
  getSelectedBnaSemester(){
    this.BNASubjectNameService.getSelectedBnaSemester().subscribe(res=>{
      this.selectedSemester=res
    });
  } 
  getSelectedSchoolName(){
    this.BNASubjectNameService.getSelectedSchoolName().subscribe(res=>{
      this.selectedSchoolName=res
    });
  }
  //autocomplete
  onCourseSelectionChanged(item) {
    // console.log(item);
    this.courseNameId = item.value 
    this.BNASubjectNameForm.get('courseNameId').setValue(item.value);
    this.BNASubjectNameForm.get('course').setValue(item.text);
    this.onBaseNameSelectionChangeGetModule();
  }
  getSelectedCourseAutocomplete(cName){
    this.CourseNameService.getSelectedCourseByName(cName).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }
  
  getSelectedCourseName(){
    this.BNASubjectNameService.getSelectedCourseName().subscribe(res=>{
      this.selectedCourseName=res
    });
  }
 
  getSelectedSubjectCategory(){
    this.BNASubjectNameService.getSelectedSubjectCategory().subscribe(res=>{
      this.selectedSubjectCategory=res
    });
  }
 
  getSelectedSubjectCurriculum(){
    this.BNASubjectNameService.getSelectedSubjectCurriculum().subscribe(res=>{
      this.selectedSubjectCurriculum=res
    });
  } 

  getSelectedSubjectType(){
    this.BNASubjectNameService.getSelectedSubjectType().subscribe(res=>{
      this.selectedSubjectType=res
    });
  }
 
  getSelectedKindOfSubject(){
    this.BNASubjectNameService.getSelectedKindOfSubject().subscribe(res=>{
      this.selectedKindOfSubject=res
    });
  }

  getSelectedSubjectClassification(){
    this.BNASubjectNameService.getSelectedSubjectClassification().subscribe(res=>{
      this.selectedSubjectClassification=res
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  onSubmit() {
    const id = this.BNASubjectNameForm.get('bnaSubjectNameId').value;
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNASubjectNameService.update(+id,this.BNASubjectNameForm.value).subscribe(response => {
            // this.router.navigateByUrl('/bna-subject-management/bnasubjectname-list');
            this.reloadCurrentRoute();
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
      this.loading=true;
      this.BNASubjectNameService.submit(this.BNASubjectNameForm.value).subscribe(response => {
        this.reloadCurrentRoute();
        // this.router.navigateByUrl('/bna-subject-management/bnasubjectname-list');
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
    const id = row.bnaSubjectNameId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This BNASubjectName Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNASubjectNameService.delete(id).subscribe(() => {
          this.onModuleSelectionChangeGetsubjectList();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })
    
  }

}

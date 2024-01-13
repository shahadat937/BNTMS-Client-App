import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAExamInstructorAssignService } from '../../service/bnaexaminstructorassign.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ClassRoutineService } from '../../../routine-management/service/classroutine.service';
import { TraineeNominationService } from '../../../course-management/service/traineenomination.service';
import { BNAExamInstructorAssign } from '../../models/bnaexaminstructorassign';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-new-bnaexaminstructorassign',
  templateUrl: './new-bnaexaminstructorassign.component.html',
  styleUrls: ['./new-bnaexaminstructorassign.component.sass']
}) 
export class NewBNAExamInstructorAssignComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  BNAExamInstructorAssignForm: FormGroup;
  validationErrors: string[] = [];
  selectedsubject:SelectedModel[];
  selectedbasename:SelectedModel[];
  selectedschool:SelectedModel[];
  selectedinstructor:SelectedModel[];
  selectedclassselect:SelectedModel[];
  selectedcoursedurationbyschoolname:SelectedModel[];
  selectedbaseschool:SelectedModel[];
  selectedclasstype:SelectedModel[];
  selectedLocationType:SelectedModel[];
  selectedclassperiod:SelectedModel[];
  selectedsubjectname:SelectedModel[];
  selectedSchool:SelectedModel[];
  selectedCourseModule:SelectedModel[];
  selectedModule:SelectedModel[];
  selectedcoursename:SelectedModel[];
  selectedclassroutine:SelectedModel[];
  selectedCourseModuleByBaseSchoolAndCourseNameId:SelectedModel[];
  selectedInstructorList:BNAExamInstructorAssign[];
  //traineeId:number;
  isShown: boolean = false ;

  role:any;
  traineeId:any;
  branchId:any;
  baseSchoolId:any;

  options = [];

  filteredOptions;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['ser','classRoutine','trainee','bnaInstructorType','examLocation', 'actions'];
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private TraineeNominationService: TraineeNominationService,private confirmService: ConfirmService,private ClassRoutineService: ClassRoutineService,private CodeValueService: CodeValueService,private BNAExamInstructorAssignService: BNAExamInstructorAssignService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaExamInstructorAssignId');
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    if (id) {
      this.pageTitle = 'Edit Exam Instructor Assign'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.BNAExamInstructorAssignService.find(+id).subscribe(
        res => {
          this.BNAExamInstructorAssignForm.patchValue({          
            bnaExamInstructorAssignId:res.bnaExamInstructorAssignId, 
            baseSchoolNameId: res.baseSchoolNameId, 
            courseDurationId:res.courseDurationId, 
            courseNameId:res.courseNameId, 
            courseModuleId:res.courseModuleId, 
            bnaSubjectNameId:res.bnaSubjectNameId,
            classRoutineId:res.classRoutineId,
            bnaInstructorTypeId:res.bnaInstructorTypeId,
            traineeId:res.traineeId,
            examLocation:res.examLocation,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Exam Instructor Assign';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.BNAExamInstructorAssignForm.get('baseSchoolNameId').setValue(this.branchId);
      this.getselectedcoursedurationbyschoolname();
     }
    //this.getselectedbnasubjectname();
    this.getselectedbasename();
    this.getselectedbnainstructortype();
    this.getselectedbnaclasssectionselection();
    this.getselectedschools();
  }
  intitializeForm() {
    this.BNAExamInstructorAssignForm = this.fb.group({
      bnaExamInstructorAssignId: [0],
      baseSchoolNameId:['',Validators.required],
      courseDurationId:[],
      courseNameId:['',Validators.required],
      courseName:[''],
      courseModuleId:[],
      bnaSubjectNameId:[],
      classRoutineId:[],
      bnaInstructorTypeId:[],
      traineeId:[],
      traineeName:[''],
      examLocation:[''],
      status:[1],
      isActive: [true],    
    })
    //autocomplete
    this.BNAExamInstructorAssignForm.get('traineeName').valueChanges
    .subscribe(value => {
      
        this.getSelectedTraineeByPno(value);
    })
  }

  //autocomplete
  getSelectedTraineeByPno(pno){
    this.TraineeNominationService.getSelectedTraineeByPno(pno).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    }) 
  }
  //autocomplete
  onTraineeSelectionChanged(item) {
    console.log(item.value);
    this.traineeId = item.value
    this.BNAExamInstructorAssignForm.get('traineeId').setValue(item.value);
    this.BNAExamInstructorAssignForm.get('traineeName').setValue(item.text);
  }
  



  onBaseNameSelectionChangeGetModule(dropdown){
    const id = this.route.snapshot.paramMap.get('classRoutineId'); 
    if(id){
      var courseDurationId = dropdown[0];
      var courseNameId=dropdown[1];
      var baseSchoolNameId=dropdown[2];
    }else{
      var baseSchoolNameId=this.BNAExamInstructorAssignForm.value['baseSchoolNameId'];
      var courseNameArr = dropdown.value.split('_');
      var courseDurationId = courseNameArr[0];
      var courseNameId=courseNameArr[1];
      this.BNAExamInstructorAssignForm.get('courseName').setValue(dropdown.text);
      this.BNAExamInstructorAssignForm.get('courseNameId').setValue(courseNameId);
      this.BNAExamInstructorAssignForm.get('courseDurationId').setValue(courseDurationId);
    }    
    
    if(baseSchoolNameId != null && courseNameId != null){
      this.ClassRoutineService.getSelectedCourseModuleByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId).subscribe(res=>{
        this.selectedCourseModuleByBaseSchoolAndCourseNameId=res;     
        
      });
      this.ClassRoutineService.getselectedClassPeriodbyschoolandcourse(baseSchoolNameId,courseNameId).subscribe(res=>{
        this.selectedclassperiod=res;
      });
    }  
  }

  getselectedbaseschools(){
    this.ClassRoutineService.getselectedbaseschools().subscribe(res=>{
      this.selectedbaseschool=res;
    });
  } 

  

  getselectedcoursedurationbyschoolname(){
      var baseSchoolNameId=this.BNAExamInstructorAssignForm.value['baseSchoolNameId'];
      this.ClassRoutineService.getselectedcoursedurationbyschoolname(baseSchoolNameId).subscribe(res=>{
        
        this.selectedcoursedurationbyschoolname=res;
      });
  } 

 

  getselectedbnasubjectname(){
    var baseSchoolNameId=this.BNAExamInstructorAssignForm.value['baseSchoolNameId'];
    var courseNameId=this.BNAExamInstructorAssignForm.value['courseNameId'];
    var courseModuleId=this.BNAExamInstructorAssignForm.value['courseModuleId'];    
    this.ClassRoutineService.getselectedbnasubjectnamebyparameters(baseSchoolNameId,courseNameId,courseModuleId).subscribe(res=>{
      this.selectedsubjectname=res;
    });
  } 

  getselectedclassroutine(){
    var baseSchoolNameId=this.BNAExamInstructorAssignForm.value['baseSchoolNameId'];
    var courseNameId=this.BNAExamInstructorAssignForm.value['courseNameId'];
    var courseModuleId=this.BNAExamInstructorAssignForm.value['courseModuleId'];  
    var bnaSubjectNameId=this.BNAExamInstructorAssignForm.value['bnaSubjectNameId'];    
    this.BNAExamInstructorAssignService.getselectedclassroutinebyparameters(baseSchoolNameId,courseNameId,courseModuleId,bnaSubjectNameId).subscribe(res=>{
      this.selectedclassroutine=res;
    });
    this.onParametersSelectGeInstructorList();
  } 

  onParametersSelectGeInstructorList(){
    var baseSchoolNameId=this.BNAExamInstructorAssignForm.value['baseSchoolNameId'];
    var courseNameId=this.BNAExamInstructorAssignForm.value['courseNameId'];
    var courseModuleId=this.BNAExamInstructorAssignForm.value['courseModuleId'];  
    var bnaSubjectNameId=this.BNAExamInstructorAssignForm.value['bnaSubjectNameId'];  
    
    this.isShown=true;
    if(baseSchoolNameId != null && courseNameId != null && courseModuleId !=null && bnaSubjectNameId !=null){
      this.BNAExamInstructorAssignService.getSelectedInstructorByParameters(baseSchoolNameId,courseNameId,courseModuleId,bnaSubjectNameId).subscribe(res=>{
        this.selectedInstructorList=res;  
        console.log(this.selectedInstructorList); 
      }); 
    }
  }

  getselectedCourseModules(){
    this.ClassRoutineService.getselectedCourseModules().subscribe(res=>{
      this.selectedCourseModule=res;
    });
  } 

  
  
  getselectedbasename(){
    this.BNAExamInstructorAssignService.getselectedbasename().subscribe(res=>{
      this.selectedbasename=res;
    });
  }
  getselectedschools(){
    this.BNAExamInstructorAssignService.getselectedschools().subscribe(res=>{
      this.selectedschool=res;
    });
  }
  getselectedbnainstructortype(){
    this.BNAExamInstructorAssignService.getselectedbnainstructortype().subscribe(res=>{
      this.selectedinstructor=res;
    });
  }

  getselectedbnaclasssectionselection(){
    this.BNAExamInstructorAssignService.getselectedbnaclasssectionselection().subscribe(res=>{
      this.selectedclassselect=res;
    });
  }


  onSubmit() {
    const id = this.BNAExamInstructorAssignForm.get('bnaExamInstructorAssignId').value;   
    
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.BNAExamInstructorAssignService.update(+id,this.BNAExamInstructorAssignForm.value).subscribe(response => {
            this.router.navigateByUrl('/exam-management/add-bnaexaminstructorassign');
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
      this.loading = true;
      this.BNAExamInstructorAssignService.submit(this.BNAExamInstructorAssignForm.value).subscribe(response => {
        
        this.onParametersSelectGeInstructorList();
        this.BNAExamInstructorAssignForm.reset();
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
    const id = row.bnaExamInstructorAssignId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNAExamInstructorAssignService.delete(id).subscribe(() => {
          this.onParametersSelectGeInstructorList();
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

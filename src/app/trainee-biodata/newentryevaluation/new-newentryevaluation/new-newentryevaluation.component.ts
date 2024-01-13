import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { NewEntryEvaluationService } from '../../service/NewEntryEvaluation.service';
import { MasterData } from 'src/assets/data/master-data';
import { NewEntryEvaluation } from '../../models/NewEntryEvaluation';
import { BIODataGeneralInfoService } from '../../biodata-tab-layout/service/BIODataGeneralInfo.service';
import { TraineeNominationService } from 'src/app/course-management/service/traineenomination.service';
import { TraineeListNewEntryEvaluation } from '../../models/traineeList';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-new-newentryevaluation',
  templateUrl: './new-newentryevaluation.component.html',
  styleUrls: ['./new-newentryevaluation.component.sass']
})
export class NewNewEntryEvaluationComponent implements OnInit {
  buttonText:string;
  pageTitle: string;
   masterData = MasterData;
  loading = false;
  destination:string;
  NewEntryEvaluationForm: FormGroup;
  validationErrors: string[] = [];
  schoolNameValues:SelectedModel[];
  courseNameValues:SelectedModel[];
  courseModuleValues:SelectedModel[];
  weekNameValues:SelectedModel[];
  pnoValues:SelectedModel[];
  selectedCourseDurationByParameterRequest:number;
  selectedCourseDuration:number;
  traineeList: TraineeListNewEntryEvaluation[];
  //selectedCastes:SelectedModel[];
  //nationalityValues:SelectedModel[];
  //selectedRelation:SelectedModel[];
  //traineeId:number;
  //familyInfoList:FamilyInfo[];
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

  displayedColumns: string[] = ['ser','traineePNo','noitikota', 'sahonsheelota','utsaho','samayanubartita', 'manovhab','udyam', 'khapKhawano','onyano'];
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private BIODataGeneralInfoService: BIODataGeneralInfoService, private NewEntryEvaluationService: NewEntryEvaluationService,private fb: FormBuilder, private router: Router,private traineeNominationService:TraineeNominationService,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)


    const id = this.route.snapshot.paramMap.get('newEntryEvaluationId');  
     
    if (id) {
      this.pageTitle = 'Edit New Entry Evaluation';
      this.destination='Edit';
      this.buttonText="Update";
      this.NewEntryEvaluationService.find(+id).subscribe(
        res => {
          this.NewEntryEvaluationForm.patchValue({          

            newEntryEvaluationId: res.newEntryEvaluationId,
            traineeId: res.traineeId,
            baseSchoolNameId: res.baseSchoolNameId,
            courseNameId: res.courseNameId,
            courseModuleId: res.courseModuleId,
            courseDurationId: res.courseDurationId,
            courseWeekId: res.courseWeekId,
            traineeNominationId: res.traineeNominationId,
            noitikota: res.noitikota,
            sahonsheelota: res.sahonsheelota,
            utsaho:res.utsaho,
            samayanubartita: res.samayanubartita,
            manovhab:res.manovhab,
            udyam: res.udyam,
            khapKhawano:res.khapKhawano,
            onyano: res.onyano,
            remarks: res.remarks,
            //pno:res.traineePNo,
            
          
          });  
          this.onSchoolSelectionChangeGetCourseName(res.baseSchoolNameId);
          // this.onDistrictSelectionChangeGetThana(res.districtId);
          // this.onReligionSelectionChangeGetCastes(res.religionId);  
          this.onCourseSelectionChangeGetCourseModule(res.baseSchoolNameId)
          
        }
      );
    } else {
      this.pageTitle = 'Create New Entry Evaluation';
      this.destination='Add';
      this.buttonText="Save";
    }
    
    this.intitializeForm();
    if(this.role === 'Super Admin'){
      this.onSchoolSelectionChangeGetCourseName(this.branchId);
    }
    this.getselectedSchool();
    //this.getselectedCourseName(); 
    //this.getselectedCourseModules(); 
    this.getselectedCourseWeek();
    //this.getselectedPno(); 
    this.getselectedPno(); 
    //this.getSelectedPno();
    
  }
  intitializeForm() {
    this.NewEntryEvaluationForm = this.fb.group({
      newEntryEvaluationId: [0],
      baseSchoolNameId:[],
     // pno:[''],
     courseNameId:[],
     courseName:[''],
     courseModuleId: [],
     courseDurationId:[],
     courseWeekId:[],
     traineeId: [],
     traineeNominationId:[],
     noitikota:[],
     utsaho: [],
     sahonsheelota:[],
     samayanubartita: [],
     manovhab:[],
     udyam: [],
     khapKhawano:[],
     onyano: [],
     remarks:[''],
     traineeListForm: this.fb.array([
      this.createTraineeData()
    ]),
      isActive: [true],
    
    })
    // //autocomplete for pno
    // this.NewEntryEvaluationForm.get('pno').valueChanges
    // .subscribe(value => {
    //     this.getSelectedPno(value);
    // })
  }
  getControlLabel(index: number,type: string){
    return  (this.NewEntryEvaluationForm.get('traineeListForm') as FormArray).at(index).get(type).value;
   }
  private createTraineeData() {
 
    return this.fb.group({
      courseNameId: [],
      status: [],
      traineePNo:[],
      traineeNominationId:[],
      traineeId: [],
      traineeName:[],
      rankPosition:[],
      noitikota: [],
      utsaho:[],
      sahonsheelota: [],
      samayanubartita:[],
      manovhab: [],
      udyam:[],
      khapKhawano: [],
      onyano:[]
    });
  }

 getTraineeListonClick(){ 
  const control = <FormArray>this.NewEntryEvaluationForm.controls["traineeListForm"];
console.log('vvvv')
  console.log(this.traineeList)   
  for (let i = 0; i < this.traineeList.length; i++) {
    control.push(this.createTraineeData()); 
    //console.log(this.traineeList[i])
  }
  this.NewEntryEvaluationForm.patchValue({ traineeListForm: this.traineeList });
 }

 clearList() {
  const control = <FormArray>this.NewEntryEvaluationForm.controls["traineeListForm"];
  while (control.length) {
    control.removeAt(control.length - 1);
  }
  control.clearValidators();
}

  getselectedSchool(){
    this.NewEntryEvaluationService.getselectedSchool().subscribe(res=>{
      this.schoolNameValues=res
    });
  }
  onSchoolSelectionChangeGetCourseName(baseSchoolNameId){
    if(this.role === 'Super Admin'){
      this.NewEntryEvaluationForm.get('baseSchoolNameId').setValue(baseSchoolNameId);
    }
    this.NewEntryEvaluationService.getselectedCourseNameBySchool(baseSchoolNameId).subscribe(res=>{
      this.courseNameValues=res
    });
  }
  onCourseSelectionChangeGetCourseModule(dropdown){ 
    if (dropdown.isUserInput) {
      console.log(dropdown);

      var baseSchoolNameId = this.NewEntryEvaluationForm.value['baseSchoolNameId'];
      var courseNameArr = dropdown.source.value.split('_');
      var courseDurationId = courseNameArr[0];
      var courseNameId = courseNameArr[1];

      this.NewEntryEvaluationForm.get('courseName').setValue(dropdown.text);
      this.NewEntryEvaluationForm.get('courseNameId').setValue(courseNameId);
      this.NewEntryEvaluationForm.get('courseDurationId').setValue(courseDurationId);

      console.log("course duration" + courseDurationId);
      console.log("course name" + courseNameId);

      this.NewEntryEvaluationService.getselectedCourseModulesBySchoolAndCourse(baseSchoolNameId,courseNameId).subscribe(res=>{
        this.courseModuleValues=res
        console.log(this.courseModuleValues)
      });
    }   
    // var baseSchoolNameId=this.NewEntryEvaluationForm.value['baseSchoolNameId'];
    // console.log('baseSchool')
    // console.log(baseSchoolNameId)
    
  }
  
  getselectedCourseWeek(){
    this.NewEntryEvaluationService.getselectedCourseWeek().subscribe(res=>{
      this.weekNameValues=res
      
    });
  }
  onClassPeriodSelectionChangeGetCourseDuration(){  
    this.isShown=true
    var baseSchoolNameId=this.NewEntryEvaluationForm.value['baseSchoolNameId'];
    var courseNameId=this.NewEntryEvaluationForm.value['courseNameId'];
    
     if(baseSchoolNameId != null && courseNameId != null){
      this.NewEntryEvaluationService.getSelectedCourseDurationByParameterRequestFromNewEntryEvaluation(baseSchoolNameId,courseNameId).subscribe(res=>{
        this.selectedCourseDurationByParameterRequest=res; 
        
      });
      this.NewEntryEvaluationService.getCourseDurationByBaseSchoolNameIdAndCourseNameId(baseSchoolNameId,courseNameId).subscribe(res=>{
        
        this.selectedCourseDuration=res;   
        console.log("course duration "+this.selectedCourseDuration);
        this.NewEntryEvaluationForm.get('courseDurationId').setValue(this.selectedCourseDuration);
        this.traineeNominationService.getNewTraineeNominationByCourseDurationId(this.selectedCourseDuration).subscribe(res=>{
          this.traineeList=res; 
          this. clearList();
          this.getTraineeListonClick();
          console.log(this.traineeList);
                  
         });
       });
    }  
   }
  
  getselectedPno(){
    this.NewEntryEvaluationService.getselectedPno().subscribe(res=>{
      this.pnoValues=res
    });
  }

  
   
   reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
    const id = this.NewEntryEvaluationForm.get('newEntryEvaluationId').value; 
    
    
    console.log(this.NewEntryEvaluationForm.value)
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
            this.NewEntryEvaluationService.update(+id,this.NewEntryEvaluationForm.value).subscribe(response => {
              this.router.navigateByUrl('/trainee-biodata/newentryevaluation-list');
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
      this.loading = true;
        this.NewEntryEvaluationService.submit(this.NewEntryEvaluationForm.value).subscribe(response => {
          //this.router.navigateByUrl('/trainee-biodata/newentryevaluation-list');
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
 
  }
}

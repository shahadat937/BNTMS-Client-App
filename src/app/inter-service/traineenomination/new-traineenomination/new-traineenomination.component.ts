import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraineeNominationService } from '../../service/traineenomination.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { Observable, of, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { BIODataGeneralInfoService } from 'src/app/trainee-biodata/service/BIODataGeneralInfo.service';

@Component({
  selector: 'app-new-traineenomination',
  templateUrl: './new-traineenomination.component.html',
  styleUrls: ['./new-traineenomination.component.sass']
}) 
export class NewTraineeNominationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  TraineeNominationForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourse:SelectedModel[];
  selectedduration:SelectedModel[];
  selectedcoursestatus:SelectedModel[];
  selectedLocationType:SelectedModel[];
  selecteddoc:SelectedModel[];
  selectedTrainee:SelectedModel[];
  traineeId:number;
  traineeInfoById:any;
  courseDurationId:string;
  courseNameId:string;

  options = [];
  filteredOptions;
  

  constructor(private snackBar: MatSnackBar,private bioDataGeneralInfoService: BIODataGeneralInfoService,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private TraineeNominationService: TraineeNominationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }
 
  ngOnInit(): void {
   
    const id = this.route.snapshot.paramMap.get('traineeNominationId');  
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId');  
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.TraineeNominationService.findByCourseDuration(+this.courseDurationId).subscribe(
      res => {
        this.TraineeNominationForm.patchValue({          
          traineeNominationId:res.traineeNominationId, 
          courseDurationId: res.courseDurationId, 
          courseNameId:res.courseNameId, 
          traineeId:res.traineeId, 
          traineeCourseStatusId:res.traineeCourseStatusId, 
          saylorRankId:res.saylorRankId,
          rankId:res.rankId,
          saylorBranchId:res.saylorBranchId,
          saylorSubBranchId:res.saylorSubBranchId,
          branchId:res.branchId, 
          withdrawnDocId:res.withdrawnDocId,
          withdrawnRemarks:res.withdrawnRemarks,
          withdrawnDate:res.withdrawnDate,
          status:res.status,
          menuPosition: res.menuPosition,
          isActive: res.isActive,
        });   
      }
    );

    if (id) {
      this.pageTitle = 'Edit Trainee Nomination'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.TraineeNominationService.find(+id).subscribe(
        res => {
          this.TraineeNominationForm.patchValue({          
            traineeNominationId:res.traineeNominationId, 
            courseDurationId: res.courseDurationId, 
            courseNameId:res.courseNameId, 
            traineeId:res.traineeId, 
            traineeCourseStatusId:res.traineeCourseStatusId,
            saylorRankId:res.saylorRankId,
            rankId:res.rankId,
            saylorBranchId:res.saylorBranchId,
            saylorSubBranchId:res.saylorSubBranchId,
            branchId:res.branchId,  
            withdrawnDocId:res.withdrawnDocId,
            withdrawnRemarks:res.withdrawnRemarks,
            withdrawnDate:res.withdrawnDate,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Trainee Nomination';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedcoursename();
    this.getselectedcourseduration();
    this.getselectedTraineeCourseStatus();
    this.getselectedWithdrawnDoc();
    this.getSelectedTrainee();
  }

  intitializeForm() {
    this.TraineeNominationForm = this.fb.group({
      traineeNominationId: [0],
      courseDurationId:[''],
      courseNameId:[''],
      traineeId:[''],
      traineeName:[''],
      traineeCourseStatusId:[],
      saylorRankId:[],
      rankId:[],
      saylorBranchId:[],
      saylorSubBranchId:[],
      branchId:[],
      withdrawnDocId:[],    
      withdrawnRemarks:[''],
      withdrawnDate:[], 
      status:[1],
      isActive: [true],    
    })

    //autocomplete
    this.TraineeNominationForm.get('traineeName').valueChanges
    .subscribe(value => {
     
        this.getSelectedTraineeByPno(value,this.courseDurationId,this.courseNameId);
    })

    
  }

  //autocomplete
  onTraineeSelectionChanged(item) {
    console.log(item.value);
    this.traineeId = item.value
    this.TraineeNominationForm.get('traineeId').setValue(item.value);
    this.TraineeNominationForm.get('traineeName').setValue(item.text);
    this.getTraineeInfoByTraineeId(item.value);
  }



//autocomplete
getSelectedTraineeByPno(pno,courseDurationId,courseNameId){
    this.TraineeNominationService.getSelectedTraineeByparameterRequest(pno,courseDurationId,courseNameId).subscribe(response => {
      this.options = response;
      this.filteredOptions = response;
    })
  }

  getSelectedTrainee(){
    this.TraineeNominationService.getSelectedTrainee().subscribe(res=>{
      this.selectedTrainee=res
    });
  } 

  getselectedcoursename(){
    this.TraineeNominationService.getselectedcoursename().subscribe(res=>{
      this.selectedcourse=res
    });
  } 

  getselectedWithdrawnDoc(){
    this.TraineeNominationService.getselectedWithdrawnDoc().subscribe(res=>{
      this.selecteddoc=res
    });
  } 

  getTraineeInfoByTraineeId(traineeId){
    this.bioDataGeneralInfoService.find(traineeId).subscribe(res=>{
      this.traineeInfoById=res;
      console.log(this.traineeInfoById);
      this.TraineeNominationForm.get('saylorRankId').setValue(res.saylorRankId);
      this.TraineeNominationForm.get('rankId').setValue(res.rankId);
      this.TraineeNominationForm.get('saylorBranchId').setValue(res.saylorBranchId);
      this.TraineeNominationForm.get('saylorSubBranchId').setValue(res.saylorSubBranchId);
      this.TraineeNominationForm.get('branchId').setValue(res.branchId);
    });
  }

  getselectedcourseduration(){
    this.TraineeNominationService.getselectedcourseduration().subscribe(res=>{
      this.selectedduration=res
    });
  }

  getselectedTraineeCourseStatus(){
    this.TraineeNominationService.getselectedTraineeCourseStatus().subscribe(res=>{
      this.selectedcoursestatus=res
    });
  }

  onSubmit() {
    const id = this.TraineeNominationForm.get('traineeNominationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.TraineeNominationService.update(+id,this.TraineeNominationForm.value).subscribe(response => {

            this.router.navigateByUrl('/inter-service/traineenomination-list/'+this.courseDurationId);
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
      this.TraineeNominationService.submit(this.TraineeNominationForm.value).subscribe(response => {
        this.router.navigateByUrl('/inter-service/traineenomination-list/'+this.courseDurationId);
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

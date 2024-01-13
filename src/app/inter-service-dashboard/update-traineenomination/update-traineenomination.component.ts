import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraineeNominationService } from '../../course-management/service/traineenomination.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { Observable, of, Subscription } from 'rxjs';
import { tap, startWith, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-update-traineenomination',
  templateUrl: './update-traineenomination.component.html',
  styleUrls: ['./update-traineenomination.component.sass']
}) 
export class UpdateTraineeNominationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  TraineeNominationForm: FormGroup;
  validationErrors: string[] = [];
  selectedcourse:SelectedModel[];
  selectedcoursestatus:SelectedModel[];
  selectedLocationType:SelectedModel[];
  selecteddoc:SelectedModel[];
  selectedTrainee:SelectedModel[];
  traineeId:number;
  courseDurationId:string;
  courseNameId:string;

  //formGroup : FormGroup;

  options = [];

  filteredOptions;
  

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private TraineeNominationService: TraineeNominationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }
 
  ngOnInit(): void {
   
    const id = this.route.snapshot.paramMap.get('traineeNominationId');      

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
            courseAttendState:res.courseAttendState,
            courseAttendStateRemark:res.courseAttendStateRemark,
            traineeCourseStatusId:res.traineeCourseStatusId, 
            withdrawnDocId:res.withdrawnDocId,
            withdrawnRemarks:res.withdrawnRemarks,
            withdrawnDate:res.withdrawnDate,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } 
    this.intitializeForm();
   // this.getSelectedTraineeByPno();
  }

  intitializeForm() {
    this.TraineeNominationForm = this.fb.group({
      traineeNominationId: [0],
      courseDurationId:[''],
      courseNameId:[''],
      traineeId:[''],
      traineeName:[''],
      traineeCourseStatusId:[],
      courseAttendState:[''],
      courseAttendStateRemark:[''],
      withdrawnDocId:[],    
      withdrawnRemarks:[''],
      withdrawnDate:[], 
      status:[1],
      isActive: [true],    
    })

  }

  onCheckboxChange(event) {
    
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('traineeNominationId'); 
    
    if (id) {
      console.log(this.TraineeNominationForm.value)   
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.TraineeNominationService.update(+id,this.TraineeNominationForm.value).subscribe(response => {

            this.router.navigateByUrl('/admin/dashboard/trainee-dashboard');
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
    }
  }
}

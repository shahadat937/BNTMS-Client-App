import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MilitaryTrainingService } from '../../service/MilitaryTraining.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-military-training',
  templateUrl: './new-military-training.component.html',
  styleUrls: ['./new-military-training.component.sass']
})
export class NewMilitaryTrainingComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  MilitaryTrainingForm: FormGroup; 
  validationErrors: string[] = [];
  districtValues:SelectedModel[]; 
  selectedMilitaryTraining:SelectedModel[]; 
  traineeId: string;

  constructor(private snackBar: MatSnackBar,private MilitaryTrainingService: MilitaryTrainingService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('militaryTrainingId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Record of Service';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.MilitaryTrainingService.find(+id).subscribe(
        res => {
          this.MilitaryTrainingForm.patchValue({          
            militaryTrainingId: res.militaryTrainingId,
            traineeId: res.traineeId,
            dateAttended: res.dateAttended,
            locationOfTrg: res.locationOfTrg,
            detailsOfCourse: res.detailsOfCourse,
            remarks: res.remarks,
            menuPosition: res.menuPosition,
            isActive: res.isActive
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Record of Service';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.MilitaryTrainingForm = this.fb.group({
      militaryTrainingId: [0],
      traineeId: [this.traineeId, Validators.required],
      dateAttended: [''],
      locationOfTrg: [''],
      detailsOfCourse: [''],
      remarks: [''],
      menuPosition: [''],
      isActive: [true]
    })
  }

 
  
  onSubmit() {
    const id = this.MilitaryTrainingForm.get('militaryTrainingId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.MilitaryTrainingService.update(+id,this.MilitaryTrainingForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/militarytraining-details/'+this.traineeId);
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
      this.loading=true;
      this.MilitaryTrainingService.submit(this.MilitaryTrainingForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/militarytraining-details/'+this.traineeId);
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

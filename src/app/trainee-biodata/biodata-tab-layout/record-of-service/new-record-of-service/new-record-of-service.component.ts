import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordOfServiceService } from '../../service/RecordOfService.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-record-of-service',
  templateUrl: './new-record-of-service.component.html',
  styleUrls: ['./new-record-of-service.component.sass']
})
export class NewRecordOfServiceComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  RecordOfServiceForm: FormGroup; 
  validationErrors: string[] = [];
  districtValues:SelectedModel[]; 
  selectedRecordOfService:SelectedModel[]; 
  traineeId: string;

  constructor(private snackBar: MatSnackBar,private RecordOfServiceService: RecordOfServiceService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('recordOfServiceId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Record of Service';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.RecordOfServiceService.find(+id).subscribe(
        res => {
          this.RecordOfServiceForm.patchValue({          
            recordOfServiceId: res.recordOfServiceId,
            traineeId: res.traineeId,
            dateFrom: res.dateFrom,
            dateTo:res.dateTo,
            shipEstablishment:res.shipEstablishment,
            appointment:res.appointment,
            remarks:res.remarks,
            isActive: true
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
    this.RecordOfServiceForm = this.fb.group({
      recordOfServiceId: [0],
      traineeId: [this.traineeId, Validators.required],
      dateFrom: [''],
      dateTo: [''], 
      shipEstablishment: [''],
      appointment: [''],
      remarks: [''],
      isActive: [true],
    })
  }

 
  
  onSubmit() {
    const id = this.RecordOfServiceForm.get('recordOfServiceId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.RecordOfServiceService.update(+id,this.RecordOfServiceForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/record-of-service-details/'+this.traineeId);
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
      this.RecordOfServiceService.submit(this.RecordOfServiceForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/record-of-service-details/'+this.traineeId);
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

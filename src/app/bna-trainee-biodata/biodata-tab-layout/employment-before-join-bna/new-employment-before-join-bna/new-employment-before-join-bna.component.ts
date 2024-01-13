import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmploymentBeforeJoinBNAService } from '../../service/EmploymentBeforeJoinBNA.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-employment-before-join-bna',
  templateUrl: './new-employment-before-join-bna.component.html',
  styleUrls: ['./new-employment-before-join-bna.component.sass']
})
export class NewEmploymentBeforeJoinBNAComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  traineeId:  string;
  EmploymentBeforeJoinBNAForm: FormGroup;
  validationErrors: string[] = [];
  typeValues:SelectedModel[]; 

  constructor(private snackBar: MatSnackBar,private EmploymentBeforeJoinBNAService: EmploymentBeforeJoinBNAService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('employmentBeforeJoinBnaId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Employment Before Join BNA';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.EmploymentBeforeJoinBNAService.find(+id).subscribe(
        res => { 
          this.EmploymentBeforeJoinBNAForm.patchValue({          

            employmentBeforeJoinBnaId: res.employmentBeforeJoinBnaId,
            traineeId: res.traineeId,
            name:res.name,
            appointment:res.appointment,
            durationFrom:res.durationFrom,
            durationTo: res.durationTo,
            remarks: res.remarks,
            additionalInformation: res.additionalInformation,
                                   
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Employment Before Join BNA';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    
  }
  intitializeForm() {
    this.EmploymentBeforeJoinBNAForm = this.fb.group({
      employmentBeforeJoinBnaId: [0],
      traineeId: [this.traineeId, Validators.required],
      name: ['', Validators.required],
      appointment: ['', Validators.required],
      durationFrom: ['', Validators.required],
      durationTo: ['', Validators.required],
      remarks: [],
      additionalInformation: [],
                
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  

  
  onSubmit() {
    const id = this.EmploymentBeforeJoinBNAForm.get('employmentBeforeJoinBnaId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.EmploymentBeforeJoinBNAService.update(+id,this.EmploymentBeforeJoinBNAForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/employment-before-join-bna-details/'+this.traineeId);
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
      this.EmploymentBeforeJoinBNAService.submit(this.EmploymentBeforeJoinBNAForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/employment-before-join-bna-details/'+this.traineeId);
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

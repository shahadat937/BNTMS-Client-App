import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FailureStatusService } from '../../service/FailureStatus.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-failurestatus',
  templateUrl: './new-failurestatus.component.html',
  styleUrls: ['./new-failurestatus.component.sass']
})
export class NewFailureStatusComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  FailureStatusForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private FailureStatusService: FailureStatusService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('failureStatusId'); 
    if (id) {
      this.pageTitle = 'Edit Failure Status';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.FailureStatusService.find(+id).subscribe(
        res => {
          this.FailureStatusForm.patchValue({          

            failureStatusId: res.failureStatusId,
            failureStatusName: res.failureStatusName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Failure Status';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.FailureStatusForm = this.fb.group({
      failureStatusId: [0],
      failureStatusName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.FailureStatusForm.get('failureStatusId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.FailureStatusService.update(+id,this.FailureStatusForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/failurestatus-list');
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
      this.FailureStatusService.submit(this.FailureStatusForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/failurestatus-list');
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

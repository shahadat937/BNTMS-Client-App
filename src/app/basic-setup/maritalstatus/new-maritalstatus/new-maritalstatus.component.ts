import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaritalStatusService } from '../../service/maritalstatus.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-maritalstatus',
  templateUrl: './new-maritalstatus.component.html',
  styleUrls: ['./new-maritalstatus.component.sass']
})
export class NewMaritalstatusComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  maritalStatusForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private maritalStatusService: MaritalStatusService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('maritalstatusId'); 
    if (id) {
      this.pageTitle = 'Edit MaritalStatus';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.maritalStatusService.find(+id).subscribe(
        res => {
          this.maritalStatusForm.patchValue({          

            maritalStatusId: res.maritalStatusId,
            maritalStatusName: res.maritalStatusName,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create MaritalStatus';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.maritalStatusForm = this.fb.group({
      maritalStatusId: [0],
      maritalStatusName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.maritalStatusForm.get('maritalStatusId').value;   

    if (id) {
        this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
      this.maritalStatusService.update(+id,this.maritalStatusForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/maritalstatus-list');
        this.snackBar.open('Marital Status Information Updated Successfully ', '', {
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
   
    else {
      this.loading=true;
      this.maritalStatusService.submit(this.maritalStatusForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/maritalstatus-list');
        this.snackBar.open('Marital Status Information Saved Successfully ', '', {
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ReasonTypeService } from '../../service/reasonType.service';

@Component({
  selector: 'app-new-reasonType',
  templateUrl: './new-reasonType.component.html',
  styleUrls: ['./new-reasonType.component.sass']
})
export class NewReasonTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  reasonTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private reasonTypeService: ReasonTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('reasonTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Reason Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.reasonTypeService.find(+id).subscribe(
        res => {
          this.reasonTypeForm.patchValue({          

            reasonTypeId: res.reasonTypeId,
            reasonTypeName: res.reasonTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Reason Type';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.reasonTypeForm = this.fb.group({
      reasonTypeId: [0],
      reasonTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.reasonTypeForm.get('reasonTypeId').value; 
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Reason Type Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.reasonTypeService.update(+id,this.reasonTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/reasonType-list');
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
      this.reasonTypeService.submit(this.reasonTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/reasonType-list');
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

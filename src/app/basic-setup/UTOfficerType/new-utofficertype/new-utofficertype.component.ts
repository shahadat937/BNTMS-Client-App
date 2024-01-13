import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UTOfficerTypeService } from '../../service/UTOfficerType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-utofficertype',
  templateUrl: './new-utofficertype.component.html',
  styleUrls: ['./new-utofficertype.component.sass']
})
export class NewUTOfficerTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  UTOfficerTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private UTOfficerTypeService: UTOfficerTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('utofficerTypeId'); 
    if (id) {
      this.pageTitle = 'Edit UT Officer Type';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.UTOfficerTypeService.find(+id).subscribe(
        res => {
          this.UTOfficerTypeForm.patchValue({          

            utofficerTypeId: res.utofficerTypeId,
            utofficerTypeName: res.utofficerTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create UT Officer Type';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.UTOfficerTypeForm = this.fb.group({
      utofficerTypeId: [0],
      utofficerTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.UTOfficerTypeForm.get('utofficerTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.UTOfficerTypeService.update(+id,this.UTOfficerTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/utofficertype-list');
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
  else {
    this.loading=true;
      this.UTOfficerTypeService.submit(this.UTOfficerTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/utofficertype-list');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UTOfficerCategoryService } from '../../service/UTOfficerCategory.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-utofficercategory',
  templateUrl: './new-utofficercategory.component.html',
  styleUrls: ['./new-utofficercategory.component.sass']
})
export class NewUTOfficerCategoryComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  UTOfficerCategoryForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private confirmService: ConfirmService,private snackBar: MatSnackBar,private UTOfficerCategoryService: UTOfficerCategoryService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('utofficerCategoryId'); 
    if (id) {
      this.pageTitle = 'Edit UT Officer Category';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.UTOfficerCategoryService.find(+id).subscribe(
        res => {
          this.UTOfficerCategoryForm.patchValue({          

            utofficerCategoryId: res.utofficerCategoryId,
            utofficerCategoryName: res.utofficerCategoryName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create UT Officer Category';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.UTOfficerCategoryForm = this.fb.group({
      utofficerCategoryId: [0],
      utofficerCategoryName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.UTOfficerCategoryForm.get('utofficerCategoryId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.UTOfficerCategoryService.update(+id,this.UTOfficerCategoryForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/utofficercategory-list');
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
      this.UTOfficerCategoryService.submit(this.UTOfficerCategoryForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/utofficercategory-list');
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

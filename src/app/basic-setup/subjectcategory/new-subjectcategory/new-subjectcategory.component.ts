import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectCategoryService } from '../../service/subjectcategory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({ 
  selector: 'app-new-subjectcategory',
  templateUrl: './new-subjectcategory.component.html',
  styleUrls: ['./new-subjectcategory.component.sass']
})
export class NewSubjectCategoryComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  SubjectCategoryForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private SubjectCategoryService: SubjectCategoryService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('subjectCategoryId'); 
    if (id) {
      this.pageTitle = 'Edit Subject Category';
      this.destination='Edit';
      this.buttonText="Update";
      this.SubjectCategoryService.find(+id).subscribe(
        res => {
          this.SubjectCategoryForm.patchValue({          

            subjectCategoryId: res.subjectCategoryId,
            subjectCategoryName: res.subjectCategoryName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Subject Category';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.SubjectCategoryForm = this.fb.group({
      subjectCategoryId: [0],
      subjectCategoryName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.SubjectCategoryForm.get('subjectCategoryId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Subject Category Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.SubjectCategoryService.update(+id,this.SubjectCategoryForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/subjectcategory-list');
            this.snackBar.open('Subject Category Information Updated Successfully ', '', {
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
      this.SubjectCategoryService.submit(this.SubjectCategoryForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/subjectcategory-list');
        this.snackBar.open('Subject Category Information Save Successfully ', '', {
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

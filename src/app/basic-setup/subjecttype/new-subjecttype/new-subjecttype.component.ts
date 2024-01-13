import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectTypeService } from '../../service/subjecttype.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({ 
  selector: 'app-new-subjecttype',
  templateUrl: './new-subjecttype.component.html',
  styleUrls: ['./new-subjecttype.component.sass']
})
export class NewSubjectTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  SubjectTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private SubjectTypeService: SubjectTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('subjectTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Subject Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.SubjectTypeService.find(+id).subscribe(
        res => {
          this.SubjectTypeForm.patchValue({          

            subjectTypeId: res.subjectTypeId,
            subjectTypeName: res.subjectTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Subject Type';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.SubjectTypeForm = this.fb.group({
      subjectTypeId: [0],
      subjectTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.SubjectTypeForm.get('subjectTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Subject Type Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.SubjectTypeService.update(+id,this.SubjectTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/subjecttype-list');
            this.snackBar.open('Subject Type Information Updated Successfully ', '', {
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
      this.SubjectTypeService.submit(this.SubjectTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/subjecttype-list');
        this.snackBar.open('Subject Type Information Save Successfully ', '', {
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

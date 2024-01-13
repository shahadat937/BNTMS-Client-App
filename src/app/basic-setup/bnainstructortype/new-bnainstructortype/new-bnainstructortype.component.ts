import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAInstructorTypeService } from '../../service/BNAInstructorType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-bnainstructortype',
  templateUrl: './new-bnainstructortype.component.html',
  styleUrls: ['./new-bnainstructortype.component.sass']
})
export class NewBNAInstructorTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BNAInstructorTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BNAInstructorTypeService: BNAInstructorTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaInstructorTypeId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Instructor Type';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.BNAInstructorTypeService.find(+id).subscribe(
        res => {
          this.BNAInstructorTypeForm.patchValue({          

            bnaInstructorTypeId: res.bnaInstructorTypeId,
            instructorTypeName: res.instructorTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Instructor Type';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BNAInstructorTypeForm = this.fb.group({
      bnaInstructorTypeId: [0],
      instructorTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BNAInstructorTypeForm.get('bnaInstructorTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.BNAInstructorTypeService.update(+id,this.BNAInstructorTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnainstructortype-list');
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
      this.BNAInstructorTypeService.submit(this.BNAInstructorTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnainstructortype-list');
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

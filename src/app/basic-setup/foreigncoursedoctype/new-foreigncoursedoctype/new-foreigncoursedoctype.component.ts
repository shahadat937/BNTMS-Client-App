import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ForeignCourseDocTypeService } from '../../service/ForeignCourseDocType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-foreigncoursedoctype',
  templateUrl: './new-foreigncoursedoctype.component.html',
  styleUrls: ['./new-foreigncoursedoctype.component.sass']
})
export class NewForeignCourseDocTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  ForeignCourseDocTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ForeignCourseDocTypeService: ForeignCourseDocTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('foreignCourseDocTypeId'); 
    if (id) {
      this.pageTitle = 'Edit ForeignCourseDocType';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.ForeignCourseDocTypeService.find(+id).subscribe(
        res => {
          this.ForeignCourseDocTypeForm.patchValue({          

            foreignCourseDocTypeId: res.foreignCourseDocTypeId,
            name: res.name,
            remarks: res.remarks,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create ForeignCourseDocType';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ForeignCourseDocTypeForm = this.fb.group({

      foreignCourseDocTypeId: [0],
      name: [''],
      // remarks: [''],
      // menuPosition: [],
      // isActive: [true]
    })
  }
  
  onSubmit() {
    const id = this.ForeignCourseDocTypeForm.get('foreignCourseDocTypeId').value; 
    console.log(this.ForeignCourseDocTypeForm.value); 
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.ForeignCourseDocTypeService.update(+id,this.ForeignCourseDocTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/foreigncoursedoctype-list');
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
    }  else {
      this.loading=true;
      this.ForeignCourseDocTypeService.submit(this.ForeignCourseDocTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/foreigncoursedoctype-list');
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

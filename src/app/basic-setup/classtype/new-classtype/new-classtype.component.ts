import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassTypeService } from '../../service/classtype.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-classtype',
  templateUrl: './new-classtype.component.html',
  styleUrls: ['./new-classtype.component.sass']
})
export class NewClassTypeComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  ClassTypeForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ClassTypeService: ClassTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('classTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Class Type';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.ClassTypeService.find(+id).subscribe(
        res => {
          this.ClassTypeForm.patchValue({          

            classTypeId: res.classTypeId,
            classTypeName: res.classTypeName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Class Type';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ClassTypeForm = this.fb.group({
      classTypeId: [0],
      classTypeName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.ClassTypeForm.get('classTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.ClassTypeService.update(+id,this.ClassTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/classtype-list');
            this.snackBar.open(' Information Updated Successfully ', '', {
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
      this.ClassTypeService.submit(this.ClassTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/classtype-list');
        this.snackBar.open(' Information Save Successfully ', '', {
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

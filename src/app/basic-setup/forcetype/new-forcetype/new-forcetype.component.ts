import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ForceTypeService } from '../../service/ForceType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-forcetype',
  templateUrl: './new-forcetype.component.html',
  styleUrls: ['./new-forcetype.component.sass']
})
export class NewForceTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  ForceTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ForceTypeService: ForceTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('forceTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Force Type';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.ForceTypeService.find(+id).subscribe(
        res => {
          this.ForceTypeForm.patchValue({          

            forceTypeId: res.forceTypeId,
            forceTypeName: res.forceTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Force Type';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ForceTypeForm = this.fb.group({
      forceTypeId: [0],
      forceTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.ForceTypeForm.get('forceTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.ForceTypeService.update(+id,this.ForceTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/forcetype-list');
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
      this.ForceTypeService.submit(this.ForceTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/forcetype-list');
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

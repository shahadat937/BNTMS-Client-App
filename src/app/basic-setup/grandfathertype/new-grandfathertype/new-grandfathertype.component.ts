import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GrandFatherTypeService } from '../../service/GrandFatherType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-grandfathertype',
  templateUrl: './new-grandfathertype.component.html',
  styleUrls: ['./new-grandfathertype.component.sass']
})
export class NewGrandFatherTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  GrandFatherTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private GrandFatherTypeService: GrandFatherTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('grandfatherTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Grand Father Type';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.GrandFatherTypeService.find(+id).subscribe(
        res => {
          this.GrandFatherTypeForm.patchValue({          

            grandfatherTypeId: res.grandfatherTypeId,
            grandfatherTypeName: res.grandfatherTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Grand Father Type';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.GrandFatherTypeForm = this.fb.group({
      grandfatherTypeId: [0],
      grandfatherTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.GrandFatherTypeForm.get('grandfatherTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.GrandFatherTypeService.update(+id,this.GrandFatherTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/grandfathertype-list');
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
      this.GrandFatherTypeService.submit(this.GrandFatherTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/grandfathertype-list');
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

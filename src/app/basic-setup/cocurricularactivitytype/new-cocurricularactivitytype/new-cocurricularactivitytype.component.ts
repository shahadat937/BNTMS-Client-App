import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CoCurricularActivityTypeService } from '../../service/CoCurricularActivityType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-cocurricularactivitytype',
  templateUrl: './new-cocurricularactivitytype.component.html',
  styleUrls: ['./new-cocurricularactivitytype.component.sass']
})
export class NewCoCurricularActivityTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  CoCurricularActivityTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CoCurricularActivityTypeService: CoCurricularActivityTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('coCurricularActivityTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Co Curricular Activity Type';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.CoCurricularActivityTypeService.find(+id).subscribe(
        res => {
          this.CoCurricularActivityTypeForm.patchValue({          

            coCurricularActivityTypeId: res.coCurricularActivityTypeId,
            coCurricularActivityName: res.coCurricularActivityName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Co Curricular Activity Type';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.CoCurricularActivityTypeForm = this.fb.group({
      coCurricularActivityTypeId: [0],
      coCurricularActivityName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.CoCurricularActivityTypeForm.get('coCurricularActivityTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.CoCurricularActivityTypeService.update(+id,this.CoCurricularActivityTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/cocurricularactivitytype-list');
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
      this.CoCurricularActivityTypeService.submit(this.CoCurricularActivityTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/cocurricularactivitytype-list');
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

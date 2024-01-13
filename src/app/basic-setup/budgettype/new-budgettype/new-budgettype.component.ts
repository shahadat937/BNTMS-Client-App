import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetTypeService } from '../../service/BudgetType.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-budgettype',
  templateUrl: './new-budgettype.component.html',
  styleUrls: ['./new-budgettype.component.sass']
})
export class NewBudgetTypeComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  BudgetTypeForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BudgetTypeService: BudgetTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('budgetTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Budget Type';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.BudgetTypeService.find(+id).subscribe(
        res => {
          this.BudgetTypeForm.patchValue({          

            budgetTypeId: res.budgetTypeId,
            budgetTypeName: res.budgetTypeName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Budget Type';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BudgetTypeForm = this.fb.group({
      budgetTypeId: [0],
      budgetTypeName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BudgetTypeForm.get('budgetTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BudgetTypeService.update(+id,this.BudgetTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/budgettype-list');
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
      this.BudgetTypeService.submit(this.BudgetTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/budgettype-list');
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

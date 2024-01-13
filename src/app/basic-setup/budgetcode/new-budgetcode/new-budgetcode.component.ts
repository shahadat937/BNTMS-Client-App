import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetCodeService } from '../../service/BudgetCode.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-budgetcode',
  templateUrl: './new-budgetcode.component.html',
  styleUrls: ['./new-budgetcode.component.sass']
})
export class NewBudgetCodeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BudgetCodeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BudgetCodeService: BudgetCodeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('budgetCodeId'); 
    if (id) {
      this.pageTitle = 'Edit BudgetCode';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.BudgetCodeService.find(+id).subscribe(
        res => {
          this.BudgetCodeForm.patchValue({          

            budgetCodeId: res.budgetCodeId,
            budgetCodes: res.budgetCodes,
            name: res.name,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BudgetCode';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BudgetCodeForm = this.fb.group({
      budgetCodeId: [0],
      budgetCodes: ['', Validators.required],
      name: [''],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BudgetCodeForm.get('budgetCodeId').value;  
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.BudgetCodeService.update(+id,this.BudgetCodeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/budgetcode-list');
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
      this.BudgetCodeService.submit(this.BudgetCodeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/budgetcode-list');
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

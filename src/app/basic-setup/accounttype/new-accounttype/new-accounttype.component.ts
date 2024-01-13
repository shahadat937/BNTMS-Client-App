import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTypeService } from '../../service/AccountType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-AccountType',
  templateUrl: './new-AccountType.component.html',
  styleUrls: ['./new-AccountType.component.sass']
})
export class NewAccountTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  AccountTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private AccountTypeService: AccountTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('accountTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Account Type';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.AccountTypeService.find(+id).subscribe(
        res => {
          this.AccountTypeForm.patchValue({          

            accountTypeId: res.accountTypeId,
            accoutType: res.accoutType,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Account Type';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.AccountTypeForm = this.fb.group({
      accountTypeId: [0],
      accoutType: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.AccountTypeForm.get('accountTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading = true;
          this.AccountTypeService.update(+id,this.AccountTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/accounttype-list');
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
      this.loading = true;
      this.AccountTypeService.submit(this.AccountTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/accounttype-list');
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

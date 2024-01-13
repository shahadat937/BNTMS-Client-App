import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentTypeService } from '../../service/PaymentType.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-paymenttype',
  templateUrl: './new-paymenttype.component.html',
  styleUrls: ['./new-paymenttype.component.sass']
})
export class NewPaymentTypeComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  PaymentTypeForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private PaymentTypeService: PaymentTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('paymentTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Payment Type';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.PaymentTypeService.find(+id).subscribe(
        res => {
          this.PaymentTypeForm.patchValue({          

            paymentTypeId: res.paymentTypeId,
            paymentTypeName: res.paymentTypeName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Payment Type';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.PaymentTypeForm = this.fb.group({
      paymentTypeId: [0],
      paymentTypeName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.PaymentTypeForm.get('paymentTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.PaymentTypeService.update(+id,this.PaymentTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/paymenttype-list');
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
      this.PaymentTypeService.submit(this.PaymentTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/paymenttype-list');
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

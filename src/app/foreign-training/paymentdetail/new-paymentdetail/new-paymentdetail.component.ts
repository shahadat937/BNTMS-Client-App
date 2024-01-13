import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDetailService } from '../../service/paymentdetail.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-paymentdetail',
  templateUrl: './new-paymentdetail.component.html',
  styleUrls: ['./new-paymentdetail.component.sass']
}) 
export class NewPaymentDetailComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  PaymentDetailForm: FormGroup;
  validationErrors: string[] = [];
   selectedbaseschools:SelectedModel[];
   selectedcoursename:SelectedModel[];
    selectedcoursedurationbyschoolname:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private PaymentDetailService: PaymentDetailService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('paymentDetailId'); 
    if (id) {
      this.pageTitle = 'Edit Payment Detail'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.PaymentDetailService.find(+id).subscribe(
        res => {
          this.PaymentDetailForm.patchValue({          
            paymentDetailId:res.paymentDetailId, 
            traineeId: res.traineeId, 
            numberOfInstallment:res.numberOfInstallment, 
            usdRate:res.usdRate, 
            totalUsd:res.totalUsd, 
            totalBdt:res.totalBdt,
            remarks:res.remarks,
            status:res.status,
            menuPosition: res.menuPosition,
            isActive: res.isActive,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Payment Detail';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
  }
  intitializeForm() {
    this.PaymentDetailForm = this.fb.group({
      paymentDetailId: [0],
      traineeId:[],
      numberOfInstallment:[''],
      usdRate:[''],
      totalUsd:[''],
      totalBdt:[''],
      remarks:[''],
      status:[],
      isActive: [true],    
    })
  }
  
  

 

  onSubmit() {
    const id = this.PaymentDetailForm.get('paymentDetailId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.PaymentDetailService.update(+id,this.PaymentDetailForm.value).subscribe(response => {
            this.router.navigateByUrl('/foreign-training/paymentdetail-list');
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
    }else {
      this.loading=true;
      this.PaymentDetailService.submit(this.PaymentDetailForm.value).subscribe(response => {
        this.router.navigateByUrl('/foreign-training/paymentdetail-list');
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

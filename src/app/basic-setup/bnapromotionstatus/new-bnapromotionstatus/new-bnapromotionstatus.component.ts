import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAPromotionStatusService } from '../../service/BNAPromotionStatus.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-bnapromotionstatus',
  templateUrl: './new-bnapromotionstatus.component.html',
  styleUrls: ['./new-bnapromotionstatus.component.sass']
})
export class NewBNAPromotionStatusComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BNAPromotionStatusForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BNAPromotionStatusService: BNAPromotionStatusService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaPromotionStatusId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Promotion Status';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.BNAPromotionStatusService.find(+id).subscribe(
        res => {
          this.BNAPromotionStatusForm.patchValue({          

            bnaPromotionStatusId: res.bnaPromotionStatusId,
            promotionStatusName: res.promotionStatusName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Promotion Status';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BNAPromotionStatusForm = this.fb.group({
      bnaPromotionStatusId: [0],
      promotionStatusName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BNAPromotionStatusForm.get('bnaPromotionStatusId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.BNAPromotionStatusService.update(+id,this.BNAPromotionStatusForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnapromotionstatus-list');
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
      this.BNAPromotionStatusService.submit(this.BNAPromotionStatusForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnapromotionstatus-list');
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

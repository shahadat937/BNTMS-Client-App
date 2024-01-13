import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAServiceTypeService } from '../../service/BNAServiceType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-bnaservicetype',
  templateUrl: './new-bnaservicetype.component.html',
  styleUrls: ['./new-bnaservicetype.component.sass']
})
export class NewBNAServiceTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BNAServiceTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BNAServiceTypeService: BNAServiceTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('BNAServiceTypeId'); 
    if (id) {
      this.pageTitle = 'Edit BNAServiceType';
      this.destination = "Edit";
      this.btnText='Update';
      this.BNAServiceTypeService.find(+id).subscribe(
        res => {
          this.BNAServiceTypeForm.patchValue({          

            bnaServiceTypeId: res.bnaServiceTypeId,
            serviceName: res.serviceName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNAServiceType';
      this.destination = "Add";
      this.btnText='Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BNAServiceTypeForm = this.fb.group({
      bnaServiceTypeId: [0],
      serviceName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BNAServiceTypeForm.get('bnaServiceTypeId').value;  
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAServiceTypeService.update(+id,this.BNAServiceTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnaservicetype-list');
            this.snackBar.open('BNA ServiceType Information Updated Successfully ', '', {
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
      this.BNAServiceTypeService.submit(this.BNAServiceTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnaservicetype-list');
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

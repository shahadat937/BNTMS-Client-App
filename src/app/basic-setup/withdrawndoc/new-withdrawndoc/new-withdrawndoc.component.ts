import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WithdrawnDocService } from '../../service/withdrawndoc.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-withdrawndoc',
  templateUrl: './new-withdrawndoc.component.html',
  styleUrls: ['./new-withdrawndoc.component.sass']
})
export class NewWithdrawnDocComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  WithdrawnDocForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private WithdrawnDocService: WithdrawnDocService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('withdrawnDocId'); 
    if (id) {
      this.pageTitle = 'Edit Withdrawn Doc';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.WithdrawnDocService.find(+id).subscribe(
        res => {
          this.WithdrawnDocForm.patchValue({          

            withdrawnDocId: res.withdrawnDocId,
            withdrawnDocName: res.withdrawnDocName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Withdrawn Doc';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.WithdrawnDocForm = this.fb.group({
      withdrawnDocId: [0],
      withdrawnDocName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.WithdrawnDocForm.get('withdrawnDocId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.WithdrawnDocService.update(+id,this.WithdrawnDocForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/withdrawndoc-list');
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
      this.WithdrawnDocService.submit(this.WithdrawnDocForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/withdrawndoc-list');
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

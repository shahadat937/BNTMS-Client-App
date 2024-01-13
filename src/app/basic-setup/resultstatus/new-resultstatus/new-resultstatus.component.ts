import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultStatusService } from '../../service/resultstatus.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-resultstatus',
  templateUrl: './new-resultstatus.component.html',
  styleUrls: ['./new-resultstatus.component.sass']
})
export class NewResultStatusComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  ResultStatusForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ResultStatusService: ResultStatusService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('resultStatusId'); 
    if (id) {
      this.pageTitle = 'Edit Result Status';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.ResultStatusService.find(+id).subscribe(
        res => {
          this.ResultStatusForm.patchValue({          

            resultStatusId: res.resultStatusId,
            resultStatusName: res.resultStatusName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Result Status';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ResultStatusForm = this.fb.group({
      resultStatusId: [0],
      resultStatusName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.ResultStatusForm.get('resultStatusId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.ResultStatusService.update(+id,this.ResultStatusForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/resultstatus-list');
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
      this.ResultStatusService.submit(this.ResultStatusForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/resultstatus-list');
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

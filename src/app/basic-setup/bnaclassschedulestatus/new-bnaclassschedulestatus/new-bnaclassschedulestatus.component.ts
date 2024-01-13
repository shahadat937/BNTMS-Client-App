import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNAClassScheduleStatusService } from '../../service/bnaclassschedulestatus.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-bnaclassschedulestatus',
  templateUrl: './new-bnaclassschedulestatus.component.html',
  styleUrls: ['./new-bnaclassschedulestatus.component.sass']
})
export class NewBNAClassScheduleStatusComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  BNAClassScheduleStatusForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BNAClassScheduleStatusService: BNAClassScheduleStatusService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaClassScheduleStatusId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Class Schedule Status';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.BNAClassScheduleStatusService.find(+id).subscribe(
        res => {
          this.BNAClassScheduleStatusForm.patchValue({          

            bnaClassScheduleStatusId: res.bnaClassScheduleStatusId,
            name: res.name,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Class Schedule Status';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BNAClassScheduleStatusForm = this.fb.group({
      bnaClassScheduleStatusId: [0],
      name: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BNAClassScheduleStatusForm.get('bnaClassScheduleStatusId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNAClassScheduleStatusService.update(+id,this.BNAClassScheduleStatusForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnaclassschedulestatus-list');
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
      this.BNAClassScheduleStatusService.submit(this.BNAClassScheduleStatusForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnaclassschedulestatus-list');
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

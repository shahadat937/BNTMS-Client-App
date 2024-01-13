import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BnaAttendancePeriodService } from '../../service/BnaAttendancePeriod.service';

@Component({
  selector: 'app-new-BnaAttendancePeriod',
  templateUrl: './new-BnaAttendancePeriod.component.html',
  styleUrls: ['./new-BnaAttendancePeriod.component.sass']
})
export class NewBnaAttendancePeriodComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BnaAttendancePeriodForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private BnaAttendancePeriodService: BnaAttendancePeriodService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaAttendancePeriodId'); 
    if (id) {
      this.pageTitle = 'New BNA Attendance Period';
      this.destination = "New";
      this.btnText='Update';
      this.BnaAttendancePeriodService.find(+id).subscribe(
        res => {
          this.BnaAttendancePeriodForm.patchValue({          

            bnaAttendancePeriodId: res.bnaAttendancePeriodId,
            periodName: res.periodName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Attendance Period';
      this.destination = "Add";
      this.btnText='Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BnaAttendancePeriodForm = this.fb.group({
      bnaAttendancePeriodId: [0],
      periodName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BnaAttendancePeriodForm.get('bnaAttendancePeriodId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.BnaAttendancePeriodService.update(+id,this.BnaAttendancePeriodForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnaattendanceperiod-list');
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
      this.BnaAttendancePeriodService.submit(this.BnaAttendancePeriodForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnaattendanceperiod-list');
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

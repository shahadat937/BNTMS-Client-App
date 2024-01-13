import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraineeCourseStatusService } from '../../service/traineecoursestatus.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-traineecoursestatus',
  templateUrl: './new-traineecoursestatus.component.html',
  styleUrls: ['./new-traineecoursestatus.component.sass']
})
export class NewTraineeCourseStatusComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  TraineeCourseStatusForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private TraineeCourseStatusService: TraineeCourseStatusService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('traineeCourseStatusId'); 
    if (id) {
      this.pageTitle = 'Edit Trainee Course Status';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.TraineeCourseStatusService.find(+id).subscribe(
        res => {
          this.TraineeCourseStatusForm.patchValue({          

            traineeCourseStatusId: res.traineeCourseStatusId,
            traineeCourseStatusName: res.traineeCourseStatusName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Trainee Course Status';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.TraineeCourseStatusForm = this.fb.group({
      traineeCourseStatusId: [0],
      traineeCourseStatusName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.TraineeCourseStatusForm.get('traineeCourseStatusId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.TraineeCourseStatusService.update(+id,this.TraineeCourseStatusForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/traineecoursestatus-list');
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
    }
   else {
    this.loading=true;
      this.TraineeCourseStatusService.submit(this.TraineeCourseStatusForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/traineecoursestatus-list');
        this.snackBar.open('Information Save Successfully ', '', {
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ExamCenterService} from '../../service/examcenter.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-examcenter',
  templateUrl: './new-examcenter.component.html',
  styleUrls: ['./new-examcenter.component.sass']
})
export class NewExamCenterComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  ExamCenterForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ExamCenterService: ExamCenterService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('examCenterId'); 
    if (id) {
      this.pageTitle = 'Edit Exam Center';
      this.destination='Edit';
      this.buttonText="Update";
      this.ExamCenterService.find(+id).subscribe(
        res => {
          this.ExamCenterForm.patchValue({          

            examCenterId: res.examCenterId,
            examCenterName: res.examCenterName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Exam Center';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ExamCenterForm = this.fb.group({
      examCenterId: [0],
      examCenterName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
     
    })
  }
  
  onSubmit() {
    const id = this.ExamCenterForm.get('examCenterId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.ExamCenterService.update(+id,this.ExamCenterForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/examcenter-list');
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
      this.ExamCenterService.submit(this.ExamCenterForm.value).subscribe(response => {
        this.snackBar.open('Information Saved Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
        this.router.navigateByUrl('/basic-setup/examcenter-list');
      }, error => {
        this.validationErrors = error;
      })
    }
 
  }

}

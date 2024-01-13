import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {ExamAttemptTypeService} from '../../service/examattempttype.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-examattempttype',
  templateUrl: './new-examattempttype.component.html',
  styleUrls: ['./new-examattempttype.component.sass']
})
export class NewExamAttemptTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  ExamAttemptTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ExamAttemptTypeService: ExamAttemptTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('examAttemptTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Exam Attempt Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.ExamAttemptTypeService.find(+id).subscribe(
        res => {
          this.ExamAttemptTypeForm.patchValue({          

            examAttemptTypeId: res.examAttemptTypeId,
            examAttemptTypeName: res.examAttemptTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Exam Attempt Type';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ExamAttemptTypeForm = this.fb.group({
      examAttemptTypeId: [0],
      examAttemptTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
     
    })
  }
  
  onSubmit() {
    const id = this.ExamAttemptTypeForm.get('examAttemptTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.ExamAttemptTypeService.update(+id,this.ExamAttemptTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/examattempttype-list');
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
      this.ExamAttemptTypeService.submit(this.ExamAttemptTypeForm.value).subscribe(response => {
        this.snackBar.open('Information Saved Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
        this.router.navigateByUrl('/basic-setup/examattempttype-list');
      }, error => {
        this.validationErrors = error;
      })
    }
 
  }

}

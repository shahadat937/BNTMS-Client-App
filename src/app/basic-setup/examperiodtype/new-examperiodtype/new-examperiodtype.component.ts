import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamPeriodTypeService } from '../../service/examperiodtype.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-examperiodtype',
  templateUrl: './new-examperiodtype.component.html',
  styleUrls: ['./new-examperiodtype.component.sass']
})
export class NewExamPeriodTypeComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  ExamPeriodTypeForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ExamPeriodTypeService: ExamPeriodTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('examPeriodTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Exam Period Type';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.ExamPeriodTypeService.find(+id).subscribe(
        res => {
          this.ExamPeriodTypeForm.patchValue({          

            examPeriodTypeId: res.examPeriodTypeId,
            examPeriodName: res.examPeriodName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Exam Period Type';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ExamPeriodTypeForm = this.fb.group({
      examPeriodTypeId: [0],
      examPeriodName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.ExamPeriodTypeForm.get('examPeriodTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.ExamPeriodTypeService.update(+id,this.ExamPeriodTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/examperiodtype-list');
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
      this.ExamPeriodTypeService.submit(this.ExamPeriodTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/examperiodtype-list');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ExamMarkRemarksService } from '../../service/exammarkremarks.service';

@Component({
  selector: 'app-new-exammarkremarks',
  templateUrl: './new-exammarkremarks.component.html',
  styleUrls: ['./new-exammarkremarks.component.sass']
})
export class NewExamMarkRemarksComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  ExamMarkRemarksForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private ExamMarkRemarksService: ExamMarkRemarksService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('examMarkRemarksId'); 
    if (id) {
      this.pageTitle = 'Edit  Exam Mark Remark';
      this.destination='Edit';
      this.buttonText="Update";
      this.ExamMarkRemarksService.find(+id).subscribe(
        res => {
          this.ExamMarkRemarksForm.patchValue({          

            examMarkRemarksId: res.examMarkRemarksId,
            markRemark: res.markRemark,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Exam Mark Remark';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ExamMarkRemarksForm = this.fb.group({
      examMarkRemarksId: [0],
      markRemark: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.ExamMarkRemarksForm.get('examMarkRemarksId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
            this.ExamMarkRemarksService.update(+id,this.ExamMarkRemarksForm.value).subscribe(response => {
              this.router.navigateByUrl('/basic-setup/exammarkremarks-list');
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
        this.ExamMarkRemarksService.submit(this.ExamMarkRemarksForm.value).subscribe(response => {
          this.router.navigateByUrl('/basic-setup/exammarkremarks-list');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ExamTypeService } from '../../service/examType.service';

@Component({
  selector: 'app-new-examType',
  templateUrl: './new-examType.component.html',
  styleUrls: ['./new-examType.component.sass']
})
export class NewExamTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  examTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private examTypeService: ExamTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('examTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Exam Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.examTypeService.find(+id).subscribe(
        res => {
          this.examTypeForm.patchValue({          

            examTypeId: res.examTypeId,
            examTypeName: res.examTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Exam Type';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.examTypeForm = this.fb.group({
      examTypeId: [0],
      examTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.examTypeForm.get('examTypeId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Exam Type Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.examTypeService.update(+id,this.examTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/examType-list');
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
      this.examTypeService.submit(this.examTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/examType-list');
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

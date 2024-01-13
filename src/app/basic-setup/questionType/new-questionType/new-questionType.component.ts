import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { QuestionTypeService } from '../../service/questionType.service';

@Component({
  selector: 'app-new-questionType',
  templateUrl: './new-questionType.component.html',
  styleUrls: ['./new-questionType.component.sass']
})
export class NewQuestionTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  questionTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private questionTypeService: QuestionTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('questionTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Question Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.questionTypeService.find(+id).subscribe(
        res => {
          this.questionTypeForm.patchValue({          

            questionTypeId: res.questionTypeId,
            question: res.question,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Question Type';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.questionTypeForm = this.fb.group({
      questionTypeId: [0],
      question: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.questionTypeForm.get('questionTypeId').value; 
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Question Type Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.questionTypeService.update(+id,this.questionTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/questionType-list');
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
      this.questionTypeService.submit(this.questionTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/questionType-list');
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

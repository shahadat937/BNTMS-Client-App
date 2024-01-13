import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectClassificationService } from '../../service/SubjectClassification.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-subjectclassification',
  templateUrl: './new-subjectclassification.component.html',
  styleUrls: ['./new-subjectclassification.component.sass']
})
export class NewSubjectClassificationComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  SubjectClassificationForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private SubjectClassificationService: SubjectClassificationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('subjectClassificationId'); 
    if (id) {
      this.pageTitle = 'Edit Subject Classification';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.SubjectClassificationService.find(+id).subscribe(
        res => {
          this.SubjectClassificationForm.patchValue({          

            subjectClassificationId: res.subjectClassificationId,
            subjectClassificationName: res.subjectClassificationName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Subject Classification';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.SubjectClassificationForm = this.fb.group({
      subjectClassificationId: [0],
      subjectClassificationName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.SubjectClassificationForm.get('subjectClassificationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.SubjectClassificationService.update(+id,this.SubjectClassificationForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/subjectclassification-list');
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
      this.SubjectClassificationService.submit(this.SubjectClassificationForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/subjectclassification-list');
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

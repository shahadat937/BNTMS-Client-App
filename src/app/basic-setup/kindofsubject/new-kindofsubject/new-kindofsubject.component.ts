import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KindOfSubjectService } from '../../service/KindOfSubject.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-kindofsubject',
  templateUrl: './new-kindofsubject.component.html',
  styleUrls: ['./new-kindofsubject.component.sass']
})
export class NewKindOfSubjectComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  KindOfSubjectForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private KindOfSubjectService: KindOfSubjectService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('kindOfSubjectId'); 
    if (id) {
      this.pageTitle = 'Edit Kind Of Subject';
      this.destination='Edit';
      this.buttonText="Update";
      this.KindOfSubjectService.find(+id).subscribe(
        res => {
          this.KindOfSubjectForm.patchValue({          

            kindOfSubjectId: res.kindOfSubjectId,
            kindOfSubjectName: res.kindOfSubjectName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Kind Of Subject';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.KindOfSubjectForm = this.fb.group({
      kindOfSubjectId: [0],
      kindOfSubjectName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.KindOfSubjectForm.get('kindOfSubjectId').value; 

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Kind Of Subject Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.KindOfSubjectService.update(+id,this.KindOfSubjectForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/kindofsubject-list');
            this.snackBar.open('Kind Of Subject Information Updated Successfully ', '', {
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
      this.KindOfSubjectService.submit(this.KindOfSubjectForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/kindofsubject-list');
        this.snackBar.open('Kind Of Subject Information Save Successfully ', '', {
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { BnaSubjectNameService } from '../../service/bnasubjectname.service';

@Component({
  selector: 'app-new-bnasubjectname',
  templateUrl: './new-bnasubjectname.component.html',
  styleUrls: ['./new-bnasubjectname.component.sass']
})
export class NewBnaSubjectNameComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  BnaSubjectNameForm: FormGroup;
  validationErrors: string[] = [];
  selectedCourseName:SelectedModel[];
  status=3;

  constructor(private snackBar: MatSnackBar,private BnaSubjectNameService: BnaSubjectNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    if (id) {
      this.pageTitle = 'Edit Subject Name';
      this.destination='Edit';
      this.buttonText="Update";
      this.BnaSubjectNameService.find(+id).subscribe(
        res => {
          this.BnaSubjectNameForm.patchValue({          

            bnaSubjectNameId: res.bnaSubjectNameId,
            courseNameId: res.courseNameId,
            subjectName:res.subjectName,
            totalMark: res.totalMark,
            passMarkBna:res.passMarkBna,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Subject Name';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getSelectedCourseName();
  }
  intitializeForm() {
    this.BnaSubjectNameForm = this.fb.group({
      bnaSubjectNameId: [0],
      courseNameId: [],
      subjectName:[''],
      totalMark: [''],
      passMarkBna:[''],
      status:[this.status],
      isActive: [true],
    
    })
  }
  getSelectedCourseName(){
    this.BnaSubjectNameService.getSelectedCourseName().subscribe(res=>{
      this.selectedCourseName=res
    });
  }
  
  onSubmit() {
    const id = this.BnaSubjectNameForm.get('bnaSubjectNameId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
            this.BnaSubjectNameService.update(+id,this.BnaSubjectNameForm.value).subscribe(response => {
              this.router.navigateByUrl('/inter-service/bnasubjectname-list');
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
        this.BnaSubjectNameService.submit(this.BnaSubjectNameForm.value).subscribe(response => {
          this.router.navigateByUrl('/inter-service/bnasubjectname-list');
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

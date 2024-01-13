import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BNASubjectCurriculamService } from '../../service/BNASubjectCurriculam.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-bnasubjectcurriculam',
  templateUrl: './new-bnasubjectcurriculam.component.html',
  styleUrls: ['./new-bnasubjectcurriculam.component.sass']
})
export class NewBnasubjectcurriculamComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  BNASubjectCurriculamForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BNASubjectCurriculamService: BNASubjectCurriculamService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaSubjectCurriculumId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Subject Curriculam';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.BNASubjectCurriculamService.find(+id).subscribe(
        res => {
          this.BNASubjectCurriculamForm.patchValue({          

            bnaSubjectCurriculumId: res.bnaSubjectCurriculumId,
            subjectCurriculumName: res.subjectCurriculumName,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Subject Curriculam';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BNASubjectCurriculamForm = this.fb.group({
      bnaSubjectCurriculumId: [0],
      subjectCurriculumName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BNASubjectCurriculamForm.get('bnaSubjectCurriculumId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BNASubjectCurriculamService.update(+id,this.BNASubjectCurriculamForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnasubjectcurriculam-list'); 
            this.snackBar.open('BNA Subject Curriculum Information Updated Successfully ', '', {
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
      this.BNASubjectCurriculamService.submit(this.BNASubjectCurriculamForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnasubjectcurriculam-list');

        this.snackBar.open('BNA Subject Curriculum Saved Successfully ', '', {
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

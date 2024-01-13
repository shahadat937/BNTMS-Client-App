import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../service/language.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-language',
  templateUrl: './new-language.component.html',
  styleUrls: ['./new-language.component.sass']
})
export class NewLanguageComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  LanguageForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private LanguageService: LanguageService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('languageId'); 
    if (id) {
      this.pageTitle = 'Edit Language';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.LanguageService.find(+id).subscribe(
        res => {
          this.LanguageForm.patchValue({          

            languageId: res.languageId,
            languageName: res.languageName,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Language';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.LanguageForm = this.fb.group({
      languageId: [0],
      languageName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.LanguageForm.get('languageId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Language Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.LanguageService.update(+id,this.LanguageForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/language-list');
            this.snackBar.open('Language Information Updated Successfully ', '', {
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
      this.LanguageService.submit(this.LanguageForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/language-list');
        this.snackBar.open('Language Information Save Successfully ', '', {
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

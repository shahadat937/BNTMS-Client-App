import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialmediaTypeService } from '../../service/socialmediatype.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-socialmediatype',
  templateUrl: './new-socialmediatype.component.html',
  styleUrls: ['./new-socialmediatype.component.sass']
})
export class NewSocialmediatypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  socialMediaTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private socialMediaTypeService: SocialmediaTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('socialMediaTypeId'); 
    if (id) {
      this.pageTitle = 'Edit SocialMediaType';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.socialMediaTypeService.find(+id).subscribe(
        res => {
          this.socialMediaTypeForm.patchValue({           

            socialMediaTypeId: res.socialMediaTypeId,
            socialMediaTypeName: res.socialMediaTypeName,
         //   menuPosition: res.menuPosition,
          });           
        }
      );
    } else {
      this.pageTitle = 'Create SocialMediaType';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.socialMediaTypeForm = this.fb.group({
      socialMediaTypeId: [0],
      socialMediaTypeName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.socialMediaTypeForm.get('socialMediaTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This SocialMedia Type Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.socialMediaTypeService.update(+id,this.socialMediaTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/socialmediatype-list');
            this.snackBar.open('SocialMedia Type Information Updated Successfully ', '', {
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
      this.socialMediaTypeService.submit(this.socialMediaTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/socialmediatype-list');
        this.snackBar.open('SocialMedia Type Information Saved Successfully ', '', {
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialMediaService } from '../../service/SocialMedia.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-social-media',
  templateUrl: './new-social-media.component.html',
  styleUrls: ['./new-social-media.component.sass']
})
export class NewSocialMediaComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  SocialMediaForm: FormGroup; 
  validationErrors: string[] = [];
  districtValues:SelectedModel[]; 
  selectedSocialMedia:SelectedModel[]; 
  traineeId: string;

  constructor(private snackBar: MatSnackBar,private SocialMediaService: SocialMediaService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('socialMediaId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Educational Qualification';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.SocialMediaService.find(+id).subscribe(
        res => {
          this.SocialMediaForm.patchValue({          
            socialMediaId: res.socialMediaId,
            traineeId: res.traineeId,
            socialMediaTypeId: res.socialMediaTypeId,
            socialMediaAccountName:res.socialMediaAccountName,
            additionalInformation:res.additionalInformation,
            isActive: true
          });          
        }
      );
    } else {
      this.pageTitle = 'Create SocialMedia';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getSelectedSocialMediaType();
  }
  intitializeForm() {
    this.SocialMediaForm = this.fb.group({
      socialMediaId: [0],
      traineeId: [this.traineeId, Validators.required],
      socialMediaTypeId: ['', Validators.required],
      socialMediaAccountName: ['', Validators.required], 
      additionalInformation: [''],
      isActive: [true],
    })
  }

  getSelectedSocialMediaType(){
    this.SocialMediaService.getSelectedSocialMediaType().subscribe(res=>{
      this.selectedSocialMedia=res
    });
  }
  
  onSubmit() {
    const id = this.SocialMediaForm.get('socialMediaId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.SocialMediaService.update(+id,this.SocialMediaForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/social-media-details/'+this.traineeId);
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
      this.SocialMediaService.submit(this.SocialMediaForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/social-media-details/'+this.traineeId);
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

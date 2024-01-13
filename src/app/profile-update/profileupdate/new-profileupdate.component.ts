import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators,ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { BIODataGeneralInfoService } from 'src/app/trainee-biodata/biodata-tab-layout/service/BIODataGeneralInfo.service';
// import { ConfirmService } from 'src/app/core/service/confirm.service';
// import { SelectedModel } from 'src/app/core/models/selectedModel';
import { ProfileUpdateService } from '../service/ProfileUpdate.service';
import {ConfirmService} from '../../../app/core/service/confirm.service'
import { ViewChild, ElementRef } from '@angular/core';
import {AuthService} from '../../../app/core/service/auth.service';
// import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-new-profileupdate',
  templateUrl: './new-profileupdate.component.html',
  styleUrls: ['./new-profileupdate.component.sass']
})
export class NewProfileUpdateComponent implements OnInit {

  submitted = false;
  loading = false;
  error = '';
  hide1 = true;
  hide2= true;
  hide3 = true;
  userId:any;
  buttonText:string;
  pageTitle: string; 
  destination:string;
  ProfileUpdateForm: FormGroup;
  validationErrors: string[] = [];
  role:any;
  traineeId:any;

  constructor(private snackBar: MatSnackBar, private authService: AuthService,private ProfileUpdateService: ProfileUpdateService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { 
    // this.files = [];
  }

  @ViewChild('labelImport')  labelImport: ElementRef;
  ngOnInit(): void {

    this.role = this.authService.currentUserValue.role.trim();
    this.userId=this.authService.currentUserValue.id;
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    console.log(this.role, this.traineeId)
    var id = String(this.userId);
    //String(num);
    console.log("Idddd");
    console.log(id)
    if (id) {
      this.pageTitle = 'Profile Update';
      this.destination='Edit';
      this.buttonText="Update";
      this.ProfileUpdateService.find(String(this.userId)).subscribe(
        res => {
          this.ProfileUpdateForm.patchValue({          
            userId:res.userId,
            email: res.email,
            phoneNumber: res.phoneNumber,
          });          
        }
      );
    } else {
      this.pageTitle = 'Profile Update';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }

  intitializeForm() {
    let now = new Date();
    this.ProfileUpdateForm = this.fb.group({
      userId:[''],     
      email:[''],
      phoneNumber:[''],
    })
  }

matchValues(matchTo: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control?.value === control?.parent?.controls[matchTo].value 
      ? null : {isMatching: true}
  }
}

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
  //  const id = this.userId;
  //  console.log(id);

    this.ProfileUpdateForm.get('userId').setValue(this.userId)
    console.log(this.ProfileUpdateForm.value)
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update  Item').subscribe(result => {
        
        if (result) {
          this.loading = true;
          this.ProfileUpdateService.updateUserProfile(this.userId,this.ProfileUpdateForm.value).subscribe(response => {
            this.router.navigateByUrl('/instructor/profile-update');
            this.reloadCurrentRoute();
            this.snackBar.open('Information Updated Successfully ', '', {
              duration: 3000,
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
}


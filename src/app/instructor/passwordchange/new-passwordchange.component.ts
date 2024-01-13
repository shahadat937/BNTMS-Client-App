import { Component, OnInit } from '@angular/core';
import { AbstractControl,FormBuilder, FormGroup, Validators,ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BIODataGeneralInfoService } from 'src/app/trainee-biodata/biodata-tab-layout/service/BIODataGeneralInfo.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';

import { ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-new-passwordchange',
  templateUrl: './new-passwordchange.component.html',
  styleUrls: ['./new-passwordchange.component.sass']
})
export class NewPasswordChangeComponent implements OnInit {

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
  PasswordUpdateForm: FormGroup;
  validationErrors: string[] = [];
  role:any;
  traineeId:any;

  constructor(private snackBar: MatSnackBar, private authService: AuthService,private BIODataGeneralInfoService: BIODataGeneralInfoService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { 
    // this.files = [];
  }

  @ViewChild('labelImport')  labelImport: ElementRef;
  ngOnInit(): void {

    this.role = this.authService.currentUserValue.role.trim();
    this.userId=this.authService.currentUserValue.id;
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    console.log(this.role, this.traineeId)
    const id = this.traineeId;
    
    console.log("Idddd");
    console.log(this.userId)
    if (id) {
      this.pageTitle = 'Password Change';
      this.destination='Edit';
      this.buttonText="Update";
 
      this.BIODataGeneralInfoService.find(+id).subscribe(
        res => {
          console.log(res);
          if (res) {
            this.PasswordUpdateForm.patchValue(res);
          }   
        }
      );
    } else {
      this.pageTitle = 'Password Change';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }

  intitializeForm() {
    let now = new Date();
    this.PasswordUpdateForm = this.fb.group({
      traineeId: [0],
      userId:[''],     
      currentPassword:['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.maxLength(20)]],
      newPassword:['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.maxLength(20)]],
      confirmPassword:['', [Validators.required,this.matchValues('newPassword')]] 

      // password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'), Validators.maxLength(20)]],
      // confirmPassword: ['', [Validators.required,this.matchValues('password')]],
    })
  }
// getSelectedUserById(){
//   this.PasswordUpdateService.getselectedhaircolor().subscribe(res=>{
//     this.hairColorValues=res
//   });
// }

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

   // const id = this.PasswordUpdateForm.get('traineeId').value; 
   const id = this.userId;
   console.log(id);

  //  const formData = new FormData();
  //  for (const key of Object.keys(this.PasswordUpdateForm.value)) {
  //    const value = this.PasswordUpdateForm.value[key];
  //    formData.append(key, value);
 //  }
    // this.PasswordUpdateForm.get('dateOfBirth').setValue((new Date(this.PasswordUpdateForm.get('dateOfBirth').value)).toUTCString()) ;
    // this.PasswordUpdateForm.get('joiningDate').setValue((new Date(this.PasswordUpdateForm.get('joiningDate').value)).toUTCString()) ;

    // const formData = new FormData();
    // for (const key of Object.keys(this.PasswordUpdateForm.value)) {
    //   const value = this.PasswordUpdateForm.value[key];
    //   formData.append(key, value);
    // }
    // console.log(formData)

    
  //  if (id) {
    this.PasswordUpdateForm.get('userId').setValue(this.userId)
    console.log(this.PasswordUpdateForm.value)
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update  Item').subscribe(result => {
        if (result) {
          this.loading = true;
          this.BIODataGeneralInfoService.updatePassword(this.PasswordUpdateForm.value).subscribe(response => {
            // this.router.navigateByUrl('/trainee-biodata/trainee-biodata-tab/biodata-general-Info-list');
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
   //}
    
    // else {

    //   this.BIODataGeneralInfoService.submit(this.PasswordUpdateForm.value).subscribe(response => {
    //     // this.router.navigateByUrl('/trainee-biodata/trainee-biodata-tab/biodata-general-Info-list');
    //     this.router.navigateByUrl('/instructor/profile-update');
    //     this.reloadCurrentRoute();
    //     this.snackBar.open('Information Inserted Successfully ', '', {
    //       duration: 3000,
    //       verticalPosition: 'bottom',
    //       horizontalPosition: 'right',
    //       panelClass: 'snackbar-success'
    //     });
    //   }, error => {
    //     this.validationErrors = error;
    //   })
    // }
  }
}


import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNull } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  lastPublishDate:any;

  schoolId:any;
  instructorId:any;
  traineeId:any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,private snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.lastPublishDate = '01/20/2023';
    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.schoolId=20;
  }
  get f() {
    return this.authForm.controls;
  }
  // adminSet() {
  //   this.authForm.get('username').setValue('admin@school.org');
  //   this.authForm.get('password').setValue('admin@123');
  // }
  // teacherSet() {
  //   this.authForm.get('username').setValue('teacher@school.org');
  //   this.authForm.get('password').setValue('teacher@123');
  // }
  // studentSet() {
  //   this.authForm.get('username').setValue('student@school.org');
  //   this.authForm.get('password').setValue('student@123');
  // }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {

      this.snackBar.open('Email and Password not valid !', '', {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'right',
        panelClass: 'snackbar-danger'
      });
     
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f.email.value, this.f.password.value)
        .subscribe(
          (res) => {
            if (res) {
              this.snackBar.open('login successfull.', '', {
                duration: 3000,
                verticalPosition: 'bottom',
                horizontalPosition: 'right',
                panelClass: 'snackbar-success'
              });
              console.log("signin res");
              console.log(res);

  
             // setTimeout(() => {
              const roleCheck = this.authService.currentUserValue.role;







              // if( isNull(roleCheck)){

              // }
              const role = this.authService.currentUserValue.role.trim();
              const traineeId =  this.authService.currentUserValue.traineeId.trim();
              const branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";

              

              console.log(traineeId); 
              console.log(branchId);
                if (role === Role.All || role === Role.MasterAdmin) {
                  this.router.navigate(['/admin/dashboard/main']);
                }else if (role === Role.DDNT) {
                  this.router.navigate(['/admin/dashboard/main']);
                }else if (role === Role.Director) {
                  this.router.navigate(['/admin/dashboard/main']);
                } else if (role === Role.SuperAdmin || role === Role.CO || role === Role.BNASchool || role === Role.JSTISchool || role === Role.SchoolOIC || role === Role.OICNBCDSchool || role === Role.OICNETSchool || role === Role.TC || role === Role.TrainingOffice || role === Role.AreaCommander || role === Role.TCO) {
                  this.router.navigate(['/admin/dashboard/school-dashboard']);
                } else if (role === Role.DataEntry) {
                  this.router.navigate(['/admin/dashboard/school-dashboard']);
                }
                else if (role === Role.BnaDataEntry) {
                  this.router.navigate(['/admin/dashboard/school-dashboard']);
                }  
                else if (role === Role.Instructor) {
                  this.router.navigate(['/admin/dashboard/instructor-dashboard']);
                } else if (role === Role.Student) {
                  this.router.navigate(['/admin/dashboard/trainee-dashboard']);
                } else if (role === Role.InterSeeviceCourse || role === Role.InterSeeviceDesk) {
                  this.router.navigate(['/admin/dashboard/interservice-dashboard']);
                }else if (role === Role.ForeignTraining) {
                  console.log("Foreign");
                  this.router.navigate(['/admin/dashboard/foreigntraining-dashboard']);
                } else if (role === Role.BNA) {
                  console.log("check");
                  this.router.navigate(['/admin/dashboard/bna-dashboard']);
                } else {
                  this.router.navigate(['/authentication/signin']);
                }
                this.loading = false;
            //  }, 1000);
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }
}

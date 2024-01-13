import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManualService } from '../../service/UserManual.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-usermanual',
  templateUrl: './new-usermanual.component.html',
  styleUrls: ['./new-usermanual.component.sass']
})
export class NewUserManualComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  selectedRoles:any;
  UserManualForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private UserManualService: UserManualService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('userManualId'); 
    if (id) {
      this.pageTitle = 'Edit User Manual';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.UserManualService.find(+id).subscribe(
        res => {
          this.UserManualForm.patchValue({          

            userManualId: res.userManualId,
            roleName: res.roleName,
            doc:res.doc,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create User Manual';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getSelectedRoles();
  }
  intitializeForm() {
    this.UserManualForm = this.fb.group({
      userManualId: [0],
      roleName: [''],
      doc:[''],
      docfile: [''],
      isActive: [true],
    })
  }
  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.UserManualForm.patchValue({
        docfile: file,
      });
    }
  }

  getSelectedRoles(){
    this.UserManualService.getSelectedRoles().subscribe(res=>{
      this.selectedRoles=res      
    });
  }

  onSubmit() {
    
    const id = this.UserManualForm.get('userManualId').value;  
    console.log(this.UserManualForm.value)
    const formData = new FormData();
    for (const key of Object.keys(this.UserManualForm.value)) {
      const value = this.UserManualForm.value[key];
      formData.append(key, value);
    } 
    if (id) {
      
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.UserManualService.update(+id,formData).subscribe(response => {
            this.router.navigateByUrl('/user-manual/usermanual-list');
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
    }

    else {
      this.loading = true;
      this.UserManualService.submit(formData).subscribe(response => {
        this.router.navigateByUrl('/user-manual/usermanual-list');

        this.snackBar.open('Information Saved Successfully ', '', {
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

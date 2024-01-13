import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthorityService } from '../../service/AdminAuthority.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-adminauthority',
  templateUrl: './new-adminauthority.component.html',
  styleUrls: ['./new-adminauthority.component.sass']
})
export class NewAdminAuthorityComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  AdminAuthorityForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private AdminAuthorityService: AdminAuthorityService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('adminAuthorityId'); 
    if (id) {
      this.pageTitle = 'Edit Admin Authority';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.AdminAuthorityService.find(+id).subscribe(
        res => {
          this.AdminAuthorityForm.patchValue({          

            adminAuthorityId: res.adminAuthorityId,
            adminAuthorityName: res.adminAuthorityName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Admin Authority';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.AdminAuthorityForm = this.fb.group({
      adminAuthorityId: [0],
      adminAuthorityName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.AdminAuthorityForm.get('adminAuthorityId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.AdminAuthorityService.update(+id,this.AdminAuthorityForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/adminauthority-list');
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
      this.AdminAuthorityService.submit(this.AdminAuthorityForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/adminauthority-list');
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

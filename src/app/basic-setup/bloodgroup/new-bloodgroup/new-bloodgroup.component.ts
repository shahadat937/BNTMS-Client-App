import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BloodGroupService } from '../../service/BloodGroup.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-bloodgroup',
  templateUrl: './new-bloodgroup.component.html',
  styleUrls: ['./new-bloodgroup.component.sass']
})
export class NewBloodGroupComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BloodGroupForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private BloodGroupService: BloodGroupService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bloodGroupId'); 
    if (id) {
      this.pageTitle = 'Edit Blood Group';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.BloodGroupService.find(+id).subscribe(
        res => {
          this.BloodGroupForm.patchValue({          

            bloodGroupId: res.bloodGroupId,
            bloodGroupName: res.bloodGroupName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Blood Group';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BloodGroupForm = this.fb.group({
      bloodGroupId: [0],
      bloodGroupName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BloodGroupForm.get('bloodGroupId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BloodGroupService.update(+id,this.BloodGroupForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bloodgroup-list');
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
  this.loading=true;
      this.BloodGroupService.submit(this.BloodGroupForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bloodgroup-list');
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

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from '../../service/branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.sass']
})
export class NewBranchComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  branchForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private branchService: BranchService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('branchId'); 
    if (id) {
      this.pageTitle = 'Edit Branch';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.branchService.find(+id).subscribe(
        res => {
          this.branchForm.patchValue({          

            branchId: res.branchId,
            branchName: res.branchName,
            shortName:res.shortName
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Branch';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.branchForm = this.fb.group({
      branchId: [0],
      branchName: ['', Validators.required],
      shortName:[''],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.branchForm.get('branchId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.branchService.update(+id,this.branchForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/branch-list');
            this.snackBar.open('Branch Information Updated Successfully ', '', {
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
      this.branchService.submit(this.branchForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/branch-list');

        this.snackBar.open('Branch Information Saved Successfully ', '', {
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

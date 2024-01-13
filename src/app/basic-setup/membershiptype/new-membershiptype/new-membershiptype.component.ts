import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipTypeService } from '../../service/membership-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-membershiptype',
  templateUrl: './new-membershiptype.component.html',
  styleUrls: ['./new-membershiptype.component.sass']
})
export class NewMembershiptypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  membershipTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private membershipTypeService: MembershipTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('membershipTypeId'); 
    if (id) {
      this.pageTitle = 'Edit MembershipType';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.membershipTypeService.find(+id).subscribe(
        res => {
          this.membershipTypeForm.patchValue({          

            membershipTypeId: res.membershipTypeId,
            membershipTypeName: res.membershipTypeName,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create MembershipType';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.membershipTypeForm = this.fb.group({
      membershipTypeId: [0],
      membershipTypeName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.membershipTypeForm.get('membershipTypeId').value;  
    
    if (id) {
      this.loading=true;
      this.membershipTypeService.update(+id,this.membershipTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/membershiptype-list');
        this.snackBar.open('MembershipType Information Updated Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
      }, error => {
        this.validationErrors = error;
      })
    }
    
   else {
    this.loading=true;
      this.membershipTypeService.submit(this.membershipTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/membershiptype-list');
        this.snackBar.open('MembershipType Information Saved Successfully ', '', {
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

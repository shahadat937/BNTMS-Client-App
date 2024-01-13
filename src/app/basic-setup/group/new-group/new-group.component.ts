import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../service/group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.sass']
})
export class NewGroupComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  groupForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private groupService: GroupService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('groupId'); 
    if (id) {
      this.pageTitle = 'Edit Group';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.groupService.find(+id).subscribe(
        res => {
          this.groupForm.patchValue({          

            groupId: res.groupId,
            groupName: res.groupName,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Group';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.groupForm = this.fb.group({
      groupId: [0],
      groupName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.groupForm.get('groupId').value;  
    
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Group Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.groupService.update(+id,this.groupForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/group-list');
            this.snackBar.open('Group Information Updated Successfully ', '', {
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
      this.groupService.submit(this.groupForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/group-list');
        this.snackBar.open('Group Information Saved Successfully ', '', {
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

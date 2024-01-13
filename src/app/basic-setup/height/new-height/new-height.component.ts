import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HeightService } from '../../service/height.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-height',
  templateUrl: './new-height.component.html',
  styleUrls: ['./new-height.component.sass']
})
export class NewHeightComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  heightForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private heightService: HeightService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('heightId'); 
    if (id) {
      this.pageTitle = 'Edit Height';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.heightService.find(+id).subscribe(
        res => {
          this.heightForm.patchValue({          

            heightId: res.heightId,
            heightName: res.heightName,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Height';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.heightForm = this.fb.group({
      heightId: [0],
      heightName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.heightForm.get('heightId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Height Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.heightService.update(+id,this.heightForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/height-list');
            this.snackBar.open('Height Information Updated Successfully ', '', {
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
      this.heightService.submit(this.heightForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/height-list');
        this.snackBar.open('Height Information Saved Successfully ', '', {
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

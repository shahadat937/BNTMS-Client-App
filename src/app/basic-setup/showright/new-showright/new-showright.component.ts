import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowRightService } from '../../service/showright.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-showright',
  templateUrl: './new-showright.component.html',
  styleUrls: ['./new-showright.component.sass']
})
export class NewShowRightComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  ShowRightForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private ShowRightService: ShowRightService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('showRightId'); 
    if (id) {
      this.pageTitle = 'Edit Show Right';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.ShowRightService.find(+id).subscribe(
        res => {
          this.ShowRightForm.patchValue({          

            showRightId: res.showRightId,
            showRightName: res.showRightName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Show Right';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.ShowRightForm = this.fb.group({
      showRightId: [0],
      showRightName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.ShowRightForm.get('showRightId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.ShowRightService.update(+id,this.ShowRightForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/showright-list');
            this.snackBar.open(' Information Updated Successfully ', '', {
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
      this.ShowRightService.submit(this.ShowRightForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/showright-list');
        this.snackBar.open(' Information Save Successfully ', '', {
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

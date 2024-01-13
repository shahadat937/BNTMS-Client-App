import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WeightService } from '../../service/weight.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-weight',
  templateUrl: './new-weight.component.html',
  styleUrls: ['./new-weight.component.sass']
})
export class NewWeightComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  weightForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private weightService: WeightService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('weightId'); 
    if (id) {
      this.pageTitle = 'Edit Weight';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.weightService.find(+id).subscribe(
        res => {
          this.weightForm.patchValue({          

            weightId: res.weightId,
            weightName: res.weightName,
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Weight';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.weightForm = this.fb.group({
      weightId: [0],
      weightName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.weightForm.get('weightId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Weight Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.weightService.update(+id,this.weightForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/weight-list');
            this.snackBar.open('Weight Information Updated Successfully ', '', {
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
      this.weightService.submit(this.weightForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/weight-list');
        this.snackBar.open('Weight Information Save Successfully ', '', {
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {WeekNameService} from '../../service/WeekName.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-weekname',
  templateUrl: './new-weekname.component.html',
  styleUrls: ['./new-weekname.component.sass']
})
export class NewWeekNameComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  WeekNameForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private WeekNameService: WeekNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('weekNameId'); 
    if (id) {
      this.pageTitle = 'Edit Course Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.WeekNameService.find(+id).subscribe(
        res => {
          this.WeekNameForm.patchValue({          

            weekNameId: res.weekNameId,
            name: res.name,
            remarks: res.remarks,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Course Type';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.WeekNameForm = this.fb.group({
      weekNameId: [0],
      name: [''],
      remarks: [''],
      isActive: [true],
     
    })
  }
  
  onSubmit() {
    const id = this.WeekNameForm.get('weekNameId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.WeekNameService.update(+id,this.WeekNameForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/weekname-list');
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
      this.WeekNameService.submit(this.WeekNameForm.value).subscribe(response => {
        this.snackBar.open('Information Saved Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
        this.router.navigateByUrl('/basic-setup/weekname-list');
      }, error => {
        this.validationErrors = error;
      })
    }
 
  }

}

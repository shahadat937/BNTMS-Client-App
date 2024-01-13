import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { OccupationService } from '../../service/occupation.service';

@Component({
  selector: 'app-new-occupation',
  templateUrl: './new-occupation.component.html',
  styleUrls: ['./new-occupation.component.sass']
})
export class NewOccupationComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  occupationForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private occupationService: OccupationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('occupationId'); 
    if (id) {
      this.pageTitle = 'Edit Occupation';
      this.destination='Edit';
      this.buttonText="Update";
      this.occupationService.find(+id).subscribe(
        res => {
          this.occupationForm.patchValue({          

            occupationId: res.occupationId,
            occupationName: res.occupationName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Occupation';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.occupationForm = this.fb.group({
      occupationId: [0],
      occupationName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.occupationForm.get('occupationId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Occupation Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.occupationService.update(+id,this.occupationForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/occupation-list');
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
      this.occupationService.submit(this.occupationForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/occupation-list');
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

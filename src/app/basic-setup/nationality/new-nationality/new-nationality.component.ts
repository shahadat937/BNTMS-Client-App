import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { NationalityService } from '../../service/nationality.service';

@Component({
  selector: 'app-new-nationality',
  templateUrl: './new-nationality.component.html',
  styleUrls: ['./new-nationality.component.sass']
})
export class NewNationalityComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  nationalityForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private nationalityService: NationalityService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('nationalityId'); 
    if (id) {
      this.pageTitle = 'Edit Nationality';
      this.destination='Edit';
      this.buttonText="Update";
      this.nationalityService.find(+id).subscribe(
        res => {
          this.nationalityForm.patchValue({          

            nationalityId: res.nationalityId,
            nationalityName: res.nationalityName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Nationality';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.nationalityForm = this.fb.group({
      nationalityId: [0],
      nationalityName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.nationalityForm.get('nationalityId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Nationality Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.nationalityService.update(+id,this.nationalityForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/nationality-list');
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
      this.nationalityService.submit(this.nationalityForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/nationality-list');
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

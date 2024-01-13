import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ReligionService } from '../../service/religion.service';

@Component({
  selector: 'app-new-religion',
  templateUrl: './new-religion.component.html',
  styleUrls: ['./new-religion.component.sass']
})
export class NewReligionComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  religionForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private religionService: ReligionService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('religionId'); 
    if (id) {
      this.pageTitle = 'Edit Religion';
      this.destination='Edit';
      this.buttonText="Update";
      this.religionService.find(+id).subscribe(
        res => {
          this.religionForm.patchValue({          

            religionId: res.religionId,
            religionName: res.religionName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Religion';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.religionForm = this.fb.group({
      religionId: [0],
      religionName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.religionForm.get('religionId').value; 
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Religion Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.religionService.update(+id,this.religionForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/religion-list');
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
      this.religionService.submit(this.religionForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/religion-list');
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

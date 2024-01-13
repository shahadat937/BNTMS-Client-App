import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ComplexionService } from '../../service/complexion.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({ 
  selector: 'app-new-complexion',
  templateUrl: './new-complexion.component.html',
  styleUrls: ['./new-complexion.component.sass']
})
export class NewComplexionComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  complexionForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private complexionService: ComplexionService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('complexionId'); 
    if (id) {
      this.pageTitle = 'Edit Complexion';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.complexionService.find(+id).subscribe(
        res => {
          this.complexionForm.patchValue({          

            complexionId: res.complexionId,
            complexionName: res.complexionName,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Complexion';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.complexionForm = this.fb.group({
      complexionId: [0],
      complexionName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.complexionForm.get('complexionId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.complexionService.update(+id,this.complexionForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/complexion-list');
            this.snackBar.open('Complexion Information Updated Successfully ', '', {
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
      this.complexionService.submit(this.complexionForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/complexion-list');
        this.snackBar.open('Complexion Information Saved Successfully ', '', {
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

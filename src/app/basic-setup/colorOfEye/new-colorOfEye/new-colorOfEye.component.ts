import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ColorOfEyeService } from '../../service/colorOfEye.service';

@Component({
  selector: 'app-new-colorOfEye',
  templateUrl: './new-colorOfEye.component.html',
  styleUrls: ['./new-colorOfEye.component.sass']
})
export class NewColorOfEyeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  colorOfEyeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private colorOfEyeService: ColorOfEyeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('colorOfEyeId'); 
    if (id) {
      this.pageTitle = 'Edit Color Of Eye';
      this.destination='Edit';
      this.buttonText="Update";
      this.colorOfEyeService.find(+id).subscribe(
        res => {
          this.colorOfEyeForm.patchValue({          

            colorOfEyeId: res.colorOfEyeId,
            colorOfEyeName: res.colorOfEyeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Color Of Eye';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.colorOfEyeForm = this.fb.group({
      colorOfEyeId: [0],
      colorOfEyeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.colorOfEyeForm.get('colorOfEyeId').value;   
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Color Of Eye Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.colorOfEyeService.update(+id,this.colorOfEyeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/colorOfEye-list');
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
      this.colorOfEyeService.submit(this.colorOfEyeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/colorOfEye-list');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenderService } from '../../service/gender.service';
import { ConfirmService } from '../../../core/service/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-gender',
  templateUrl: './new-gender.component.html',
  styleUrls: ['./new-gender.component.sass']
})
export class NewGenderComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  genderForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private genderService: GenderService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('genderId'); 
    if (id) {
      this.pageTitle = 'Edit Gender';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.genderService.find(+id).subscribe(
        res => {
          this.genderForm.patchValue({          

            genderId: res.genderId,
            genderName: res.genderName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Gender';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.genderForm = this.fb.group({
      genderId: [0],
      genderName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.genderForm.get('genderId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Gender Item').subscribe(result => {
        //console.log(result);
        if (result) {
          this.loading=true;
          this.genderService.update(+id,this.genderForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/gender-list');
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
      this.genderService.submit(this.genderForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/gender-list');
        this.snackBar.open('Gender Information Inserted Successfully ', '', {
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

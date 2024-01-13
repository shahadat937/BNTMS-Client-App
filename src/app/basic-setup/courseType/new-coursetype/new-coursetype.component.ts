import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {CourseTypeService} from '../../service/CourseType.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-coursetype',
  templateUrl: './new-coursetype.component.html',
  styleUrls: ['./new-coursetype.component.sass']
})
export class NewCoursetypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  CourseTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CourseTypeService: CourseTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('courseTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Course Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.CourseTypeService.find(+id).subscribe(
        res => {
          this.CourseTypeForm.patchValue({          

            courseTypeId: res.courseTypeId,
            courseTypeName: res.courseTypeName,
            //menuPosition: res.menuPosition,
          
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
    this.CourseTypeForm = this.fb.group({
      courseTypeId: [0],
      courseTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
     
    })
  }
  
  onSubmit() {
    const id = this.CourseTypeForm.get('courseTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.CourseTypeService.update(+id,this.CourseTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/coursetype-list');
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
      this.CourseTypeService.submit(this.CourseTypeForm.value).subscribe(response => {
        this.snackBar.open('Information Saved Successfully ', '', {
          duration: 2000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: 'snackbar-success'
        });
        this.router.navigateByUrl('/basic-setup/coursetype-list');
      }, error => {
        this.validationErrors = error;
      })
    }
 
  }

}

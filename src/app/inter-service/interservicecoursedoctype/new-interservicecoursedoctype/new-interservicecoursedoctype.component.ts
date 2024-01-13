import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { InterServiceCourseDocTypeService } from '../../service/InterServiceCourseDocType.service';

@Component({
  selector: 'app-new-interservicecoursedoctype',
  templateUrl: './new-interservicecoursedoctype.component.html',
  styleUrls: ['./new-interservicecoursedoctype.component.sass']
})
export class NewInterServiceCourseDocTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  InterServiceCourseDocTypeForm: FormGroup;
  validationErrors: string[] = [];
  selectedForceType:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private InterServiceCourseDocTypeService: InterServiceCourseDocTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('interServiceCourseDocTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Inter Service Course Doc Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.InterServiceCourseDocTypeService.find(+id).subscribe(
        res => {
          this.InterServiceCourseDocTypeForm.patchValue({          

            interServiceCourseDocTypeId: res.interServiceCourseDocTypeId,
            name: res.name,
            remarks: res.remarks,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Organization Name';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.InterServiceCourseDocTypeForm = this.fb.group({
      interServiceCourseDocTypeId: [0],
      name: [''],
      remarks: [''],
      isActive: [true],
    
    })
  }
  
  
  onSubmit() {
    const id = this.InterServiceCourseDocTypeForm.get('interServiceCourseDocTypeId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.InterServiceCourseDocTypeService.update(+id,this.InterServiceCourseDocTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/inter-service/interservicecoursedoctype-list');
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
      this.InterServiceCourseDocTypeService.submit(this.InterServiceCourseDocTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/inter-service/interservicecoursedoctype-list');
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

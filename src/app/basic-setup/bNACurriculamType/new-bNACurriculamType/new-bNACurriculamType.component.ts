import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BNACurriculamTypeService } from '../../service/bNACurriculamType.service';

@Component({
  selector: 'app-new-bnacurriculamtype',
  templateUrl: './new-bnacurriculamtype.component.html',
  styleUrls: ['./new-bnacurriculamtype.component.sass']
})
export class NewBNACurriculamTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  bNACurriculamTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private bNACurriculamTypeService: BNACurriculamTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaCurriculumTypeId'); 
    if (id) {
      this.pageTitle = 'Edit BNA Curriculam Type';
      this.destination = "Edit";
      this.buttonText="Update";
      this.bNACurriculamTypeService.find(+id).subscribe(
        res => {
          this.bNACurriculamTypeForm.patchValue({          

            bnaCurriculumTypeId: res.bnaCurriculumTypeId,
            curriculumType: res.curriculumType,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Curriculam Type';
      this.destination = "Add";
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.bNACurriculamTypeForm = this.fb.group({
      bnaCurriculumTypeId: [0],
      curriculumType: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.bNACurriculamTypeForm.get('bnaCurriculumTypeId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.bNACurriculamTypeService.update(+id,this.bNACurriculamTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnacurriculumtype-list');
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
      this.loading = true;
      this.bNACurriculamTypeService.submit(this.bNACurriculamTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnacurriculumtype-list');
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

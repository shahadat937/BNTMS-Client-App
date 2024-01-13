import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkTypeService } from '../../service/MarkType.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-marktype',
  templateUrl: './new-marktype.component.html',
  styleUrls: ['./new-marktype.component.sass']
})
export class NewMarkTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  MarkTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private MarkTypeService: MarkTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('markTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Mark Type';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.MarkTypeService.find(+id).subscribe(
        res => {
          this.MarkTypeForm.patchValue({          

            markTypeId: res.markTypeId,
            typeName: res.typeName,
            shortName: res.shortName,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Mark Type';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.MarkTypeForm = this.fb.group({
      markTypeId: [0],
      typeName: ['', Validators.required],
      shortName: ['', Validators.required],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.MarkTypeForm.get('markTypeId').value;   

    if (id) {
        this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
      this.MarkTypeService.update(+id,this.MarkTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/marktype-list');
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
      this.MarkTypeService.submit(this.MarkTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/marktype-list');
        this.snackBar.open('Information Saved Successfully ', '', {
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

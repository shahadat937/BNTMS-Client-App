import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeValueTypeService } from '../../service/CodeValueType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-codevaluetype',
  templateUrl: './new-codevaluetype.component.html',
  styleUrls: ['./new-codevaluetype.component.sass']
})
export class NewCodeValueTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  CodeValueTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueTypeService: CodeValueTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('codeValueTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Code Value Type';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.CodeValueTypeService.find(+id).subscribe(
        res => {
          this.CodeValueTypeForm.patchValue({          

            codeValueTypeId: res.codeValueTypeId,
            type: res.type,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Code Value Type';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.CodeValueTypeForm = this.fb.group({
      codeValueTypeId: [0],
      type: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.CodeValueTypeForm.get('codeValueTypeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.CodeValueTypeService.update(+id,this.CodeValueTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/codevaluetype-list');
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
    }  else {
      this.loading=true;
      this.CodeValueTypeService.submit(this.CodeValueTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/codevaluetype-list');
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

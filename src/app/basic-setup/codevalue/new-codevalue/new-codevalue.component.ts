import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeValueService } from '../../service/codevalue.service';

import { CodeValueType } from '../../models/CodeValueType';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-codevalue',
  templateUrl: './new-codevalue.component.html',
  styleUrls: ['./new-codevalue.component.sass']
})
export class NewCodeValueComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  CodeValueForm: FormGroup;
  validationErrors: string[] = [];
  selectedModel:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('codeValueId'); 
    if (id) {
      this.pageTitle = 'Edit CodeValue';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.CodeValueService.find(+id).subscribe(
        res => {
          this.CodeValueForm.patchValue({          
            codeValueId: res.codeValueId,
            code: res.code,
            codeValueTypeId:res.codeValueTypeId,
            typeValue:res.typeValue,
            additonalValue:res.additonalValue,
            displayCode:res.displayCode,
            remarks:res.remarks,
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create CodeValue';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getCodeValueType();
  }
  intitializeForm() {
    this.CodeValueForm = this.fb.group({
      codeValueId: [0],
      code: ['', Validators.required],
      codeValueTypeId: ['', Validators.required],
      typeValue: [''],
      additonalValue: [''],
      displayCode: [''], 
      remarks: [''],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  getCodeValueType(){
    this.CodeValueService.getselectedcodevaluetype().subscribe(res=>{
      this.selectedModel=res
      console.log(this.selectedModel);
    });
  }
  onSubmit() {
    const id = this.CodeValueForm.get('codeValueId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.CodeValueService.update(+id,this.CodeValueForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/codevalue-list');
            this.snackBar.open('CodeValue Information Updated Successfully ', '', {
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
      this.CodeValueService.submit(this.CodeValueForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/codevalue-list');
        this.snackBar.open('CodeValue Information Saved Successfully ', '', {
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

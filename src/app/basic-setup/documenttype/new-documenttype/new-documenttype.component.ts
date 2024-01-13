import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentTypeService } from '../../service/documenttype.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-documenttype',
  templateUrl: './new-documenttype.component.html',
  styleUrls: ['./new-documenttype.component.sass']
})
export class NewDocumentTypeComponent implements OnInit {
  loading = false;
  pageTitle: string;
  destination:string;
  DocumentTypeForm: FormGroup;
  buttonText:string;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private DocumentTypeService: DocumentTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('documentTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Document Type';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.DocumentTypeService.find(+id).subscribe(
        res => {
          this.DocumentTypeForm.patchValue({          

            documentTypeId: res.documentTypeId,
            documentTypeName: res.documentTypeName,
            iconName:res.iconName
          //  menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Document Type';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.DocumentTypeForm = this.fb.group({
      documentTypeId: [0],
      documentTypeName: ['', Validators.required],
      iconName:[''],
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.DocumentTypeForm.get('documentTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.DocumentTypeService.update(+id,this.DocumentTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/documenttype-list');
            this.snackBar.open(' Information Updated Successfully ', '', {
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
      this.DocumentTypeService.submit(this.DocumentTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/documenttype-list');
        this.snackBar.open(' Information Save Successfully ', '', {
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

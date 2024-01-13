import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RelationTypeService } from '../../service/RelationType.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-relationtype',
  templateUrl: './new-relationtype.component.html',
  styleUrls: ['./new-relationtype.component.sass']
})
export class NewRelationTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  RelationTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private RelationTypeService: RelationTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('relationTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Relation Type';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.RelationTypeService.find(+id).subscribe(
        res => {
          this.RelationTypeForm.patchValue({          

            relationTypeId: res.relationTypeId,
            relationTypeName: res.relationTypeName,
            //menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Relation Type';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.RelationTypeForm = this.fb.group({
      relationTypeId: [0],
      relationTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.RelationTypeForm.get('relationTypeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.RelationTypeService.update(+id,this.RelationTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/relationtype-list');
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
      this.RelationTypeService.submit(this.RelationTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/relationtype-list');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { DefenseTypeService } from '../../service/defenseType.service';

@Component({
  selector: 'app-new-defenseType',
  templateUrl: './new-defenseType.component.html',
  styleUrls: ['./new-defenseType.component.sass']
})
export class NewDefenseTypeComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  defenseTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private defenseTypeService: DefenseTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('defenseTypeId'); 
    if (id) {
      this.pageTitle = 'Edit Defense Type';
      this.destination='Edit';
      this.buttonText="Update";
      this.defenseTypeService.find(+id).subscribe(
        res => {
          this.defenseTypeForm.patchValue({          

            defenseTypeId: res.defenseTypeId,
            defenseTypeName: res.defenseTypeName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Defense Type';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.defenseTypeForm = this.fb.group({
      defenseTypeId: [0],
      defenseTypeName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.defenseTypeForm.get('defenseTypeId').value; 
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Defense Type Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.defenseTypeService.update(+id,this.defenseTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/defenseType-list');
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
      this.defenseTypeService.submit(this.defenseTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/defenseType-list');
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

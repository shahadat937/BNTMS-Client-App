import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { BnaClassTestTypeService } from '../../service/BnaClassTestType.service';

@Component({
  selector: 'app-new-BnaClassTestType',
  templateUrl: './new-BnaClassTestType.component.html',
  styleUrls: ['./new-BnaClassTestType.component.sass']
})
export class NewBnaClassTestTypeComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BnaClassTestTypeForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private BnaClassTestTypeService: BnaClassTestTypeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('bnaClassTestTypeId'); 
    if (id) {
      this.pageTitle = 'New BNA Class Test Type';
      this.destination = "New";
      this.btnText='Update';
      this.BnaClassTestTypeService.find(+id).subscribe(
        res => {
          this.BnaClassTestTypeForm.patchValue({          

            bnaClassTestTypeId: res.bnaClassTestTypeId,
            name: res.name,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create BNA Class Test Type';
      this.destination = "Add";
      this.btnText='Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.BnaClassTestTypeForm = this.fb.group({
      bnaClassTestTypeId: [0],
      name: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.BnaClassTestTypeForm.get('bnaClassTestTypeId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading = true;
          this.BnaClassTestTypeService.update(+id,this.BnaClassTestTypeForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/bnaclasstesttype-list');
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
      this.BnaClassTestTypeService.submit(this.BnaClassTestTypeForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/bnaclasstesttype-list');
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

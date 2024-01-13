import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DivisionService } from '../../service/Division.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-division',
  templateUrl: './new-division.component.html',
  styleUrls: ['./new-division.component.sass']
})
export class NewDivisionComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  DivisionForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private DivisionService: DivisionService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('divisionId'); 
    if (id) {
      this.pageTitle = 'Edit Division';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.DivisionService.find(+id).subscribe(
        res => {
          this.DivisionForm.patchValue({          

            divisionId: res.divisionId,
            divisionName: res.divisionName,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Division';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.DivisionForm = this.fb.group({
      divisionId: [0],
      divisionName: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.DivisionForm.get('divisionId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.DivisionService.update(+id,this.DivisionForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/division-list');
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
      this.DivisionService.submit(this.DivisionForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/division-list');
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

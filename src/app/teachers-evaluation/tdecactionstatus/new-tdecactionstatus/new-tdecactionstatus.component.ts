import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { TdecActionStatusService } from '../../service/TdecActionStatus.service';

@Component({
  selector: 'app-new-tdecactionstatus',
  templateUrl: './new-tdecactionstatus.component.html',
  styleUrls: ['./new-tdecactionstatus.component.sass']
})
export class NewTdecActionStatusComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  TdecActionStatusForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private TdecActionStatusService: TdecActionStatusService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('tdecActionStatusId'); 
    if (id) {
      this.pageTitle = 'Edit Tdec Action Status';
      this.destination='Edit';
      this.buttonText="Update";
      this.TdecActionStatusService.find(+id).subscribe(
        res => {
          this.TdecActionStatusForm.patchValue({          

            tdecActionStatusId: res.tdecActionStatusId,
            name: res.name,
            mark: res.mark
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Tdec Action Status';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.TdecActionStatusForm = this.fb.group({
      tdecActionStatusId: [0],
      name: [''],
      mark: [''],
      isActive: [true]
    
    })
  }
  
  onSubmit() {
    const id = this.TdecActionStatusForm.get('tdecActionStatusId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.TdecActionStatusService.update(+id,this.TdecActionStatusForm.value).subscribe(response => {
            this.router.navigateByUrl('/teachers-evaluation/tdecactionstatus-list');
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
      this.TdecActionStatusService.submit(this.TdecActionStatusForm.value).subscribe(response => {
        this.router.navigateByUrl('/teachers-evaluation/tdecactionstatus-list');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaylorBranchService } from '../../service/SaylorBranch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({ 
  selector: 'app-new-saylorbranch',
  templateUrl: './new-saylorbranch.component.html',
  styleUrls: ['./new-saylorbranch.component.sass']
})
export class NewSaylorBranchComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  SaylorBranchForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private SaylorBranchService: SaylorBranchService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('saylorBranchId'); 
    if (id) {
      this.pageTitle = 'Edit Sailor Branch';
      this.destination='Edit';
      this.buttonText="Update";
      this.SaylorBranchService.find(+id).subscribe(
        res => {
          this.SaylorBranchForm.patchValue({          

            saylorBranchId: res.saylorBranchId,
            name: res.name,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Sailor Branch';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.SaylorBranchForm = this.fb.group({
      saylorBranchId: [0],
      name: [''],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.SaylorBranchForm.get('saylorBranchId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.SaylorBranchService.update(+id,this.SaylorBranchForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/saylorbranch-list');
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
      this.SaylorBranchService.submit(this.SaylorBranchForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/saylorbranch-list');
        this.snackBar.open('Information Save Successfully ', '', {
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

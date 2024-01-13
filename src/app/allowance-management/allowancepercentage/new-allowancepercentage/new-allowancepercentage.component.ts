import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { AllowancePercentageService } from '../../service/allowancepercentage.service';

@Component({
  selector: 'app-new-allowancepercentage',
  templateUrl: './new-allowancepercentage.component.html',
  styleUrls: ['./new-allowancepercentage.component.sass']
})
export class NewAllowancePercentageComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  AllowancePercentageForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private AllowancePercentageService: AllowancePercentageService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('allowancePercentageId'); 
    if (id) {
      this.pageTitle = 'Edit Allowance Percentage';
      this.destination='Edit';
      this.buttonText="Update";
      this.AllowancePercentageService.find(+id).subscribe(
        res => {
          this.AllowancePercentageForm.patchValue({          

            allowancePercentageId: res.allowancePercentageId,
            allowanceName: res.allowanceName,
            percentage:res.percentage,
            displayPriority: res.displayPriority,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Allowance Percentage';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.AllowancePercentageForm = this.fb.group({
      allowancePercentageId: [0],
      allowanceName: ['', Validators.required],
      percentage:[''],
      displayPriority: [],
      isActive: [true],
    
    })
  }
  
  
  onSubmit() {
    const id = this.AllowancePercentageForm.get('allowancePercentageId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
            this.AllowancePercentageService.update(+id,this.AllowancePercentageForm.value).subscribe(response => {
              this.router.navigateByUrl('/allowance-management/allowancepercentage-list');
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
        this.AllowancePercentageService.submit(this.AllowancePercentageForm.value).subscribe(response => {
          this.router.navigateByUrl('/allowance-management/allowancepercentage-list');
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

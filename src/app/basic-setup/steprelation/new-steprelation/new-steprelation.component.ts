import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { StepRelationService } from '../../service/StepRelation.service';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-steprelation',
  templateUrl: './new-steprelation.component.html',
  styleUrls: ['./new-steprelation.component.sass']
})
export class NewStepRelationComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  StepRelationForm: FormGroup;
  validationErrors: string[] = [];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private StepRelationService: StepRelationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('stepRelationId'); 
    if (id) {
      this.pageTitle = 'Edit Step Relation';
      this.destination = "Edit";
      this.btnText = 'Update';
      this.StepRelationService.find(+id).subscribe(
        res => {
          this.StepRelationForm.patchValue({          

            stepRelationId: res.stepRelationId,
            stepRelationType: res.stepRelationType,
            //menuPosition: res.menuPosition,
          
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Step Relation';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.StepRelationForm = this.fb.group({
      stepRelationId: [0],
      stepRelationType: ['', Validators.required],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }
  
  onSubmit() {
    const id = this.StepRelationForm.get('stepRelationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.StepRelationService.update(+id,this.StepRelationForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/steprelation-list');
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
      this.StepRelationService.submit(this.StepRelationForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/steprelation-list');
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoCurricularActivityService } from '../../service/CoCurricularActivity.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-co-curricular-activity',
  templateUrl: './new-co-curricular-activity.component.html',
  styleUrls: ['./new-co-curricular-activity.component.sass']
})
export class NewCoCurricularActivityComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  traineeId:  string;
  CoCurricularActivityForm: FormGroup;
  validationErrors: string[] = [];
  CoCurricularActivityTypeValues:SelectedModel[]; 


  constructor(private snackBar: MatSnackBar,private CoCurricularActivityService: CoCurricularActivityService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('coCurricularActivityId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Co-Curricular Activity Type';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.CoCurricularActivityService.find(+id).subscribe(
        res => {
          this.CoCurricularActivityForm.patchValue({          

            coCurricularActivityId : res.coCurricularActivityId,
            traineeId : res.traineeId,
            coCurricularActivityTypeId : res.coCurricularActivityTypeId,
            participation : res.participation,
            achievement : res.achievement            
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Co-Curricular Activity Type';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getCoCurricularActivityType();
  }
  intitializeForm() {
    this.CoCurricularActivityForm = this.fb.group({
      coCurricularActivityId: [0],
      traineeId: [this.traineeId, Validators.required],
      coCurricularActivityTypeId: ['', Validators.required],
      participation: ['', Validators.required],
      achievement: [''],          
      //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  getCoCurricularActivityType(){
    this.CoCurricularActivityService.getselectedcocurricularactivitytype().subscribe(res=>{
      this.CoCurricularActivityTypeValues=res
    });
  }

  
  onSubmit() {
    const id = this.CoCurricularActivityForm.get('coCurricularActivityId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.CoCurricularActivityService.update(+id,this.CoCurricularActivityForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/co-curricular-activity-details/'+this.traineeId);
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
      this.CoCurricularActivityService.submit(this.CoCurricularActivityForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/co-curricular-activity-details/'+this.traineeId);
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

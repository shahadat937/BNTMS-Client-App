import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JoiningReasonService } from '../../service/JoiningReason.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-joining-reason',
  templateUrl: './new-joining-reason.component.html',
  styleUrls: ['./new-joining-reason.component.sass']
})
export class NewJoiningReasonComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  JoiningReasonForm: FormGroup;
  validationErrors: string[] = [];
  traineeId: string;
  selectedReasonType:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private JoiningReasonService: JoiningReasonService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('joiningReasonId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Joining Reason';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.JoiningReasonService.find(+id).subscribe(
        res => {
          this.JoiningReasonForm.patchValue({          

            joiningReasonId: res.joiningReasonId,
            traineeId: res.traineeId,
            reasonTypeId:res.reasonTypeId,
            ifAnotherReason:res.ifAnotherReason,
            additionlInformation:res.additionlInformation
            //menuPosition = res.menuPosition,
            //isActive = res.isActive
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Joining Reason';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getSelectedReasonType();
   // this.getDistrict();
    //this.getThana();
  }
  intitializeForm() {
    this.JoiningReasonForm = this.fb.group({
      joiningReasonId: [0],
      traineeId: [this.traineeId, Validators.required],
      reasonTypeId: ['', Validators.required],
      ifAnotherReason: ['', Validators.required],
      additionlInformation: [''],
      //   status: [''],           
    //  menuPosition: ['', Validators.required],
     // isActive: [true],
    
    })
  }

  getSelectedReasonType(){
    this.JoiningReasonService.getSelectedReasonType().subscribe(res=>{
      this.selectedReasonType=res
      console.log(this.selectedReasonType);
    });
  }

  // getThana(){
  //   this.JoiningReasonService.getselectedthana().subscribe(res=>{
  //     this.thanaValues=res
  //     console.log(this.thanaValues);
  //   });
  // }

  
  onSubmit() {
    const id = this.JoiningReasonForm.get('joiningReasonId').value;   
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.JoiningReasonService.update(+id,this.JoiningReasonForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/joining-reason-details/'+this.traineeId);
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
      this.JoiningReasonService.submit(this.JoiningReasonForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/joining-reason-details/'+this.traineeId);
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

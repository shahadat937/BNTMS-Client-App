import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraineeMembershipService } from '../../../biodata-tab-layout/service/TraineeMembership.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';


@Component({
  selector: 'app-new-trainee-membership',
  templateUrl: './new-trainee-membership.component.html',
  styleUrls: ['./new-trainee-membership.component.sass']
})
export class NewTraineeMembershipComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  traineeId:  string;
  TraineeMembershipForm: FormGroup;
  validationErrors: string[] = [];
  membershipTypeValues:SelectedModel[]; 

  constructor(private snackBar: MatSnackBar,private TraineeMembershipService: TraineeMembershipService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('traineeMembershipId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Trainee Membership';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.TraineeMembershipService.find(+id).subscribe(
        res => {
          this.TraineeMembershipForm.patchValue({          

            traineeMembershipId: res.traineeMembershipId,
            traineeId: res.traineeId,
            orgName: res.orgName,
            membershipTypeId: res.membershipTypeId,
            briefAddress: res.briefAddress,
            appointment: res.appointment,
            durationFrom: res.durationFrom,
            durationTo: res.durationTo,
            additionalInformation: res.additionalInformation,            
         //   menuPosition: res.menuPosition,
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Trainee Membership';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
   this.getMembershipType();
  }
  intitializeForm() {
    this.TraineeMembershipForm = this.fb.group({
      traineeMembershipId: [0],
      traineeId: [this.traineeId, Validators.required],
      orgName: ['', Validators.required],
      membershipTypeId: ['', Validators.required],
      briefAddress: ['', Validators.required],
      appointment: ['', Validators.required],
      durationFrom: ['', Validators.required],
      durationTo: ['', Validators.required],
      additionalInformation: [],      
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  getMembershipType(){
    this.TraineeMembershipService.getselectedmembershiptype().subscribe(res=>{
      this.membershipTypeValues=res
    });
  }
  
  onSubmit() {
    const id = this.TraineeMembershipForm.get('traineeMembershipId').value;   
    

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.TraineeMembershipService.update(+id,this.TraineeMembershipForm.value).subscribe(response => {
            this.router.navigateByUrl('/trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/trainee-membership-details/'+this.traineeId);
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
      this.TraineeMembershipService.submit(this.TraineeMembershipForm.value).subscribe(response => {
        this.router.navigateByUrl('/trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/trainee-membership-details/'+this.traineeId);
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

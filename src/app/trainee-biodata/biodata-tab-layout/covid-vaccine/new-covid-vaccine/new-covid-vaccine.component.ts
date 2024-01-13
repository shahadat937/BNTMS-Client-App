import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CovidVaccineService } from '../../service/CovidVaccine.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-covid-vaccine',
  templateUrl: './new-covid-vaccine.component.html',
  styleUrls: ['./new-covid-vaccine.component.sass']
})
export class NewCovidVaccineComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  CovidVaccineForm: FormGroup; 
  validationErrors: string[] = [];
  districtValues:SelectedModel[]; 
  selectedCovidVaccine:SelectedModel[]; 
  traineeId: string;

  constructor(private snackBar: MatSnackBar,private CovidVaccineService: CovidVaccineService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('covidVaccineId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Covid vaccine';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.CovidVaccineService.find(+id).subscribe(
        res => {
          this.CovidVaccineForm.patchValue({          
            covidVaccineId: res.covidVaccineId,
            traineeId: res.traineeId,
            date:res.date,
            vaccineName: res.vaccineName,
            place: res.place,
            noOfDose: res.noOfDose,
            remarks: res.remarks,
            menuPosition: res.menuPosition,
            isActive: res.isActive
          });         
          console.log("res");
          console.log(res); 
        }
      );
    } else {
      this.pageTitle = 'Create Covid Vaccine';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
  }
  intitializeForm() {
    this.CovidVaccineForm = this.fb.group({
      covidVaccineId: [0],
      traineeId: [this.traineeId],
      date: [''],
      vaccineName: [''],
      place: [''],
      noOfDose: [''],
      remarks: [''],
      menuPosition: [''],
      isActive: true
    })
  }

 
  
  onSubmit() {
    const id = this.CovidVaccineForm.get('covidVaccineId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.CovidVaccineService.update(+id,this.CovidVaccineForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/covidvaccine-details/'+this.traineeId);
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
      this.CovidVaccineService.submit(this.CovidVaccineForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/covidvaccine-details/'+this.traineeId);
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

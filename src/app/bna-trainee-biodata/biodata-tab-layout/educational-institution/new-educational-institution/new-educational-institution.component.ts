import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationalInstitutionService } from '../../service/EducationalInstitution.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';

@Component({
  selector: 'app-new-educational-institution',
  templateUrl: './new-educational-institution.component.html',
  styleUrls: ['./new-educational-institution.component.sass']
})
export class NewEducationalInstitutionComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  traineeId:  string;
  EducationalInstitutionForm: FormGroup;
  validationErrors: string[] = [];
  districtValues:SelectedModel[]; 
  selectedThana:SelectedModel[]; 

  constructor(private snackBar: MatSnackBar,private EducationalInstitutionService: EducationalInstitutionService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('educationalInstitutionId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Educational Institution';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.EducationalInstitutionService.find(+id).subscribe(
        res => {
          this.EducationalInstitutionForm.patchValue({          

            educationalInstitutionId: res.educationalInstitutionId,
            traineeId: res.traineeId,
            instituteName: res.instituteName,
            address: res.address,
            districtId: res.districtId,
            thanaId: res.thanaId,
            classStudiedFrom: res.classStudiedFrom,
            classStudiedTo: res.classStudiedTo,
            yearFrom: res.yearFrom,
            yearTo: res.yearTo,
            additionaInformation: res.additionaInformation,
            status: res.status,                        
         //   menuPosition: res.menuPosition,
          });    
          this.onDistrictSelectionChangeGetThana(res.districtId);      
        }
      );
    } else {
      this.pageTitle = 'Create Educational Institution';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getDistrict();
    //this.getThana();
  }
  intitializeForm() {
    this.EducationalInstitutionForm = this.fb.group({
      educationalInstitutionId: [0],
      traineeId: [this.traineeId, Validators.required],
      instituteName: ['', Validators.required],
      address: ['', Validators.required],
      districtId: ['', Validators.required],
      thanaId: ['', Validators.required],
      classStudiedFrom: ['', Validators.required],
      classStudiedTo: ['', Validators.required],
      yearFrom: ['', Validators.required],
      yearTo: ['', Validators.required],
      additionaInformation: [],
      status: ['2'],           
    //  menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  getDistrict(){
    this.EducationalInstitutionService.getselecteddistrict().subscribe(res=>{
      this.districtValues=res
      console.log(this.districtValues);
    });
  }

  // getThana(){
  //   this.EducationalInstitutionService.getselectedthana().subscribe(res=>{
  //     this.thanaValues=res
  //     console.log(this.thanaValues);
  //   });
  // }

  onDistrictSelectionChangeGetThana(districtId){
    this.EducationalInstitutionService.getthanaByDistrict(districtId).subscribe(res=>{
      this.selectedThana=res
      console.log(this.selectedThana);
    });
  }

  
  onSubmit() {
    const id = this.EducationalInstitutionForm.get('educationalInstitutionId').value;   
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This EducationalInstitution Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.EducationalInstitutionService.update(+id,this.EducationalInstitutionForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/educational-institution-details/'+this.traineeId);
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
      this.EducationalInstitutionService.submit(this.EducationalInstitutionForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/educational-institution-details/'+this.traineeId);
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

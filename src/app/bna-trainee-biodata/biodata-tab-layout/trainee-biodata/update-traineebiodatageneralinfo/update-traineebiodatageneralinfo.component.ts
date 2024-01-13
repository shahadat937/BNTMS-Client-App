import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { BIODataGeneralInfoService } from '../../service/BIODataGeneralInfo.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-update-BIODataGeneralInfo',
  templateUrl: './update-traineebiodatageneralinfo.component.html',
  styleUrls: ['./update-traineebiodatageneralinfo.component.sass']
  //providers:[BIODataGeneralInfoService]
})
export class UpdateTraineeBIODataGeneralInfoComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  traineeId:string;
  BIODataGeneralInfoForm: FormGroup;
  validationErrors: string[] = [];

  batchValues:SelectedModel[]; 
  rankValues:SelectedModel[]; 
  genderValues:SelectedModel[];
  divisionValues:SelectedModel[];
  branchValues:SelectedModel[];
  nationalityValues:SelectedModel[];
  heightValues:SelectedModel[]; 
  weightValues:SelectedModel[]; 
  colorOfEyeValues:SelectedModel[]; 
  bloodValues: SelectedModel[];
  religionValues: SelectedModel[];
  hairColorValues:SelectedModel[];
  selectedCastes:SelectedModel[];
  selectedDistrict:SelectedModel[];
  selectedThana:SelectedModel[];

  imageUrl:string="/assets/img/icon.png";
  public files: any[];

  constructor(private snackBar: MatSnackBar,private BIODataGeneralInfoService: BIODataGeneralInfoService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { 
    this.files = [];
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Update General Information';
      this.destination='Update';
      this.buttonText="Update";
 
      this.BIODataGeneralInfoService.find(+id).subscribe(
        res => {
          if (res) {
            this.BIODataGeneralInfoForm.patchValue(res);
          }  
          this.onDivisionSelectionChangeGetDistrict(res.divisionId);
          this.onDistrictSelectionChangeGetThana(res.districtId);
          this.onReligionSelectionChangeGetCastes(res.religionId);    
        }
      );
    } 
    this.intitializeForm();
    this.getBatchs();
    this.getRanks();
    this.getGenders();
    this.getDivisions();
    this.getBranch();
    this.getNationalitys();
    this.getselectedheight();
    this.getselectedweight();
    this.getselectedcolorofeye();
    this.getselectedbloodgroup();
    this.getreligions();
    this.gethaircolors();
  }

  getBatchs(){
    this.BIODataGeneralInfoService.getselectedbnabatch().subscribe(res=>{
      this.batchValues=res
    });
  }
  getreligions(){
    this.BIODataGeneralInfoService.getselectedreligion().subscribe(res=>{
      this.religionValues=res
    });
  }
  gethaircolors(){
    this.BIODataGeneralInfoService.getselectedhaircolor().subscribe(res=>{
      this.hairColorValues=res
    });
  }  

  getselectedheight(){
    this.BIODataGeneralInfoService.getselectedheight().subscribe(res=>{
      this.heightValues=res
    });
  }

  getselectedweight(){
    this.BIODataGeneralInfoService.getselectedweight().subscribe(res=>{
      this.weightValues=res
    });
  }

  getselectedcolorofeye(){
    this.BIODataGeneralInfoService.getselectedcolorofeye().subscribe(res=>{
      this.colorOfEyeValues=res
    });
  }

  getselectedbloodgroup(){
    this.BIODataGeneralInfoService.getselectedbloodgroup().subscribe(res=>{
      this.bloodValues=res
    });
  }

  getNationalitys(){
    this.BIODataGeneralInfoService.getselectednationality().subscribe(res=>{
      this.nationalityValues=res
    });
  }

  getBranch(){
    this.BIODataGeneralInfoService.getselectedbranch().subscribe(res=>{
      this.branchValues=res
    });
  }

  getRanks(){
    this.BIODataGeneralInfoService.getselectedrank().subscribe(res=>{
      this.rankValues=res
    });
  }

  getGenders(){
    this.BIODataGeneralInfoService.getselectedgender().subscribe(res=>{
      this.genderValues=res
    });
  }

  getDivisions(){
    this.BIODataGeneralInfoService.getselecteddivision().subscribe(res=>{
      this.divisionValues=res
    });
  }

  onDivisionSelectionChangeGetDistrict(divisionId){
    this.BIODataGeneralInfoService.getdistrictbydivision(divisionId).subscribe(res=>{
      this.selectedDistrict=res
      console.log(this.selectedDistrict);
    });
  }

  onReligionSelectionChangeGetCastes(religionId){
    this.BIODataGeneralInfoService.getcastebyreligion(religionId).subscribe(res=>{
      this.selectedCastes=res
      console.log(this.selectedCastes);
    });
  }

  onDistrictSelectionChangeGetThana(districtId){
    this.BIODataGeneralInfoService.getthanaByDistrict(districtId).subscribe(res=>{
      this.selectedThana=res
      console.log(this.selectedThana);
    });
   }

  // getMaritalStatus(){
  //   this.BIODataGeneralInfoService.getselectedMaritialStatus().subscribe(res=>{
  //     this.maritalValues=res
  //   });
  // }


  intitializeForm() {
    this.BIODataGeneralInfoForm = this.fb.group({
      traineeId: [0],
      bnaBatchId: ['', Validators.required],
      rankId: ['',Validators.required],
      branchId: ['',Validators.required],
      divisionId: ['',Validators.required],
      districtId: ['',Validators.required],
      thanaId: ['',Validators.required],
      heightId: ['',Validators.required],
      weightId: ['',Validators.required],
      colorOfEyeId: ['',Validators.required],
      genderId: ['',Validators.required],
      bloodGroupId: ['',Validators.required],
      nationalityId: ['',Validators.required],
      religionId: ['',Validators.required],
      casteId: ['',Validators.required],
      //maritalStatusId: [],
      hairColorId: [],
      traineeStatusId:['4'],
      name: ['',Validators.required],
      nameBangla: [''],
      mobile: [''],
      email: [''],
      bnaPhotoUrl: [''],
      //image: ['1.jpg'],
      bnaNo: ['',Validators.required],
      pno: ['',Validators.required],
      dateOfBirth: ['',Validators.required],
      joiningDate: ['',Validators.required],
      identificationMark: [''],
      presentAddress: [''],
      permanentAddress: [''],
      nid: ['',Validators.required],
      remarks: [''],
      
      isActive: [true],
    
    })
  }
  
  onSubmit() {

    this.traineeId = this.BIODataGeneralInfoForm.get('traineeId').value;   

    if (this.traineeId) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) {
          this.loading=true;
          this.BIODataGeneralInfoService.update(+this.traineeId,this.BIODataGeneralInfoForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/trainee-biodata-tab/main-tab-layout/main-tab/update-traineebiodatageneralinfo/'+this.traineeId);
            this.snackBar.open('Information Updated Successfully ', '', {
              duration: 3000,
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
  }

}

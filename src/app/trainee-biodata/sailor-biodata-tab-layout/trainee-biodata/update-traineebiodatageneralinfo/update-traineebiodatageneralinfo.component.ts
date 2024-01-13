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

  rankValues:SelectedModel[]; 
  genderValues:SelectedModel[];
  heightValues:SelectedModel[]; 
  weightValues:SelectedModel[]; 
  colorOfEyeValues:SelectedModel[]; 
  bloodValues: SelectedModel[];
  religionValues: SelectedModel[];
  casteValues:SelectedModel[];
  hairColorValues:SelectedModel[];
  maritialStatusValues:SelectedModel[];
  selectedCastes:SelectedModel[];

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
          this.onReligionSelectionChangeGetCastes(res.religionId);    
        }
      );
    } else {
      this.pageTitle = 'Create General Information';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getRanks();
    this.getGenders();
    this.getselectedheight();
    this.getselectedweight();
    this.getselectedcolorofeye();
    this.getselectedbloodgroup();
    this.getreligions();
    this.getselectedcaste();
    this.gethaircolors();
    this.getMaritialStatus();
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
  getselectedcaste(){
    this.BIODataGeneralInfoService.getselectedcaste().subscribe(res=>{
      this.casteValues=res
    
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


  getMaritialStatus(){
    this.BIODataGeneralInfoService.getselectedmaritialstatus().subscribe(res=>{
      this.maritialStatusValues=res
      console.log(res);
     
    });
  }

  onReligionSelectionChangeGetCastes(religionId){
    this.BIODataGeneralInfoService.getcastebyreligion(religionId).subscribe(res=>{
      this.selectedCastes=res
      console.log(this.selectedCastes);
    });
  } 


  intitializeForm() {
    this.BIODataGeneralInfoForm = this.fb.group({
      traineeId: [0],
      traineeStatusId: ['5'],
      rankId: [],
      heightId: [],
      weightId: [],
      colorOfEyeId: [],
      genderId: [],
      bloodGroupId: [],
      religionId: [],
      casteId: [],
      maritalStatusId: [],
      hairColorId: [],
      bnaPhotoUrl:[''],
      name: [''],
      nameBangla: [''],
      nickName: [''],
      localNo: [''],
      chestNo: [''],
      idCardNo: [''],
      shoeSize: [''],
      pantSize: [''],
      nominee: [''],
      closeRelative: [''],
      relativeRelation: [''],
      mobile: [''],
      email: [''],
      pno: [''],
      dateOfBirth: [''],
      identificationMark: [''],
      presentAddress: [''],
      permanentAddress: [''],
      passportNo: [''],
      nid: [''],
      remarks: [''],
      
      isActive: [true],
    
    })
  }
  
  onSubmit() {

    const id = this.BIODataGeneralInfoForm.get('traineeId').value;   

    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update  Item').subscribe(result => {
        if (result) {
          this.loading = true;
          this.BIODataGeneralInfoService.update(+id,this.BIODataGeneralInfoForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/sailor-biodata-tab/main-tab-layout/main-tab/update-traineebiodatageneralinfo/'+this.traineeId);
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

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BIODataGeneralInfoService } from 'src/app/trainee-biodata/biodata-tab-layout/service/BIODataGeneralInfo.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';

import { ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';
import { MasterData } from 'src/assets/data/master-data';
@Component({
  selector: 'app-new-profileupdate',
  templateUrl: './new-profileupdate.component.html',
  styleUrls: ['./new-profileupdate.component.sass']
})
export class NewProfileUpdateComponent implements OnInit {
  masterData = MasterData;
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
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
  selectedSaylorRank:SelectedModel[];
  selectedSaylorBranch:SelectedModel[];
  selectedSaylorSubBranch:SelectedModel[];
  selectedDistrict:SelectedModel[];
  selectedThana:SelectedModel[];
  maritialStatusValues:SelectedModel[];
  fileAttr = 'Choose File';
  imageUrl:string="/assets/img/icon.png";
  public files: any[];
  role:any;
  traineeId:any;
  rankId:any = 0;
  saylorRankId:any;
  traineeStatusId:any;

  constructor(private snackBar: MatSnackBar, private authService: AuthService,private BIODataGeneralInfoService: BIODataGeneralInfoService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { 
    this.files = [];
  }

  @ViewChild('labelImport')  labelImport: ElementRef;
  ngOnInit(): void {

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
   // console.log(this.role, this.traineeId)
    // const id = this.route.snapshot.paramMap.get('traineeId'); 
    const id = this.traineeId;
    
    console.log("traineeId");
    console.log(id)
    if (id) {
      this.pageTitle = 'Edit Officer BIO Data';
      this.destination='Edit';
      this.buttonText="Update";
 
      this.BIODataGeneralInfoService.find(+id).subscribe(
        res => {
          console.log(res);
          this.traineeStatusId = res.traineeStatusId;
          console.log(res.traineeStatusId);
          if (res) {
            this.BIODataGeneralInfoForm.patchValue(res);
          }  
          this.rankId = res.rankId; 
          this.saylorRankId = res.saylorRankId; 
          // this.onDivisionSelectionChangeGetDistrict(res.divisionId);
          // this.onDistrictSelectionChangeGetThana(res.districtId);
          // this.onReligionSelectionChangeGetCastes(res.religionId);
          if(this.saylorRankId){
            this.getselectedSaylorRank();
            this.getselectedSaylorBranch();
            this.onBranchSelectionChangegetSubBranch(res.saylorBranchId);
          }
          
        }
      );
    } else {
      this.pageTitle = 'Create Officer BIO Data';
      this.destination='Add';
      this.buttonText="Save";
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
    this.getMaritialStatus();
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
  getselectedSaylorRank(){
    this.BIODataGeneralInfoService.getselectedSaylorRank().subscribe(res=>{
      this.selectedSaylorRank=res
      console.log(res);
     
    });
  }
  getselectedSaylorBranch(){
    this.BIODataGeneralInfoService.getselectedSaylorBranch().subscribe(res=>{
      this.selectedSaylorBranch=res
      console.log(res);
     
    });
  }
  onBranchSelectionChangegetSubBranch(saylorBranchId){
    var saylorBranchId
    this.BIODataGeneralInfoService.getselectedSaylorSubBranch(saylorBranchId).subscribe(res=>{
      this.selectedSaylorSubBranch=res
      console.log(res);
     
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

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
     console.log(file);
      this.BIODataGeneralInfoForm.patchValue({
        image: file,
      });
    }
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

  onDistrictSelectionChangeGetThana(districtId){
    this.BIODataGeneralInfoService.getthanaByDistrict(districtId).subscribe(res=>{
      this.selectedThana=res
      console.log(this.selectedThana);
    });
  }

  onReligionSelectionChangeGetCastes(religionId){
    this.BIODataGeneralInfoService.getcastebyreligion(religionId).subscribe(res=>{
      this.selectedCastes=res
      console.log(this.selectedCastes);
    });
  } 


  intitializeForm() {
    let now = new Date();
    console.log("trainee type"+this.traineeStatusId);
      this.BIODataGeneralInfoForm = this.fb.group({
        traineeId: [0],
        bnaBatchId: [],
        rankId: [],
        saylorRankId: [],
        branchId: [],
        countryId: [],
        divisionId: [],
        districtId: [],
        thanaId: [],
        heightId: [],
        weightId: [],
        colorOfEyeId: [],
        genderId: [],
        bloodGroupId: [],
        maritalStatusId: [],
        nationalityId: [],
        religionId: [],
        casteId: [],
        officerTypeId:[],
        hairColorId: [],
        traineeStatusId:[],
        name: [''],
        nameBangla: [''],
        mobile: [''],
        fileAttr:[],
        email: [''],
        bnaPhotoUrl: [''],
        image: [''],
        bnaNo: [''],
        shortCode:[''],
        presentBillet:[''],
        pno: [''],
        dateOfBirth: [now],
        joiningDate: [now],
        identificationMark: [''],
        presentAddress: [''],
        permanentAddress: [''],
        nid: [''],
        remarks: [''],
        isActive: [true],
        localNominationStatus:[],
        saylorBranchId:[''],
        saylorSubBranchId:[''],
        nickName: [''],
        localNo: [''],
        chestNo: [''],
        idCardNo: [''],
        shoeSize: [''],
        pantSize: [''],
        nominee: [''],
        closeRelative: [''],
        relativeRelation: [''],
        passportNo: [''],
      })
    
  }

  getMaritialStatus(){
    this.BIODataGeneralInfoService.getselectedmaritialstatus().subscribe(res=>{
      this.maritialStatusValues=res
      console.log(res);
     
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {

    const id = this.BIODataGeneralInfoForm.get('traineeId').value; 

    this.BIODataGeneralInfoForm.get('dateOfBirth').setValue((new Date(this.BIODataGeneralInfoForm.get('dateOfBirth').value)).toUTCString()) ;
    this.BIODataGeneralInfoForm.get('joiningDate').setValue((new Date(this.BIODataGeneralInfoForm.get('joiningDate').value)).toUTCString()) ;

    var traineeStatusId = this.BIODataGeneralInfoForm.get('traineeStatusId').value; 
    console.log(traineeStatusId);
    if(traineeStatusId == this.masterData.TraineeStatus.sailor){
      this.BIODataGeneralInfoForm.get('bnaBatchId').setValue(282);
      this.BIODataGeneralInfoForm.get('branchId').setValue(17);
      this.BIODataGeneralInfoForm.get('countryId').setValue(217);
      this.BIODataGeneralInfoForm.get('districtId').setValue(1105);
      this.BIODataGeneralInfoForm.get('divisionId').setValue(1033);
      this.BIODataGeneralInfoForm.get('nationalityId').setValue(25);
      this.BIODataGeneralInfoForm.get('officerTypeId').setValue(1);
      this.BIODataGeneralInfoForm.get('rankId').setValue(23);
      this.BIODataGeneralInfoForm.get('thanaId').setValue(504);
    }
    else if(traineeStatusId == this.masterData.TraineeStatus.civil){
      this.BIODataGeneralInfoForm.get('bnaBatchId').setValue(282);
      this.BIODataGeneralInfoForm.get('branchId').setValue(17);
      this.BIODataGeneralInfoForm.get('countryId').setValue(217);
      this.BIODataGeneralInfoForm.get('districtId').setValue(1105);
      this.BIODataGeneralInfoForm.get('divisionId').setValue(1033);
      this.BIODataGeneralInfoForm.get('nationalityId').setValue(25);
      this.BIODataGeneralInfoForm.get('officerTypeId').setValue(3);
      this.BIODataGeneralInfoForm.get('rankId').setValue(23);
      this.BIODataGeneralInfoForm.get('thanaId').setValue(504);
      //this.BIODataGeneralInfoForm.get('localNominationStatus').setValue(0);
      this.BIODataGeneralInfoForm.get('bloodGroupId').setValue(26);
      this.BIODataGeneralInfoForm.get('religionId').setValue(12);
      this.BIODataGeneralInfoForm.get('casteId').setValue(1051);
      this.BIODataGeneralInfoForm.get('colorOfEyeId').setValue(1010);
      this.BIODataGeneralInfoForm.get('hairColorId').setValue(1006);
      this.BIODataGeneralInfoForm.get('heightId').setValue(26);
      this.BIODataGeneralInfoForm.get('maritalStatusId').setValue(14);
      this.BIODataGeneralInfoForm.get('saylorBranchId').setValue(20);
      this.BIODataGeneralInfoForm.get('saylorRankId').setValue(1011);
      this.BIODataGeneralInfoForm.get('saylorSubBranchId').setValue(23);
      this.BIODataGeneralInfoForm.get('weightId').setValue(1059);
    }

    else if(traineeStatusId == this.masterData.TraineeStatus.officer){
      this.BIODataGeneralInfoForm.get('saylorRankId').setValue(1011);
      this.BIODataGeneralInfoForm.get('saylorSubBranchId').setValue(23);
      this.BIODataGeneralInfoForm.get('countryId').setValue(217);
      this.BIODataGeneralInfoForm.get('saylorBranchId').setValue(20);
   }

    const formData = new FormData();
    for (const key of Object.keys(this.BIODataGeneralInfoForm.value)) {
      const value = this.BIODataGeneralInfoForm.value[key];
      formData.append(key, value);
    }
    console.log(this.BIODataGeneralInfoForm.value)

    if (id) {
      
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update  Item').subscribe(result => {
        if (result) {
          this.loading = true;
          this.BIODataGeneralInfoService.update(+id,formData).subscribe(response => {
            this.router.navigateByUrl('/instructor/profile-update');
            this.reloadCurrentRoute();
            this.snackBar.open('Information Updated Successfully ', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
          })
        }
      })
    }else {
      this.loading = true;
      this.BIODataGeneralInfoService.submit(formData).subscribe(response => {
        this.router.navigateByUrl('/instructor/profile-update');
        this.reloadCurrentRoute();
        this.snackBar.open('Information Inserted Successfully ', '', {
          duration: 3000,
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

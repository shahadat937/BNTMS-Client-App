import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { BIODataGeneralInfoService } from '../../service/BIODataGeneralInfo.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MasterData } from 'src/assets/data/master-data';
 
@Component({
  selector: 'app-new-BIODataGeneralInfo',
  templateUrl: './new-biodata-general-info.component.html',
  styleUrls: ['./new-biodata-general-info.component.sass']
  //providers:[BIODataGeneralInfoService]
})
export class NewBIODataGeneralInfoComponent implements OnInit {
  masterData = MasterData;
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  BIODataGeneralInfoForm: FormGroup;
  validationErrors: string[] = [];
  rankValues:SelectedModel[]; 
  selectedSaylorBranch:SelectedModel[]; 
  selectedSaylorRank:SelectedModel[];
  selectedSaylorSubBranch:SelectedModel[];
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
      this.pageTitle = 'Edit Sailor BIO Data';
      this.destination='Edit';
      this.buttonText="Update";
 
      this.BIODataGeneralInfoService.find(+id).subscribe(
        res => {
          console.log("update res");
          console.log(res);
          if (res) {
            this.BIODataGeneralInfoForm.patchValue(res);
          }  
          this.onReligionSelectionChangeGetCastes(res.religionId);  
          this.onBranchSelectionChangegetSubBranch(res.saylorBranchId)  
        }
      );
    } else {
      this.pageTitle = 'Create Sailor BIO Data';
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
    this.getselectedSaylorBranch();
    this.getselectedSaylorRank();
    //this.getselectedSaylorSubBranch();
  }

  onFileChanged(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.labelImport.nativeElement.value = file.name;
     console.log(file);
    // this.BIODataGeneralInfoForm.controls["picture"].setValue(event.target.files[0]);
      this.BIODataGeneralInfoForm.patchValue({
        image: file,
      });
    }
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
  getselectedSaylorBranch(){
    this.BIODataGeneralInfoService.getselectedSaylorBranch().subscribe(res=>{
      this.selectedSaylorBranch=res
      console.log(res);
     
    });
  }
  getselectedSaylorRank(){
    this.BIODataGeneralInfoService.getselectedSaylorRank().subscribe(res=>{
      this.selectedSaylorRank=res
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
      //rankId: [],
      heightId: [''],
      weightId: [''],
      colorOfEyeId: [],
      genderId: [],
      bloodGroupId: [],
      religionId: [],
      saylorBranchId:[''],
      saylorRankId:[''],
      saylorSubBranchId:[''],
      casteId: [],
      maritalStatusId: [],
      hairColorId: [],
      bnaPhotoUrl:[''],
      image: [''],
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
      joiningDate: [],
      identificationMark: [''],
      presentAddress: [''],
      permanentAddress: [''],
      passportNo: [''],
      nid: [''],
      remarks: [''],
      localNominationStatus:[0],
      isActive: [true],

      // traineeId:[],
      //bnaBatchId:[],
      //rankId:[],
      //branchId:[],
      //divisionId:[],
      //districtId:[],
      //thanaId:[],
      // heightId:[],
      // weightId:[],
      // colorOfEyeId:[],
      // genderId:[],
      // bloodGroupId:[],
      //nationalityId:[],
       //countryId:[],    // countryId = 1 for Bangladesh
      // religionId:[],
      // casteId:[],
      // maritalStatusId:[''],
      // hairColorId:[],
      //officerTypeId:[],
      // saylorBranchId:[''],
      // saylorRankId:[''],
      // saylorSubBranchId:[''],
      // name:[],
      // nickName:[],
      // nameBangla:[],
      // chestNo:[],
      // localNo :[],
      // idCardNo:[],
      // shoeSize:[],
      // pantSize:[],
      // nominee:[],
      // closeRelative:[],
      // relativeRelation:[],
      // mobile:[],
      // email:[],
      // bnaPhotoUrl:[],
      bnaNo:[],
      // pno:[],
      shortCode:[],
      presentBillet:[],
      // dateOfBirth:[],
      // joiningDate:[],
      // identificationMark:[],
      // presentAddress:[],
      // permanentAddress:[],
      // traineeStatusId:[],
      // passportNo:[],
      // nid:[],
      // remarks :[],
      // menuPosition :[],
      // isActive :[],
      // localNominationStatus:[],
    
    })
  }
  
  onSubmit() {

    const id = this.BIODataGeneralInfoForm.get('traineeId').value; 

    this.BIODataGeneralInfoForm.get('dateOfBirth').setValue((new Date(this.BIODataGeneralInfoForm.get('dateOfBirth').value)).toUTCString()) ;
    this.BIODataGeneralInfoForm.get('joiningDate').setValue((new Date(this.BIODataGeneralInfoForm.get('joiningDate').value)).toUTCString()) ;
    
    var traineeStatusId = this.BIODataGeneralInfoForm.get('traineeStatusId').value; 
    console.log(traineeStatusId);
    if(traineeStatusId == this.masterData.TraineeStatus.sailor){
      // this.BIODataGeneralInfoForm.get('bnaBatchId').setValue(282);
      // this.BIODataGeneralInfoForm.get('branchId').setValue(17);
      // this.BIODataGeneralInfoForm.get('countryId').setValue(217);
      // this.BIODataGeneralInfoForm.get('districtId').setValue(1105);
      // this.BIODataGeneralInfoForm.get('divisionId').setValue(1033);
      // this.BIODataGeneralInfoForm.get('nationalityId').setValue(25);
      // this.BIODataGeneralInfoForm.get('officerTypeId').setValue(1);
      // this.BIODataGeneralInfoForm.get('rankId').setValue("NULL");
      // this.BIODataGeneralInfoForm.get('thanaId').setValue(504);
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
            this.router.navigateByUrl('/trainee-biodata/sailor-biodata-tab/biodata-general-Info-list');
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
    }else {
      this.loading = true;
      this.BIODataGeneralInfoService.submit(formData).subscribe(response => {
        this.router.navigateByUrl('/trainee-biodata/sailor-biodata-tab/biodata-general-Info-list');
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

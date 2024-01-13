import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../app/core/service/confirm.service';
import { BIODataGeneralInfoService } from '../../service/BIODataGeneralInfo.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { AuthService } from 'src/app/core/service/auth.service';

import { ViewChild, ElementRef } from '@angular/core';
import { Role } from 'src/app/core/models/role';
@Component({
  selector: 'app-new-BIODataGeneralInfos',
  templateUrl: './new-biodata-general-infos.component.html',
  styleUrls: ['./new-biodata-general-infos.component.sass']
  //providers:[BIODataGeneralInfoService]
})
export class NewBIODataGeneralInfosComponent implements OnInit {
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
  selectedDistrict:SelectedModel[];
  selectedThana:SelectedModel[];
  role:any;
  userId:any;
  traineeId:any;
  fileAttr = 'Choose File';
  imageUrl:string="/assets/img/icon.png";
  public files: any[];
  userRole = Role;

  constructor(private snackBar: MatSnackBar,private authService: AuthService,private BIODataGeneralInfoService: BIODataGeneralInfoService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { 
    this.files = [];
  }

  @ViewChild('labelImport')  labelImport: ElementRef;
  ngOnInit(): void {
    this.role = this.authService.currentUserValue.role.trim();
    this.userId=this.authService.currentUserValue.id;
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    console.log(this.role, this.traineeId)

    const id = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Officer BIO Data';
      this.destination='Edit';
      this.buttonText="Update";
 
      this.BIODataGeneralInfoService.find(+id).subscribe(
        res => {
          console.log(res);
          if (res) {
            this.BIODataGeneralInfoForm.patchValue(res);
          }   
          this.onDivisionSelectionChangeGetDistrict(res.divisionId);
          this.onDistrictSelectionChangeGetThana(res.districtId);
          this.onReligionSelectionChangeGetCastes(res.religionId);

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

  // getMaritalStatus(){
  //   this.BIODataGeneralInfoService.getselectedMaritialStatus().subscribe(res=>{
  //     this.maritalValues=res
  //   });
  // }

  // uploadFileEvt(imgFile: any) {
  //   if (imgFile.target.files && imgFile.target.files[0]) {
  //     this.fileAttr = '';
  //     Array.from(imgFile.target.files).forEach((file: any) => {
  //       this.fileAttr += file.name + ' - ';
  //     });
  //     const file = imgFile.target.files[0].name;
  //     // this.labelImport.nativeElement.innerText = file.name;
  //     console.log(file);
  //     this.BIODataGeneralInfoForm.patchValue({
  //       image: file,
  //     });
  //     // HTML5 FileReader API
  //     // let reader = new FileReader();
  //     // reader.onload = (e: any) => {
  //     //   let image = new Image();
  //     //   image.src = e.target.result;
  //     //   image.onload = (rs) => {
  //     //     let imgBase64Path = e.target.result;
  //     //   };
  //     // };
  //     // reader.readAsDataURL(imgFile.target.files[0]);
  //     // // Reset if duplicate image uploaded again
  //      this.fileInput.nativeElement.value = '';
  //   } else {
  //     this.fileAttr = 'Choose File';
  //   }
  // }

  intitializeForm() {
    let now = new Date();
    this.BIODataGeneralInfoForm = this.fb.group({
      traineeId: [0],
      bnaBatchId: ['', Validators.required],
      rankId: ['',Validators.required],
      branchId: ['',Validators.required],
      divisionId: [''],
      districtId: [''],
      thanaId: [''],
      countryId:[''],
      heightId: ['',Validators.required],
      weightId: ['',Validators.required],
      colorOfEyeId: ['',Validators.required],
      genderId: ['',Validators.required],
      bloodGroupId: ['',Validators.required],
      //nationalityId: [''],
      religionId: ['',Validators.required],
      casteId: ['',Validators.required],
      //maritalStatusId: [],
      hairColorId: [],
      officerTypeId: [],
      traineeStatusId:['4'],
      name: ['',Validators.required],
      nameBangla: [''],
      mobile: [''],
      fileAttr:[],
      email: [''],
      bnaPhotoUrl: [''],
      image: [''],
      bnaNo: [''],
      pno: ['',Validators.required],
      shortCode:[''],
      presentBillet:[''],
      dateOfBirth: [now,Validators.required],
      joiningDate: [now,Validators.required],
      identificationMark: [''],
      presentAddress: [''],
      permanentAddress: [''],
      nid: ['',Validators.required],
      localNominationStatus:[],
      remarks: [''],
      
      seniority:[''],
      place:[''],
      medicalCategory:[''],
      marriedDate:[now],
      familyLocation:[''],
      nameofWife:[''],
      bankAccount:[''],
      emergencyCommunicatePerson:[''],
      countryVisited:[''],
      dislikeness:[''],
      likeness:[''],
      hobbies:[''],
      sports:[''],
      isActive: [true],
    
    })
  }
  
  onSubmit() {

    const id = this.BIODataGeneralInfoForm.get('traineeId').value; 

    this.BIODataGeneralInfoForm.get('dateOfBirth').setValue((new Date(this.BIODataGeneralInfoForm.get('dateOfBirth').value)).toUTCString()) ;
    this.BIODataGeneralInfoForm.get('joiningDate').setValue((new Date(this.BIODataGeneralInfoForm.get('joiningDate').value)).toUTCString()) ;
    this.BIODataGeneralInfoForm.get('marriedDate').setValue((new Date(this.BIODataGeneralInfoForm.get('marriedDate').value)).toUTCString()) ;

    

    const formData = new FormData();
    for (const key of Object.keys(this.BIODataGeneralInfoForm.value)) {
      const value = this.BIODataGeneralInfoForm.value[key];
      formData.append(key, value);
    }
    console.log(this.BIODataGeneralInfoForm.value)
    console.log(formData)

    // if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update  Item').subscribe(result => {
        if (result) {
          this.loading = true;
          this.BIODataGeneralInfoService.update(+id,formData).subscribe(response => {
            this.router.navigateByUrl('/trainee-biodata/traineeprofile-update-list');
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
    // }else {

    //   this.BIODataGeneralInfoService.submit(formData).subscribe(response => {
    //     this.router.navigateByUrl('/trainee-biodata/trainee-biodata-tab/biodata-general-Info-list');

    //     this.snackBar.open('Information Inserted Successfully ', '', {
    //       duration: 3000,
    //       verticalPosition: 'bottom',
    //       horizontalPosition: 'right',
    //       panelClass: 'snackbar-success'
    //     });
    //   }, error => {
    //     this.validationErrors = error;
    //   })
    // }
  }

}

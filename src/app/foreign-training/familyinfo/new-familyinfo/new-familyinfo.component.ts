import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { FamilyInfoService } from '../../service/familyinfo.service';
import { MasterData } from 'src/assets/data/master-data';
import { FamilyInfo } from '../../models/familyinfo';
import { BIODataGeneralInfoService } from 'src/app/trainee-biodata/biodata-tab-layout/service/BIODataGeneralInfo.service';
//import { BIODataGeneralInfoService } from '../../';

@Component({
  selector: 'app-new-familyinfo',
  templateUrl: './new-familyinfo.component.html',
  styleUrls: ['./new-familyinfo.component.sass']
})
export class NewFamilyInfoComponent implements OnInit {
  buttonText: string;
  pageTitle: string;
   masterData = MasterData;
  loading = false;
  destination: string;
  FamilyInfoForm: FormGroup;
  validationErrors: string[] = [];
  //courseTypeId:19;
  genderValues: SelectedModel[];
  divisionValues: SelectedModel[];
  selectedDistrict: SelectedModel[];
  selectedThana: SelectedModel[];
  religionValues: SelectedModel[];
  selectedCastes: SelectedModel[];
  nationalityValues: SelectedModel[];
  isShown: boolean = false;
  selectedRelation: SelectedModel[];
  traineeId: number;
  familyInfoList: FamilyInfo[];


  options = [];
  filteredOptions;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }

  displayedColumns: string[] = ['sl', 'traineePNo', 'fullName', 'relationType', 'actions'];
  constructor(private snackBar: MatSnackBar, private BIODataGeneralInfoService: BIODataGeneralInfoService, private FamilyInfoService: FamilyInfoService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('familyInfoId');

    if (id) {
      this.pageTitle = 'Edit Family Info';
      this.destination = 'Edit';
      this.buttonText = "Update";
      this.FamilyInfoService.find(+id).subscribe(
        res => {
          this.FamilyInfoForm.patchValue({

            familyInfoId: res.familyInfoId,
            traineeId: res.traineeId,
            relationTypeId: res.relationTypeId,
            religionId: res.religionId,
            casteId: res.casteId,
            genderId: res.genderId,
            divisionId: res.divisionId,
            districtId: res.districtId,
            thanaId: res.thanaId,
            nationalityId: res.nationalityId,
            dateOfBirth: res.dateOfBirth,
            fullName: res.fullName,
            nid: res.nid,
            passport: res.passport,
            mobile: res.mobile,
            email: res.email,
            presentAddress: res.presentAddress,
            permanentAddress: res.permanentAddress,
            remarks: res.remarks,
            pno: res.traineePNo,


          });
          this.traineeId = res.traineeId;
          this.onDivisionSelectionChangeGetDistrict(res.divisionId);
          this.onDistrictSelectionChangeGetThana(res.districtId);
          //this.onReligionSelectionChangeGetCastes(res.religionId);

        }
      );
    } else {
      this.pageTitle = 'Create Family Info';
      this.destination = 'Add';
      this.buttonText = "Save";
    }
    this.intitializeForm();
    this.getDivisions();
    this.getGenders();
    this.getreligions();
    this.getNationalitys();
    //this.getselectedPno(); 
    this.getselectedrelationTypes();
    //this.getSelectedPno();

  }
  intitializeForm() {
    this.FamilyInfoForm = this.fb.group({
      familyInfoId: [0],
      traineeId: [],
      pno: [''],
      relationTypeId: [],
      religionId: [],
      casteId: [],
      genderId: [],
      divisionId: [],
      districtId: [],
      thanaId: [],
      nationalityId: [],
      dateOfBirth: [''],
      fullName: [''],
      nid: [''],
      passport: [''],
      mobile: [''],
      email: [''],
      presentAddress: [''],
      permanentAddress: [''],
      remarks: [''],
      isActive: [true],

    })
    //autocomplete for pno
    this.FamilyInfoForm.get('pno').valueChanges
      .subscribe(value => {
        this.getSelectedPno(value);
      })
  }
  //autocomplete for pno
  onTraineePnoSelectionChanged(item) {
    console.log(item.value);
    this.traineeId = item.value;
    this.FamilyInfoForm.get('traineeId').setValue(item.value);
    this.FamilyInfoForm.get('pno').setValue(item.text);
  }
  //autocomplete  Pno
  getSelectedPno(pno) {
    this.BIODataGeneralInfoService.getSelectedPno(pno).subscribe(response => {
      this.onPnoSelectionChanged(pno) //SelectionChanged Show List
      this.options = response;
      this.filteredOptions = response;
    })
  }
  onPnoSelectionChanged(item) {
    this.isShown=true;
    this.traineeId = item.value
    this.FamilyInfoService.getfamilyInfoListByPno(this.traineeId).subscribe(res => {
      this.familyInfoList = res;
      console.log(this.familyInfoList);
    })
  }
  getDivisions() {
    this.FamilyInfoService.getselecteddivision().subscribe(res => {
      this.divisionValues = res
    });
  }
  getGenders() {
    this.FamilyInfoService.getselectedgender().subscribe(res => {
      this.genderValues = res
    });
  }
  onDivisionSelectionChangeGetDistrict(divisionId) {
    this.FamilyInfoService.getdistrictbydivision(divisionId).subscribe(res => {
      this.selectedDistrict = res
      console.log(this.selectedDistrict);
    });
  }
  onDistrictSelectionChangeGetThana(districtId) {
    this.FamilyInfoService.getthanaByDistrict(districtId).subscribe(res => {
      this.selectedThana = res
      console.log(this.selectedThana);
    });
  }
  getreligions() {
    this.FamilyInfoService.getselectedreligion().subscribe(res => {
      this.religionValues = res
    });
  }
  
  getNationalitys() {
    this.FamilyInfoService.getselectednationality().subscribe(res => {
      this.nationalityValues = res
    });
  }

  
  getselectedrelationTypes() {
    this.FamilyInfoService.getselectedrelationTypes().subscribe(res => {
      this.selectedRelation = res
      console.log(this.selectedRelation);
    });
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  onSubmit() {
    const id = this.FamilyInfoForm.get('familyInfoId').value;
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.FamilyInfoService.update(+id, this.FamilyInfoForm.value).subscribe(response => {
            this.router.navigateByUrl('/foreign-training/add-familyinfo');
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
      this.FamilyInfoService.submit(this.FamilyInfoForm.value).subscribe(response => {
        //this.router.navigateByUrl('/foreign-training/add-familyinfo');
        this.reloadCurrentRoute();
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
  deleteItem(row) {
    const id = row.familyInfoId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.FamilyInfoService.delete(id).subscribe(() => {
          //this.getFamilyInfos();
          this.reloadCurrentRoute();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })
    
  }
}

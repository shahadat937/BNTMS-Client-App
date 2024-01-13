import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseNameService } from '../../service/BaseName.service';
import { AdminAuthorityService } from '../../service/AdminAuthority.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-new-basename',
  templateUrl: './new-basename.component.html',
  styleUrls: ['./new-basename.component.sass']
})
export class NewBaseNameComponent implements OnInit {
  pageTitle: string;
  loading = false;
  destination:string;
  btnText:string;
  BaseNameForm: FormGroup;
  validationErrors: string[] = [];
  selectedDivision:SelectedModel[]; 
  selectedDistrict:SelectedModel[];
  selectedAdminAuthority:SelectedModel[]; 
  selectedForceType:SelectedModel[]; 
  districtByDivisionId:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private AdminAuthorityService:AdminAuthorityService,private confirmService: ConfirmService,private BaseNameService: BaseNameService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('baseNameId'); 
    if (id) {
      this.pageTitle = 'Edit Base Name'; 
      this.destination = "Edit";
      this.btnText = 'Update';
      this.BaseNameService.find(+id).subscribe(
        res => {
          this.BaseNameForm.patchValue({          

            baseNameId: res.baseNameId,
            adminAuthorityId: res.adminAuthorityId,
            divisionId: res.divisionId,
            districtId:res.districtId,
            shortName:res.shortName,
            forceTypeId:res.forceTypeId,
            baseNames: res.baseNames,
            baseLogo: res.baseLogo,
          });          
          this.onDivisionSelectionChangeGetDistrict(res.divisionId)
        }
      );
    } else {
      this.pageTitle = 'Create BaseName';
      this.destination = "Add";
      this.btnText = 'Save';
    }
    this.intitializeForm();
    this.getSelectedDistrict();
    this.getDivisionName();
    this.getAdminAuthorityName();
    this.getselectedforcetype();
  }
  intitializeForm() {
    this.BaseNameForm = this.fb.group({
      baseNameId: [0],
      adminAuthorityId: ['', Validators.required],      
      divisionId: ['', Validators.required],
      baseNames: ['', Validators.required],
      baseLogo: [''],
      districtId:[''],
      shortName:[''],
      //status: [''],
      forceTypeId:[''],
      //menuPosition: ['', Validators.required],
      isActive: [true],
    
    })
  }

  onDivisionSelectionChangeGetDistrict(baseSchoolNameId){
    this.BaseNameService.getSelectedDistrictByDivision(baseSchoolNameId).subscribe(res=>{
      this.districtByDivisionId=res;
      console.log(this.districtByDivisionId); 
   })
  } 

  getSelectedDistrict(){
    this.BaseNameService.getSelectedDistrict().subscribe(res=>{
      this.selectedDistrict=res
     // console.log(this.selectedDistrict);
    });
  }
  getDivisionName(){
    this.BaseNameService.getselecteddivision().subscribe(res=>{
      this.selectedDivision=res
     // console.log(this.selectedDivision);
    });
  }

  getselectedforcetype(){
    this.BaseNameService.getselectedforcetype().subscribe(res=>{
      this.selectedForceType=res
    //  console.log(this.selectedForceType);
    });
  }

  getAdminAuthorityName(){
    this.AdminAuthorityService.getselectedAdminAuthorities().subscribe(res=>{
      this.selectedAdminAuthority=res
   //   console.log(this.selectedAdminAuthority);
    });
  }
  
  onSubmit() {
    const id = this.BaseNameForm.get('baseNameId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item').subscribe(result => {
        
        if (result) {
          this.loading=true;
          this.BaseNameService.update(+id,this.BaseNameForm.value).subscribe(response => {
            this.router.navigateByUrl('/basic-setup/basename-list');
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
      this.BaseNameService.submit(this.BaseNameForm.value).subscribe(response => {
        this.router.navigateByUrl('/basic-setup/basename-list');
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

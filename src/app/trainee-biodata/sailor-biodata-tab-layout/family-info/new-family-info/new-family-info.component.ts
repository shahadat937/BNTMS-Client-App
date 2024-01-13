import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParentRelativeService } from '../../service/ParentRelative.service';
import { SelectedModel } from '../../../../core/models/selectedModel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../../core/service/confirm.service';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';

@Component({
  selector: 'app-new-family-info',
  templateUrl: './new-family-info.component.html',
  styleUrls: ['./new-family-info.component.sass']
})
export class NewParentRelativeComponent implements OnInit {
  buttonText:string;
   masterData = MasterData;
  loading = false;
  pageTitle: string;
  traineeId:  string;
  destination:string;
  ParentRelativeForm: FormGroup;
  validationErrors: string[] = [];
  relationTypeValues:SelectedModel[]; 
  maritialStatusValues:SelectedModel[]; 
  nationalityValues:SelectedModel[]; 
  religionValues:SelectedModel[]; 
  casteValues:SelectedModel[]; 
  occupationValues:SelectedModel[]; 
  divisionValues:SelectedModel[]; 
  districtValues:SelectedModel[]; 
  thanaValues:SelectedModel[]; 
  defenseTypeValues:SelectedModel[]; 
  rankValues:SelectedModel[]; 
  selectedDeadStatus:SelectedModel[];


  nationalityToggle:string;
  defenseToggle:string;

  defensehidevalue:string;

  constructor(private snackBar: MatSnackBar,private CodeValueService: CodeValueService,private ParentRelativeService: ParentRelativeService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('parentRelativeId'); 
    this.traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    if (id) {
      this.pageTitle = 'Edit Family Information';
      this.destination = "Edit";
      this.buttonText= "Update"
      this.ParentRelativeService.find(+id).subscribe(
        res => {
          this.ParentRelativeForm.patchValue({          

            parentRelativeId: res.parentRelativeId,
            traineeId: res.traineeId,
            relationTypeId: res.relationTypeId,
            nameInFull: res.nameInFull,
            
            deadStatus: res.deadStatus,
                       
            occupationId: res.occupationId,   
              
            mobile: res.mobile,   
             
            //   menuPosition: res.menuPosition,
            isActive: res.isActive, 
             
          });  
          
        }
        
      );
    } else {
      this.pageTitle = 'Create Family Information';
      this.destination = "Add";
      this.buttonText= "Save"
    }
    this.intitializeForm();
    this.getRelationType();
    this.getMaritialStatus();
    this.getNationality();
    this.getReligion();
    this.getCaste();
    this.getOccupation();
    this.getDivision();
    this.getDistrict();
    this.getThana();
    this.getDefenseType();
    this.getRank();
    this.getSelectedDeadStatus();
  }
  intitializeForm() {
    this.ParentRelativeForm = this.fb.group({
      
      parentRelativeId: [0],
      traineeId: [this.traineeId, Validators.required],
      relationTypeId: ['', Validators.required],
      nameInFull: ['', Validators.required],
      
      deadStatus: [''],
                
      occupationId: ['', Validators.required],  
       
      mobile: [''],  
    
      //   menuPosition: res.menuPosition,
      isActive: [true],
    
    })
  }



  changeNationality(e) {
    
    this.nationalityToggle=e.value;
  }

  changedefenseExperience(e) {
    this.defenseToggle=e.value;
  }

  getRelationType(){
    this.ParentRelativeService.getselectedrelationtype().subscribe(res=>{
      this.relationTypeValues=res
    });
  }

  getMaritialStatus(){
    this.ParentRelativeService.getselectedmaritialstatus().subscribe(res=>{
      this.maritialStatusValues=res
    });
  }

  getNationality(){
    this.ParentRelativeService.getselectednationality().subscribe(res=>{
      this.nationalityValues=res
    });
  }

  getReligion(){
    this.ParentRelativeService.getselectedreligion().subscribe(res=>{
      this.religionValues=res
    });
  }

  getCaste(){
    this.ParentRelativeService.getselectedcaste().subscribe(res=>{
      this.casteValues=res
    });
  }

  getOccupation(){
    this.ParentRelativeService.getselectedoccupation().subscribe(res=>{
      this.occupationValues=res
    });
  }

  getDivision(){
    this.ParentRelativeService.getselecteddivision().subscribe(res=>{
      this.divisionValues=res
    });
  }

  getDistrict(){
    this.ParentRelativeService.getselecteddistrict().subscribe(res=>{
      this.districtValues=res
    });
  }

  getThana(){
    this.ParentRelativeService.getselectedthana().subscribe(res=>{
      this.thanaValues=res
    });
  }

  getDefenseType(){
    this.ParentRelativeService.getselecteddefensetype().subscribe(res=>{
      this.defenseTypeValues=res
    });
  }

  getRank(){
    this.ParentRelativeService.getselectedrank().subscribe(res=>{
      this.rankValues=res
    });
  }

  getSelectedDeadStatus(){
    
    this.CodeValueService.getSelectedCodeValueByType(this.masterData.codevaluetype.DeadStatus).subscribe(res=>{
      this.selectedDeadStatus=res;      
    })
  }
  
  onSubmit() {
    const id = this.ParentRelativeForm.get('parentRelativeId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item').subscribe(result => {
        if (result) { 
          this.loading = true;
          this.ParentRelativeService.update(+id,this.ParentRelativeForm.value).subscribe(response => {
            this.router.navigateByUrl('trainee-biodata/sailor-biodata-tab/main-tab-layout/main-tab/family-info-details/'+this.traineeId);
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
      this.loading = true;
      this.ParentRelativeService.submit(this.ParentRelativeForm.value).subscribe(response => {
        this.router.navigateByUrl('trainee-biodata/sailor-biodata-tab/main-tab-layout/main-tab/family-info-details/'+this.traineeId);
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

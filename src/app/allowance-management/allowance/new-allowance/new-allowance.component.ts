import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { AllowanceService } from '../../service/allowance.service';

@Component({
  selector: 'app-new-allowance',
  templateUrl: './new-allowance.component.html',
  styleUrls: ['./new-allowance.component.sass']
})
export class NewAllowanceComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  AllowanceForm: FormGroup;
  validationErrors: string[] = [];
  selectedCountry:SelectedModel[];
  selectedRanks:SelectedModel[];
  selectedcourse:SelectedModel[];
  selectedAllowanceType:SelectedModel[];
  selectedAllowanceNamebyFromRankIdandToRankId:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private AllowanceService: AllowanceService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('allowanceId'); 
    if (id) {
      this.pageTitle = 'Edit Allowance ';
      this.destination='Edit';
      this.buttonText="Update";
      this.AllowanceService.find(+id).subscribe(
        res => {
          this.AllowanceForm.patchValue({          

            allowanceId: res.allowanceId,
            courseNameId: res.courseNameId,
            countryId: res.countryId,
            fromRankId: res.fromRankId,
            toRankId: res.toRankId,
            durationFrom:res.durationFrom,
            durationTo:res.durationTo,
            vacancy: res.vacancy,
            AllowanceCategoryId:res.allowanceCategoryId,
            provideByAuthority: res.provideByAuthority,
            tarminal: res.tarminal,
            transit: res.transit,
            bankCommission:res.bankCommission,
          
          }); 
          var editArr = [res.fromRankId, res.toRankId, ];
          this.getSelectedAllowanceNameByFromRankIdAndToRankId();
          console.log("Allowance Category Id");     
          console.log(res);    
        }
      );
    } else {
      this.pageTitle = 'Create Allowance ';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getselectedRank();
    this.getselectedCountry();
    this.getselectedcoursename();
    this.getselectedAllowanceCategory();
  }
  intitializeForm() {
    this.AllowanceForm = this.fb.group({
      allowanceId: [0],
      courseNameId: [],
      countryId:[],
      fromRankId: [],
      toRankId: [],
      durationFrom: [],
      durationTo: [],
      vacancy: [''],
      provideByAuthority: [''],
      tarminal: [],
      transit: [],
      bankCommission: [],
      isActive: [true],
      AllowanceCategoryId:[],
       
    })
  }
  getselectedRank(){
    this.AllowanceService.getselectedRank().subscribe(res=>{
      this.selectedRanks=res
    });
  }
  getselectedCountry(){
    this.AllowanceService.getselectedCountry().subscribe(res=>{
      this.selectedCountry=res
    });
  }
  getselectedcoursename(){
    this.AllowanceService.getselectedcoursename().subscribe(res=>{
      this.selectedcourse=res
    });
  }
  getselectedAllowanceCategory(){
    this.AllowanceService.getselectedAllowanceCategory().subscribe(res=>{
      this.selectedAllowanceType=res
    });
  }
  getSelectedAllowanceNameByFromRankIdAndToRankId(){
    var fromRankId=this.AllowanceForm.value['fromRankId'];
    var toRankId=this.AllowanceForm.value['toRankId'];
    //console.log(baseSchoolNameId);
    this.AllowanceService.getSelectedAllowanceNameByFromRankIdAndToRankId(fromRankId,toRankId).subscribe(res=>{
      //console.log(res);
      this.selectedAllowanceNamebyFromRankIdandToRankId=res;
    });
} 
  
  onSubmit() {
    const id = this.AllowanceForm.get('allowanceId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
            this.AllowanceService.update(+id,this.AllowanceForm.value).subscribe(response => {
              this.router.navigateByUrl('/allowance-management/allowance-list');
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
        this.AllowanceService.submit(this.AllowanceForm.value).subscribe(response => {
          this.router.navigateByUrl('/allowance-management/allowance-list');
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

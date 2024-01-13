import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RankService } from 'src/app/basic-setup/service/Rank.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { SelectedModel } from '../../../core/models/selectedModel';
import { AllowanceCategory } from '../../models/allowancecategory';
import { AllowanceCategoryService } from '../../service/allowancecategory.service';

@Component({
  selector: 'app-new-allowancecategory',
  templateUrl: './new-allowancecategory.component.html',
  styleUrls: ['./new-allowancecategory.component.sass']
})
export class NewAllowanceCategoryComponent implements OnInit {
  buttonText:string;
  loading = false;
  pageTitle: string;
  destination:string;
  AllowanceCategoryForm: FormGroup;
  validationErrors: string[] = [];
  selectedCountryGroup:SelectedModel[];
  selectedCurrencyName:SelectedModel[];
  selectedCountry:SelectedModel[];
  selectedAllowancePercentages:SelectedModel[];
  selectedRanks:SelectedModel[];
  selectedCountryValue:SelectedModel[];
  selectedCurrencyValue:SelectedModel[];
  getcurrencyid: number;
  getcurrencyname: string;
  fromRankId:number;
  toRankId:number;
  allowanceCategoryList:AllowanceCategory[];
  isShown: boolean = false;


  displayedColumns: string[] = ['countryGroup', 'country', 'currencyName', 'allowancePercentage', 'dailyPayment',   'actions'];
  constructor(private snackBar: MatSnackBar,private AllowanceCategoryService: AllowanceCategoryService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute,private confirmService: ConfirmService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('allowanceCategoryId'); 
    if (id) {
      this.pageTitle = 'Edit Allowance Category';
      this.destination='Edit';
      this.buttonText="Update";
      this.AllowanceCategoryService.find(+id).subscribe(
        res => {
          this.AllowanceCategoryForm.patchValue({          

            allowanceCategoryId: res.allowanceCategoryId,
            dailyPayment: res.dailyPayment,
            allowancePercentageId:res.allowancePercentageId,
            fromRankId: res.fromRankId,
            toRankId:res.toRankId,
            countryGroupId: res.countryGroupId,
            countryId: res.countryId,
            currencyNameId: res.currencyNameId,
          
          });    
          this.onCountryGroupSelectionChangeGetCountry(res.countryGroupId),
          this.onCountrySelectionChangeGetCurrency(res.countryId)      
        }
      );
    } else {
      this.pageTitle = 'Create Allowance Category';
      this.destination='Add';
      this.buttonText="Save";
    }
    this.intitializeForm();
    this.getselectedCountryGroup();
    this.getselectedCurrencyName();
    this.getselectedCountry();
    this.getselectedAllowancePercentages();
    this.getselectedRank();
  }
  intitializeForm() {
    this.AllowanceCategoryForm = this.fb.group({
      allowanceCategoryId: [0],
      dailyPayment: [],
      allowancePercentageId:[],
      fromRankId: [],
      toRankId: [],
      currencyNameId: [],
      countryGroupId:[],
      countryId: [],
      isActive: [true],
    
    })
  }
  onToRankSelectionChanged(item) {
   // console.log(item);
   this.isShown=true;
     this.toRankId = item.value 
     this.fromRankId = this.AllowanceCategoryForm.get('fromRankId').value;
     this.AllowanceCategoryService.getAllowanceCategoryListByFromRankIdAndToRankId(this.fromRankId,this.toRankId).subscribe(response => {
       this.allowanceCategoryList = response;
       console.log(this.allowanceCategoryList);
     })
    }
  onCountryGroupSelectionChangeGetCountry(countryGroupId){
    this.AllowanceCategoryService.getCountryByCountryGroupId(countryGroupId).subscribe(res=>{
      this.selectedCountryValue=res
      console.log(this.selectedCountryValue);
    });
   }
   onCountrySelectionChangeGetCurrency(countryId){
     console.log(countryId);
    this.AllowanceCategoryService.getCurrencyByCountryId(countryId).subscribe(res=>{
      this.selectedCurrencyValue=res      
      this.getcurrencyid = this.selectedCurrencyValue[0].value,
      this.getcurrencyname = this.selectedCurrencyValue[0].text
      console.log(this.getcurrencyname);
    });
   }
  getselectedCountryGroup(){
    this.AllowanceCategoryService.getselectedCountryGroup().subscribe(res=>{
      this.selectedCountryGroup=res
    });
  }
  getselectedCurrencyName(){
    this.AllowanceCategoryService.getselectedCurrencyName().subscribe(res=>{
      this.selectedCurrencyName=res
    });
  }
  getselectedCountry(){
    this.AllowanceCategoryService.getselectedCountry().subscribe(res=>{
      this.selectedCountry=res
    });
  }
  getselectedAllowancePercentages(){
    this.AllowanceCategoryService.getselectedAllowancePercentages().subscribe(res=>{
      this.selectedAllowancePercentages=res
    });
  }
  getselectedRank(){
    this.AllowanceCategoryService.getselectedRank().subscribe(res=>{
      this.selectedRanks=res
    });
  }
  
  onSubmit() {
    const id = this.AllowanceCategoryForm.get('allowanceCategoryId').value;  
    console.log(id);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
            this.AllowanceCategoryService.update(+id,this.AllowanceCategoryForm.value).subscribe(response => {
              this.router.navigateByUrl('/allowance-management/allowancecategory-list');
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
        this.AllowanceCategoryService.submit(this.AllowanceCategoryForm.value).subscribe(response => {
          this.router.navigateByUrl('/allowance-management/allowancecategory-list');
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

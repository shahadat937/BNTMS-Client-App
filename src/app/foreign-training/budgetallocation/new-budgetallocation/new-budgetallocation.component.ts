import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetAllocationService } from '../../service/BudgetAllocation.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';

@Component({
  selector: 'app-new-budgetallocation',
  templateUrl: './new-budgetallocation.component.html',
  styleUrls: ['./new-budgetallocation.component.sass']
}) 
export class NewBudgetAllocationComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  buttonText:string;
  pageTitle: string;
  destination:string;
  BudgetAllocationForm: FormGroup;
  validationErrors: string[] = [];
  selectedbaseschools:SelectedModel[];
  selectedcoursename:SelectedModel[];
  selectedcoursedurationbyschoolname:SelectedModel[];
  selectedBudgetCode:SelectedModel[];
  selectedBudgetType:SelectedModel[];
  selectedFiscalYear:SelectedModel[];

  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BudgetAllocationService: BudgetAllocationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('budgetAllocationId'); 
    if (id) {
      this.pageTitle = 'Edit Budget Allocation'; 
      this.destination = "Edit"; 
      this.buttonText= "Update" 
      this.BudgetAllocationService.find(+id).subscribe(
        res => {
          this.BudgetAllocationForm.patchValue({          
            budgetAllocationId: res.budgetAllocationId,
            budgetCodeId: res.budgetCodeId,
            budgetTypeId: res.budgetTypeId,
            fiscalYearId: res.fiscalYearId,
            budgetCodeName: res.budgetCodeName,
            percentage: res.percentage,
            amount: res.amount,
            remarks: res.remarks,
            menuPosition: res.menuPosition,
            isActive: res.isActive
          });          
        }
      );
    } else {
      this.pageTitle = 'Create Budget Allocation';
      this.destination = "Add"; 
      this.buttonText= "Save"
    } 
    this.intitializeForm();
    this.getselectedBudgetCode();
    this.getselectedBudgetType();
    this.getselectedFiscalYear();
  }
  intitializeForm() {
    this.BudgetAllocationForm = this.fb.group({
      budgetAllocationId: [0],
      budgetCodeId:[],
      budgetTypeId:[''],
      fiscalYearId:[''],
      budgetCodeName:[''],
      percentage:[''],
      amount:[''],
      remarks:[''],
      menuPosition:[],
      isActive: [true],    
    })
  }
  
  getselectedBudgetCode(){
    this.BudgetAllocationService.getselectedBudgetCode().subscribe(res=>{
      this.selectedBudgetCode=res
    });
  } 

  getselectedBudgetType(){
    this.BudgetAllocationService.getselectedBudgetType().subscribe(res=>{
      this.selectedBudgetType=res
    });
  } 
  getselectedFiscalYear(){
    this.BudgetAllocationService.getselectedFiscalYear().subscribe(res=>{
      this.selectedFiscalYear=res
    });
  } 

  


 

  onSubmit() {
    const id = this.BudgetAllocationForm.get('budgetAllocationId').value;   
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BudgetAllocationService.update(+id,this.BudgetAllocationForm.value).subscribe(response => {
            this.router.navigateByUrl('/foreign-training/budgetallocation-list');
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
    }else {
      this.loading=true;
      this.BudgetAllocationService.submit(this.BudgetAllocationForm.value).subscribe(response => {
        this.router.navigateByUrl('/foreign-training/budgetallocation-list');
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

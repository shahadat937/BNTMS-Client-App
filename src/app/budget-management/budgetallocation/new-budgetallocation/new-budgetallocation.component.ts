import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetAllocationService } from '../../service/BudgetAllocation.service';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { CodeValueService } from 'src/app/basic-setup/service/codevalue.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetAllocation } from '../../models/BudgetAllocation';


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
  selectedBudgetCodeName:SelectedModel[];
  budgetCodeName:string;
  budgetCodeId:any;
  fiscalYearId:any;
  isShow:boolean=false;
  constructor(private snackBar: MatSnackBar,private confirmService: ConfirmService,private CodeValueService: CodeValueService,private BudgetAllocationService: BudgetAllocationService,private fb: FormBuilder, private router: Router,  private route: ActivatedRoute, ) { }


  ELEMENT_DATA: BudgetAllocation[] = [];
  isLoading = false;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','budgetCode','budgetType','fiscalYear','percentage','amount','actions'];
  dataSource: MatTableDataSource<BudgetAllocation> = new MatTableDataSource();
  
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
          console.log("res...");
          console.log(res);      
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
    this.getBudgetAllocations();
  }
  intitializeForm() {
    this.BudgetAllocationForm = this.fb.group({
      budgetAllocationId: [0],
      budgetCodeId:[''],
      budgetTypeId:[],
      fiscalYearId:[],
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

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBudgetAllocations();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBudgetAllocations();
  } 

  getBudgetAllocations() {
    this.isLoading = true;
    this.BudgetAllocationService.getBudgetAllocations(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.budgetCodeId,this.fiscalYearId).subscribe(response => {
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
 }
  onFiscalYearSelectionChange(dropdown){
    if (dropdown.isUserInput) {
      this.isShow=true;
       this.fiscalYearId=dropdown.source.value;
        this.getBudgetAllocations();
     }
  }
  onBudgetCodeSelectionChange(dropdown){
      if (dropdown.isUserInput) {
       this.budgetCodeId = dropdown.source.value;
        this.BudgetAllocationService.getSelectedBudgetCodeNameByBudgetCodeId(dropdown.source.value).subscribe(res=>{
          this.selectedBudgetCodeName=res
          this.budgetCodeName = res[0].text;
          this.BudgetAllocationForm.get('budgetCodeName').setValue(this.budgetCodeName);
          console.log(this.budgetCodeName);
        });
      }
    }  
    reloadCurrentRoute() {
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
    }
    deleteItem(row) {
      const id = row.budgetAllocationId; 
      this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
        console.log(result);
        if (result) {
          this.BudgetAllocationService.delete(id).subscribe(() => {
          //  this.getBudgetAllocations();
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

  onSubmit() {
    const id = this.BudgetAllocationForm.get('budgetAllocationId').value;   
    console.log(this.BudgetAllocationForm.value);
    if (id) {
      this.confirmService.confirm('Confirm Update message', 'Are You Sure Update This  Item?').subscribe(result => {
        console.log(result);
        if (result) {
          this.loading=true;
          this.BudgetAllocationService.update(+id,this.BudgetAllocationForm.value).subscribe(response => {
           this.router.navigateByUrl('/budget-management/add-budgetallocation');
           //this.reloadCurrentRoute();
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
        //this.router.navigateByUrl('/budget-management/budgetallocation-list');
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
}

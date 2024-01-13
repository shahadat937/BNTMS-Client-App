import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BudgetAllocation} from '../../models/BudgetAllocation'
import {BudgetAllocationService} from '../../service/BudgetAllocation.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-budgetallocation-list',
  templateUrl: './budgetallocation-list.component.html',
  styleUrls: ['./budgetallocation-list.component.sass']
})
export class BudgetAllocationListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
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


   selection = new SelectionModel<BudgetAllocation>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BudgetAllocationService: BudgetAllocationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getBudgetAllocations();
    
  }
 
  // getBudgetAllocations() {
  //   this.isLoading = true;
  //   this.BudgetAllocationService.getBudgetAllocations(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

  //     this.dataSource.data = response.items; 
  //     this.paging.length = response.totalItemsCount    
  //     this.isLoading = false;
  //   })
  // }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
   // this.getBudgetAllocations();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
  //  this.getBudgetAllocations();
  } 

  deleteItem(row) {
    const id = row.budgetAllocationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BudgetAllocationService.delete(id).subscribe(() => {
        //  this.getBudgetAllocations();
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

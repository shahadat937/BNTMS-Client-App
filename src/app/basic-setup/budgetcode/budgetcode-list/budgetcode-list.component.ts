import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BudgetCode } from '../../models/BudgetCode';
import { BudgetCodeService } from '../../service/BudgetCode.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-budgetcode',
  templateUrl: './budgetcode-list.component.html',
  styleUrls: ['./budgetcode-list.component.sass']
})
export class BudgetCodeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BudgetCode[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'budgetCodes','name','actions'];
  dataSource: MatTableDataSource<BudgetCode> = new MatTableDataSource();

  selection = new SelectionModel<BudgetCode>(true, []);
  
  constructor(private snackBar: MatSnackBar,private BudgetCodeService: BudgetCodeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getBudgetCodes();
  }
 
  getBudgetCodes() {
    this.isLoading = true;
    this.BudgetCodeService.getBudgetCodes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBudgetCodes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBudgetCodes();
  } 

  deleteItem(row) {
    const id = row.budgetCodeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BudgetCodeService.delete(id).subscribe(() => {
          this.getBudgetCodes();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })    
  }
}

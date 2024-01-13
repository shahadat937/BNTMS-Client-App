import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Allowance } from '../../models/allowance';
import { AllowanceService } from '../../service/allowance.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-allowance-list',
  templateUrl: './allowance-list.component.html',
  styleUrls: ['./allowance-list.component.sass']
})
export class AllowanceListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Allowance[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','fromRank',  'toRank', 'country', 'vacancy',  'actions'];
  dataSource: MatTableDataSource<Allowance> = new MatTableDataSource();

  selection = new SelectionModel<Allowance>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private AllowanceService: AllowanceService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getAllowances();
  }
  
  getAllowances() {
    this.isLoading = true;
    this.AllowanceService.getAllowances(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach((row) =>
          this.selection.select(row)
        );
  }
  addNew(){
    
  }
 
  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getAllowances();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getAllowances();
  } 


  deleteItem(row) {
    const id = row.allowanceId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.AllowanceService.delete(id).subscribe(() => {
          this.getAllowances();
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

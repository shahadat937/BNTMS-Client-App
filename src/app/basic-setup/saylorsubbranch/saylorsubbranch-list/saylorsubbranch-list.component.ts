import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SaylorSubBranch } from '../../models/SaylorSubBranch';
import { SaylorSubBranchService } from '../../service/SaylorSubBranch.service';
import { Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-saylorsubbranch-list',
  templateUrl: './saylorsubbranch-list.component.html',
  styleUrls: ['./saylorsubbranch-list.component.sass']
})
export class SaylorSubBranchListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: SaylorSubBranch[] = [];
  isLoading = false;
  groupArrays:{ branchName: string; courses: any; }[];

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl', 'saylorBranch', 'name',  'actions'];
  dataSource: MatTableDataSource<SaylorSubBranch> = new MatTableDataSource();

  selection = new SelectionModel<SaylorSubBranch>(true, []);

  
  constructor(private snackBar: MatSnackBar,private SaylorSubBranchService: SaylorSubBranchService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getSaylorSubBranchs();
  }
  
  getSaylorSubBranchs() {
    this.isLoading = true;
    this.SaylorSubBranchService.getSaylorSubBranchs(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      this.dataSource.data = response.items; 

      // this gives an object with dates as keys
      const groups = this.dataSource.data.reduce((groups, courses) => {
        const saylorBranchName = courses.saylorBranch;
        if (!groups[saylorBranchName]) {
          groups[saylorBranchName] = [];
        }
        groups[saylorBranchName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((branchName) => {
        return {
          branchName,
          courses: groups[branchName]
        };
      });
      console.log(this.groupArrays);

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
    this.getSaylorSubBranchs();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getSaylorSubBranchs();
  } 


  deleteItem(row) {
    const id = row.saylorSubBranchId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.SaylorSubBranchService.delete(id).subscribe(() => {
          this.getSaylorSubBranchs();
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

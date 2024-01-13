import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BNASemester } from '../../models/BNASemester';
import { BNASemesterService } from '../../service/BNASemester.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import {MasterData} from 'src/assets/data/master-data'
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

 

@Component({
  selector: 'app-bnasemester-list',
  templateUrl: './bnasemester-list.component.html',
  styleUrls: ['./bnasemester-list.component.sass']
})
export class BNASemesterListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNASemester[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'select', 'sl',/*'bnaSemesterId',*/ 'semesterName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<BNASemester> = new MatTableDataSource();


  selection = new SelectionModel<BNASemester>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private BNASemesterService: BNASemesterService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getBNASemesters();
    
  }
 
  getBNASemesters() {
    this.isLoading = true;
    this.BNASemesterService.getBNASemesters(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
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
    this.getBNASemesters();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBNASemesters();
  } 


  deleteItem(row) {
    const id = row.bnaSemesterId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNASemesterService.delete(id).subscribe(() => {
          this.getBNASemesters();
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

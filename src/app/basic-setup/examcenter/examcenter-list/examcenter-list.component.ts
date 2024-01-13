import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ExamCenter} from '../../models/examcenter';
import {ExamCenterService} from '../../service/examcenter.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-examcenter-list',
  templateUrl: './examcenter-list.component.html',
  styleUrls: ['./examcenter-list.component.sass']
})
export class ExamCenterListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ExamCenter[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','examCenterName','isActive', 'actions'];
  dataSource: MatTableDataSource<ExamCenter> = new MatTableDataSource();

  selection = new SelectionModel<ExamCenter>(true, []);

  
  constructor(private snackBar: MatSnackBar,private ExamCenterService:ExamCenterService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getExamCenters();
  }
  
  getExamCenters() {
    this.isLoading = true;
    this.ExamCenterService.getExamCenters(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getExamCenters();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getExamCenters();
  } 
  deleteItem(row) {
    const id = row.examCenterId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) { 
        this.ExamCenterService.delete(id).subscribe(() => {
          this.getExamCenters();
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

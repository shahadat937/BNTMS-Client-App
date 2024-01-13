import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ExamAttemptType} from '../../models/examattempttype';
import {ExamAttemptTypeService} from '../../service/examattempttype.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-examattempttype-list',
  templateUrl: './examattempttype-list.component.html',
  styleUrls: ['./examattempttype-list.component.sass']
})
export class ExamAttemptTypeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ExamAttemptType[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','examAttemptTypeName','isActive', 'actions'];
  dataSource: MatTableDataSource<ExamAttemptType> = new MatTableDataSource();

  selection = new SelectionModel<ExamAttemptType>(true, []);

  
  constructor(private snackBar: MatSnackBar,private ExamAttemptTypeService:ExamAttemptTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getExamAttemptTypes();
  }
  
  getExamAttemptTypes() {
    this.isLoading = true;
    this.ExamAttemptTypeService.getExamAttemptTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getExamAttemptTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getExamAttemptTypes();
  } 
  deleteItem(row) {
    const id = row.examAttemptTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) { 
        this.ExamAttemptTypeService.delete(id).subscribe(() => {
          this.getExamAttemptTypes();
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

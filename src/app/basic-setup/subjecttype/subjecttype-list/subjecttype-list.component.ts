import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectType } from '../../models/subjecttype';
import { SubjectTypeService } from '../../service/subjecttype.service';
import { Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-subjecttype-list',
  templateUrl: './subjecttype-list.component.html',
  styleUrls: ['./subjecttype-list.component.sass']
})
export class SubjecttypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: SubjectType[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl',/*'SubjectTypeId',*/ 'subjectTypeName', /*'menuPosition',*/ 'isActive', 'actions'];
  dataSource: MatTableDataSource<SubjectType> = new MatTableDataSource();

  selection = new SelectionModel<SubjectType>(true, []);

  
  constructor(private snackBar: MatSnackBar,private SubjectTypeService: SubjectTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getSubjectTypes();
  }
  
  getSubjectTypes() {
    this.isLoading = true;
    this.SubjectTypeService.getSubjectTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getSubjectTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getSubjectTypes();
  } 


  deleteItem(row) {
    const id = row.subjectTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Subject Type Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.SubjectTypeService.delete(id).subscribe(() => {
          this.getSubjectTypes();
          this.snackBar.open('Subject Type Information Deleted Successfully ', '', {
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

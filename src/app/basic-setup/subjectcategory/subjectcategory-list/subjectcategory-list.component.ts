import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectCategory } from '../../models/subjectcategory';
import { SubjectCategoryService } from '../../service/subjectcategory.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-subjectcategory-list',
  templateUrl: './subjectcategory-list.component.html',
  styleUrls: ['./subjectcategory-list.component.sass']
})
export class SubjectCategoryListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: SubjectCategory[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl',/*'SubjectCategoryId',*/ 'subjectCategoryName', /*'menuPosition',*/ 'isActive', 'actions'];
  dataSource: MatTableDataSource<SubjectCategory> = new MatTableDataSource();

  selection = new SelectionModel<SubjectCategory>(true, []);

  
  constructor(private snackBar: MatSnackBar,private SubjectCategoryService: SubjectCategoryService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getSubjectCategorys();
  }
  
  getSubjectCategorys() {
    this.isLoading = true;
    this.SubjectCategoryService.getSubjectCategorys(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getSubjectCategorys();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getSubjectCategorys();
  } 


  deleteItem(row) {
    const id = row.subjectCategoryId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Subject Category Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.SubjectCategoryService.delete(id).subscribe(() => {
          this.getSubjectCategorys();
          this.snackBar.open('Subject Category Information Deleted Successfully ', '', {
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

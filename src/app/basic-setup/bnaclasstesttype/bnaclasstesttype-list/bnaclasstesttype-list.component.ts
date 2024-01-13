import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BnaClassTestType } from '../../models/BnaClassTestType';
import { BnaClassTestTypeService } from '../../service/BnaClassTestType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import {MasterData} from 'src/assets/data/master-data'
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

 

@Component({
  selector: 'app-BnaClassTestType-list',
  templateUrl: './BnaClassTestType-list.component.html',
  styleUrls: ['./BnaClassTestType-list.component.sass']
})
export class BnaClassTestTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BnaClassTestType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [  'sl', 'name', 'isActive', 'actions'];
  dataSource: MatTableDataSource<BnaClassTestType> = new MatTableDataSource();


  selection = new SelectionModel<BnaClassTestType>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private BnaClassTestTypeService: BnaClassTestTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getBnaClassTestTypes();
    
  }
 
  getBnaClassTestTypes() {
    this.isLoading = true;
    this.BnaClassTestTypeService.getBnaClassTestTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
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
    this.getBnaClassTestTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBnaClassTestTypes();
  } 


  deleteItem(row) {
    const id = row.bnaClassTestTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BnaClassTestTypeService.delete(id).subscribe(() => {
          this.getBnaClassTestTypes();
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

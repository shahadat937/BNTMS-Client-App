import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReasonType } from '../../models/reasonType';
import { ReasonTypeService } from '../../service/reasonType.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-reasonType-list',
  templateUrl: './reasonType-list.component.html',
  styleUrls: ['./reasonType-list.component.sass']
})
export class ReasonTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ReasonType[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl',/*'reasonTypeId',*/ 'reasonTypeName', /*'menuPosition',*/ 'isActive', 'actions'];
  dataSource: MatTableDataSource<ReasonType> = new MatTableDataSource();

  selection = new SelectionModel<ReasonType>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private reasonTypeService: ReasonTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getReasonTypes();
  }
  
  getReasonTypes() {
    this.isLoading = true;
    this.reasonTypeService.getReasonTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getReasonTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getReasonTypes();
  } 


  deleteItem(row) {
    const id = row.reasonTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Reason Type Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.reasonTypeService.delete(id).subscribe(() => {
          this.getReasonTypes();
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

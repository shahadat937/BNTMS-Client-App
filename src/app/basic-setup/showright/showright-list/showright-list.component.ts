import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ShowRight } from '../../models/showright';
import { ShowRightService } from '../../service/showright.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-showright',
  templateUrl: './showright-list.component.html',
  styleUrls: ['./showright-list.component.sass']
})
export class ShowRightListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ShowRight[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'showRightName','isActive', 'actions'];
  dataSource: MatTableDataSource<ShowRight> = new MatTableDataSource();


  selection = new SelectionModel<ShowRight>(true, []);
  
  constructor(private snackBar: MatSnackBar,private ShowRightService: ShowRightService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getShowRight();
  }
 
  getShowRight() {
    this.isLoading = true;
    this.ShowRightService.getShowRight(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
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
    this.getShowRight();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getShowRight();
  } 


  deleteItem(row) {
    const id = row.showRightId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ShowRightService.delete(id).subscribe(() => {
          this.getShowRight();
          this.snackBar.open('Information Delete Successfully ', '', {
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

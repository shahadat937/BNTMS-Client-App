import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WithdrawnType } from '../../models/WithdrawnType';
import { WithdrawnTypeService } from '../../service/WithdrawnType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-withdrawntype',
  templateUrl: './withdrawntype-list.component.html',
  styleUrls: ['./withdrawntype-list.component.sass']
})
export class WithdrawnTypeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: WithdrawnType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'name','shortName', 'actions'];
  dataSource: MatTableDataSource<WithdrawnType> = new MatTableDataSource();
  selection = new SelectionModel<WithdrawnType>(true, []);
  
  constructor(private snackBar: MatSnackBar,private WithdrawnTypeService: WithdrawnTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getWithdrawnTypes();
  }
 
  getWithdrawnTypes() {
    this.isLoading = true;
    this.WithdrawnTypeService.getWithdrawnTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
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
    this.getWithdrawnTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getWithdrawnTypes();
  } 


  deleteItem(row) {
    const id = row.withdrawnTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.WithdrawnTypeService.delete(id).subscribe(() => {
          this.getWithdrawnTypes();
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

import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Religion } from '../../models/religion';
import { ReligionService } from '../../service/religion.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-religion-list',
  templateUrl: './religion-list.component.html',
  styleUrls: ['./religion-list.component.sass']
})
export class ReligionListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Religion[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl',/*'religionId',*/ 'religionName', /*'menuPosition',*/ 'isActive', 'actions'];
  dataSource: MatTableDataSource<Religion> = new MatTableDataSource();

  selection = new SelectionModel<Religion>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private religionService: ReligionService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getReligions();
  }
  
  getReligions() {
    this.isLoading = true;
    this.religionService.getReligions(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getReligions();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getReligions();
  } 


  deleteItem(row) {
    const id = row.religionId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Religion Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.religionService.delete(id).subscribe(() => {
          this.getReligions();
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

import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FavoritesType } from '../../models/favoritesType';
import { FavoritesTypeService } from '../../service/favoritesType.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-favoritesType-list',
  templateUrl: './favoritesType-list.component.html',
  styleUrls: ['./favoritesType-list.component.sass']
})
export class FavoritesTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: FavoritesType[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl',/*'favoritesTypeId',*/ 'favoritesTypeName', /*'menuPosition',*/ 'isActive', 'actions'];
  dataSource: MatTableDataSource<FavoritesType> = new MatTableDataSource();

  selection = new SelectionModel<FavoritesType>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private favoritesTypeService: FavoritesTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getFavoritesTypes();
  }
  
  getFavoritesTypes() {
    this.isLoading = true;
    this.favoritesTypeService.getFavoritesTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getFavoritesTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getFavoritesTypes();
  } 


  deleteItem(row) {
    const id = row.favoritesTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This favorites Type Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.favoritesTypeService.delete(id).subscribe(() => {
          this.getFavoritesTypes();
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

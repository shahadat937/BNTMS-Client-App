import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DefenseType } from '../../models/defenseType';
import { DefenseTypeService } from '../../service/defenseType.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-defenseType-list',
  templateUrl: './defenseType-list.component.html',
  styleUrls: ['./defenseType-list.component.sass']
})
export class DefenseTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: DefenseType[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl',/*'defenseTypeId',*/ 'defenseTypeName', /*'menuPosition',*/ 'isActive', 'actions'];
  dataSource: MatTableDataSource<DefenseType> = new MatTableDataSource();

  selection = new SelectionModel<DefenseType>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private defenseTypeService: DefenseTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getDefenseTypes();
  }
  
  getDefenseTypes() {
    this.isLoading = true;
    this.defenseTypeService.getDefenseTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getDefenseTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getDefenseTypes();
  } 


  deleteItem(row) {
    const id = row.defenseTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Defense Type Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.defenseTypeService.delete(id).subscribe(() => {
          this.getDefenseTypes();
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

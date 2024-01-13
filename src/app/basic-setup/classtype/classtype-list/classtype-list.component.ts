import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClassType } from '../../models/classtype';
import { ClassTypeService } from '../../service/classtype.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-classtype',
  templateUrl: './classtype-list.component.html',
  styleUrls: ['./classtype-list.component.sass']
})
export class ClassTypeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ClassType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'classTypeName','isActive', 'actions'];
  dataSource: MatTableDataSource<ClassType> = new MatTableDataSource();


  selection = new SelectionModel<ClassType>(true, []);
  
  constructor(private snackBar: MatSnackBar,private ClassTypeService: ClassTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getClassType();
  }
 
  getClassType() {
    this.isLoading = true;
    this.ClassTypeService.getClassType(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
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
    this.getClassType();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getClassType();
  } 


  deleteItem(row) {
    const id = row.classTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ClassTypeService.delete(id).subscribe(() => {
          this.getClassType();
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

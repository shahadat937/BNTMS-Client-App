import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MarkType } from '../../models/MarkType';
import { MarkTypeService } from '../../service/MarkType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-marktype-list',
  templateUrl: './marktype-list.component.html',
  styleUrls: ['./marktype-list.component.sass']
})
export class MarkTypeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: MarkType[] = [];
  isLoading = false;
   
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','typeName', 'shortName','actions'];
  dataSource: MatTableDataSource<MarkType> = new MatTableDataSource();


   selection = new SelectionModel<MarkType>(true, []);

  
  constructor(private snackBar: MatSnackBar,private MarkTypeService: MarkTypeService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getMarkType();
    
  }
 
  getMarkType() {
    this.isLoading = true;
    this.MarkTypeService.getMarkType(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      console.log(this.dataSource.data)
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getMarkType();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getMarkType();
  } 

  deleteItem(row) {
    const id = row.markTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.MarkTypeService.delete(id).subscribe(() => {
          this.getMarkType();
          this.snackBar.open('Information Deleted Successfully ', '', {
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

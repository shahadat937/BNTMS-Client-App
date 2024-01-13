import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrandFatherType } from '../../models/GrandFatherType';
import { GrandFatherTypeService } from '../../service/GrandFatherType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-GrandFatherType',
  templateUrl: './grandfathertype-list.component.html',
  styleUrls: ['./grandfathertype-list.component.sass']
})
export class GrandFatherTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: GrandFatherType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'grandfatherTypeName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<GrandFatherType> = new MatTableDataSource();

  selection = new SelectionModel<GrandFatherType>(true, []);
  
  constructor(private snackBar: MatSnackBar,private GrandFatherTypeService: GrandFatherTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getGrandFatherTypes();
  }
 
  getGrandFatherTypes() {
    this.isLoading = true;
    this.GrandFatherTypeService.getGrandFatherTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getGrandFatherTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getGrandFatherTypes();
  } 

  deleteItem(row) {
    const id = row.grandfatherTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.GrandFatherTypeService.delete(id).subscribe(() => {
          this.getGrandFatherTypes();
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

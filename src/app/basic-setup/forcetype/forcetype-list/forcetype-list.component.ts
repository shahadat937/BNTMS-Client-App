import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ForceType } from '../../models/ForceType';
import { ForceTypeService } from '../../service/ForceType.service';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-forcetype',
  templateUrl: './forcetype-list.component.html',
  styleUrls: ['./forcetype-list.component.sass']
})
export class ForceTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ForceType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'forceTypeName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<ForceType> = new MatTableDataSource();
  
  constructor(private snackBar: MatSnackBar,private ForceTypeService: ForceTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getForceTypes();
  }
 
  getForceTypes() {
    this.isLoading = true;
    this.ForceTypeService.getForceTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getForceTypes();
  }
  
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getForceTypes();
  }

  deleteItem(row) {
    const id = row.forceTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This ForceType Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ForceTypeService.delete(id).subscribe(() => {
          this.getForceTypes();
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

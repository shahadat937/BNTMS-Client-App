import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { District } from '../../models/District';
import { DistrictService } from '../../service/District.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-District',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.sass']
})
export class DistrictListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: District[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'districtName', 'division', 'isActive', 'actions'];
  dataSource: MatTableDataSource<District> = new MatTableDataSource();

  selection = new SelectionModel<District>(true, []);
  
  constructor(private snackBar: MatSnackBar,private DistrictService: DistrictService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getDistricts();
  }
 
  getDistricts() {
    this.isLoading = true;
    this.DistrictService.getDistricts(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getDistricts();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getDistricts();
  } 

  deleteItem(row) {
    const id = row.districtId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.DistrictService.delete(id).subscribe(() => {
          this.getDistricts();
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

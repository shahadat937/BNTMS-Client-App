import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BloodGroup } from '../../models/BloodGroup';
import { BloodGroupService } from '../../service/BloodGroup.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-BloodGroup',
  templateUrl: './bloodgroup-list.component.html',
  styleUrls: ['./bloodgroup-list.component.sass']
})
export class BloodGroupListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BloodGroup[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'bloodGroupName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<BloodGroup> = new MatTableDataSource();

  selection = new SelectionModel<BloodGroup>(true, []);
  
  constructor(private snackBar: MatSnackBar,private BloodGroupService: BloodGroupService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getBloodGroups();
  }
 
  getBloodGroups() {
    this.isLoading = true;
    this.BloodGroupService.getBloodGroups(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBloodGroups();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBloodGroups();
  } 

  deleteItem(row) {
    const id = row.bloodGroupId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BloodGroupService.delete(id).subscribe(() => {
          this.getBloodGroups();
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

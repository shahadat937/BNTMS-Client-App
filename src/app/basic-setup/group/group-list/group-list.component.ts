import { Component, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from '../../models/Group';
import { GroupService } from '../../service/group.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmService } from '../../../core/service/confirm.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.sass']
})
export class GroupListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Group[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'groupName','isActive', 'actions'];
  dataSource: MatTableDataSource<Group> = new MatTableDataSource();

  selection = new SelectionModel<Group>(true, []);

  constructor(private snackBar: MatSnackBar,private groupService: GroupService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getGroups();
  }
 
  getGroups() {
    this.isLoading = true;
    this.groupService.getGroups(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getGroups();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getGroups();
  } 

  deleteItem(row) {
    const id = row.groupId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Group Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.groupService.delete(id).subscribe(() => {
          this.getGroups();
          this.snackBar.open('Group Information Deleted Successfully ', '', {
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

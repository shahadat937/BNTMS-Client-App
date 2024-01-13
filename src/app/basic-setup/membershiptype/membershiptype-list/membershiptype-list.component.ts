import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MembershipType } from '../../models/MembershipType';
import { MembershipTypeService } from '../../service/membership-type.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-membershiptype-list',
  templateUrl: './membershiptype-list.component.html',
  styleUrls: ['./membershiptype-list.component.sass']
})
export class MembershiptypeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: MembershipType[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'membershipTypeName','isActive', 'actions'];
  dataSource: MatTableDataSource<MembershipType> = new MatTableDataSource();

  selection = new SelectionModel<MembershipType>(true, []);

  constructor(private snackBar: MatSnackBar,private membershipTypeService: MembershipTypeService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getMembershipTypes();
  }
 
  getMembershipTypes() {
    this.isLoading = true;
    this.membershipTypeService.getMembershipTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getMembershipTypes();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getMembershipTypes();
  } 

  deleteItem(row) {
    const id = row.membershipTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This MembershipType Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.membershipTypeService.delete(id).subscribe(() => {
          this.getMembershipTypes();
          this.snackBar.open('MembershipType Information Deleted Successfully ', '', {
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

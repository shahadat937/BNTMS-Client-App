import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Notice } from '../../models/notice';
import { NoticeService } from '../../service/notice.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
// import { ConfirmService } from 'src/app/core/service/confirm.service';
// import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notice-list',
  templateUrl: './notice-list.component.html',
  styleUrls: ['./notice-list.component.sass']
})
export class NoticeListComponent implements OnInit {
  //masterData = MasterData;
  ELEMENT_DATA: Notice[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','baseSchoolNameId','courseDurationId','courseNameId','noticeDetails', 'status', 'actions'];
  dataSource: MatTableDataSource<Notice> = new MatTableDataSource();


   selection = new SelectionModel<Notice>(true, []);

  
  constructor(private snackBar: MatSnackBar,private NoticeService: NoticeService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getNotices();
    
  }
 
  getNotices() {
    this.isLoading = true;
    this.NoticeService.getNotices(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getNotices();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getNotices();
  } 

  deleteItem(row) {
    const id = row.noticeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.NoticeService.delete(id).subscribe(() => {
          this.getNotices();
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

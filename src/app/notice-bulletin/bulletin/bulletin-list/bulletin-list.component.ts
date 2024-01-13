import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {Bulletin} from '../../models/bulletin';
import {BulletinService} from '../../service/bulletin.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bulletin-list',
  templateUrl: './bulletin-list.component.html',
  styleUrls: ['./bulletin-list.component.sass']
})
export class BulletinListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Bulletin[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','baseSchoolName','courseName','buletinDetails', 'status', 'actions'];
  dataSource: MatTableDataSource<Bulletin> = new MatTableDataSource();


   selection = new SelectionModel<Bulletin>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BulletinService: BulletinService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBulletins();
    
  }
 
  getBulletins() {
    this.isLoading = true;
    this.BulletinService.getBulletins(this.paging.pageIndex, this.paging.pageSize,this.searchText,20).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBulletins();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBulletins();
  } 

  deleteItem(row) {
    const id = row.bulletinId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BulletinService.delete(id).subscribe(() => {
          this.getBulletins();
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

import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Thana } from '../../models/Thana';
import { ThanaService } from '../../service/Thana.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-Thana',
  templateUrl: './thana-list.component.html',
  styleUrls: ['./thana-list.component.sass']
})
export class ThanaListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Thana[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'thanaName', 'district', 'isActive', 'actions'];
  dataSource: MatTableDataSource<Thana> = new MatTableDataSource();

  selection = new SelectionModel<Thana>(true, []);
  
  constructor( private snackBar: MatSnackBar,private ThanaService: ThanaService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getThanas();
  }
 
  getThanas() {
    this.isLoading = true;
    this.ThanaService.getThanas(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getThanas();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getThanas();
  } 

  deleteItem(row) {
    const id = row.thanaId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ThanaService.delete(id).subscribe(() => {
          this.getThanas();
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

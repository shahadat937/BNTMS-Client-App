import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from '../../models/gender';
import { GenderService } from '../../service/gender.service';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-gender',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.sass']
})
export class GenderListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Gender[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'genderName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<Gender> = new MatTableDataSource();
  
  constructor(private snackBar: MatSnackBar,private GenderService: GenderService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getGenders();
  }
 
  getGenders() {
    this.isLoading = true;
    this.GenderService.getGenders(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getGenders();
  }
  
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getGenders();
  }

  deleteItem(row) {
    const id = row.genderId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This gender Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.GenderService.delete(id).subscribe(() => {
          this.getGenders();
          this.snackBar.open('Gender Information Deleted Successfully ', '', {
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

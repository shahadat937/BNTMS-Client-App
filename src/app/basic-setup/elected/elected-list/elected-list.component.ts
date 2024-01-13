import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Elected } from '../../models/Elected';
import { ElectedService } from '../../service/elected.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-elected-list',
  templateUrl: './elected-list.component.html',
  styleUrls: ['./elected-list.component.sass']
})
export class ElectedListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Elected[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'electedType','isActive', 'actions'];
  dataSource: MatTableDataSource<Elected> = new MatTableDataSource();

  selection = new SelectionModel<Elected>(true, []);

  constructor(private snackBar: MatSnackBar,private electedService: ElectedService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getElecteds();
  }
 
  getElecteds() {
    this.isLoading = true;
    this.electedService.getElecteds(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getElecteds();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getElecteds();
  } 

  deleteItem(row) {
    const id = row.electedId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Elected Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.electedService.delete(id).subscribe(() => {
          this.getElecteds();
          this.snackBar.open('Elected Information Deleted Successfully ', '', {
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

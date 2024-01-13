import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Caste } from '../../models/Caste';
import { CasteService } from '../../service/Caste.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-Caste',
  templateUrl: './Caste-list.component.html',
  styleUrls: ['./Caste-list.component.sass']
})
export class CasteListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Caste[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'castName', 'religion', 'isActive', 'actions'];
  dataSource: MatTableDataSource<Caste> = new MatTableDataSource();

  selection = new SelectionModel<Caste>(true, []);
  
  constructor(private snackBar: MatSnackBar,private CasteService: CasteService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getCastes();
  }
 
  getCastes() {
    this.isLoading = true;
    this.CasteService.getCastes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCastes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCastes();
  } 

  deleteItem(row) {
    const id = row.casteId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.CasteService.delete(id).subscribe(() => {
          this.getCastes();
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

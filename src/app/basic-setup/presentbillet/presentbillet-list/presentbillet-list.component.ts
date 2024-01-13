import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PresentBillet } from '../../models/PresentBillet';
import { PresentBilletService } from '../../service/PresentBillet.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-PresentBillet',
  templateUrl: './presentbillet-list.component.html',
  styleUrls: ['./presentbillet-list.component.sass']
})
export class PresentBilletListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: PresentBillet[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'presentBilletName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<PresentBillet> = new MatTableDataSource();

  selection = new SelectionModel<PresentBillet>(true, []);
  
  constructor(private snackBar: MatSnackBar,private PresentBilletService: PresentBilletService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getPresentBillets();
  }
 
  getPresentBillets() {
    this.isLoading = true;
    this.PresentBilletService.getPresentBillets(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getPresentBillets();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getPresentBillets();
  } 

  deleteItem(row) {
    const id = row.presentBilletId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.PresentBilletService.delete(id).subscribe(() => {
          this.getPresentBillets();
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



import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BnaSubjectName } from '../../models/bnasubjectname';
import { BnaSubjectNameService } from '../../service/bnasubjectname.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bnasubjectname',
  templateUrl: './bnasubjectname-list.component.html',
  styleUrls: ['./bnasubjectname-list.component.sass']
})
export class BnaSubjectNameListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BnaSubjectName[] = [];
  isLoading = false;
  status=3;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','subjectName','totalMark', 'passMarkBna', 'actions'];
  dataSource: MatTableDataSource<BnaSubjectName> = new MatTableDataSource();


   selection = new SelectionModel<BnaSubjectName>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BnaSubjectNameService: BnaSubjectNameService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBnaSubjectNames();
    
  }
 
  getBnaSubjectNames() {
    this.isLoading = true;
    this.BnaSubjectNameService.getBnaSubjectNames(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.status).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBnaSubjectNames();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBnaSubjectNames();
  } 

  deleteItem(row) {
    const id = row.bnaSubjectNameId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.BnaSubjectNameService.delete(id).subscribe(() => {
          this.getBnaSubjectNames();
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

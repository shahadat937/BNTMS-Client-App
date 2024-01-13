import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BnaClassTest} from '../../models/BnaClassTest'
import {BnaClassTestService} from '../../service/BnaClassTest.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-BnaClassTest-list',
  templateUrl: './BnaClassTest-list.component.html',
  styleUrls: ['./BnaClassTest-list.component.sass']
})
export class BnaClassTestListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BnaClassTest[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','bnaSemester','subjectCategory','bnaSubjectCurriculum','bnaSubjectName','bnaClassTestType', 'actions'];
  dataSource: MatTableDataSource<BnaClassTest> = new MatTableDataSource();


   selection = new SelectionModel<BnaClassTest>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BnaClassTestService: BnaClassTestService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBnaClassTests();
    
  }
 
  getBnaClassTests() {
    this.isLoading = true;
    this.BnaClassTestService.getBnaClassTests(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBnaClassTests();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBnaClassTests();
  } 

  deleteItem(row) {
    const id = row.bnaClassTestId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BnaClassTestService.delete(id).subscribe(() => {
          this.getBnaClassTests();
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

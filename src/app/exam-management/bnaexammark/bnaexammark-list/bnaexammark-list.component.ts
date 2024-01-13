import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BNAExamMark} from '../../models/bnaexammark'
import {BNAExamMarkService} from '../../service/bnaexammark.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bnaexammark-list',
  templateUrl: './bnaexammark-list.component.html',
  styleUrls: ['./bnaexammark-list.component.sass']
})
export class BNAExamMarkListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNAExamMark[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','traineeId','bnaSemester','bnaBatch'
  ,'examType', 'bnaCurriculamType', 'bnaSubjectName', 'bnaExamMarkRemarks',  'actions'];
  dataSource: MatTableDataSource<BNAExamMark> = new MatTableDataSource();


   selection = new SelectionModel<BNAExamMark>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BNAExamMarkService: BNAExamMarkService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBNAExamMarks();
    
  }
 
  getBNAExamMarks() {
    this.isLoading = true;
    this.BNAExamMarkService.getBNAExamMarks(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBNAExamMarks();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBNAExamMarks();
  } 

  deleteItem(row) {
    const id = row.bnaExamMarkId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNAExamMarkService.delete(id).subscribe(() => {
          this.getBNAExamMarks();
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

import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ExamCenterSelection} from '../../models/examcenterselection'
import {ExamCenterSelectionService} from '../../service/examcenterselection.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-examcenterselection-list',
  templateUrl: './examcenterselection-list.component.html',
  styleUrls: ['./examcenterselection-list.component.sass']
})
export class ExamCenterSelectionListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ExamCenterSelection[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','traineeNominationId','bnaExamScheduleId','examCenter','traineeId', 'actions'];
  dataSource: MatTableDataSource<ExamCenterSelection> = new MatTableDataSource();


   selection = new SelectionModel<ExamCenterSelection>(true, []);

  
  constructor(private snackBar: MatSnackBar,private ExamCenterSelectionService: ExamCenterSelectionService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getExamCenterSelections();
    
  }
 
  getExamCenterSelections() {
    this.isLoading = true;
    this.ExamCenterSelectionService.getExamCenterSelections(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getExamCenterSelections();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getExamCenterSelections();
  } 

  deleteItem(row) {
    const id = row.examCenterSelectionId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ExamCenterSelectionService.delete(id).subscribe(() => {
          this.getExamCenterSelections();
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

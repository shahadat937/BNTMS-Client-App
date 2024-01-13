import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BnaCurriculumUpdate} from '../../models/BnaCurriculumUpdate'
import {BnaCurriculumUpdateService} from '../../service/BnaCurriculumUpdate.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-BnaCurriculumUpdate-list',
  templateUrl: './BnaCurriculumUpdate-list.component.html',
  styleUrls: ['./BnaCurriculumUpdate-list.component.sass']
})
export class BnaCurriculumUpdateListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BnaCurriculumUpdate[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','bnaBatch','bnaCurriculumType','bnaSemester','bnaSemesterDuration','actions'];
  dataSource: MatTableDataSource<BnaCurriculumUpdate> = new MatTableDataSource();


   selection = new SelectionModel<BnaCurriculumUpdate>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BnaCurriculumUpdateService: BnaCurriculumUpdateService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBnaCurriculumUpdates();
    
  }
 
  getBnaCurriculumUpdates() {
    this.isLoading = true;
    this.BnaCurriculumUpdateService.getBnaCurriculumUpdates(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBnaCurriculumUpdates();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBnaCurriculumUpdates();
  } 

  deleteItem(row) {
    const id = row.bnaCurriculumUpdateId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BnaCurriculumUpdateService.delete(id).subscribe(() => {
          this.getBnaCurriculumUpdates();
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

import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TraineeCourseStatus } from '../../models/traineecoursestatus';
import { TraineeCourseStatusService } from '../../service/traineecoursestatus.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-traineecoursestatus',
  templateUrl: './traineecoursestatus-list.component.html',
  styleUrls: ['./traineecoursestatus-list.component.sass']
})
export class TraineeCourseStatusListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeCourseStatus[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'traineeCourseStatusName','isActive', 'actions'];
  dataSource: MatTableDataSource<TraineeCourseStatus> = new MatTableDataSource();


  selection = new SelectionModel<TraineeCourseStatus>(true, []);
  
  constructor(private snackBar: MatSnackBar,private TraineeCourseStatusService: TraineeCourseStatusService,private router: Router,private confirmService: ConfirmService) { }
  // ngOnInit() {
  //   this.dataSource2.paginator = this.paginator;
  // }
  ngOnInit() {
    this.getTraineeCourseStatuses();
   // this.refresh();
  }
 
  getTraineeCourseStatuses() {
    this.isLoading = true;
    this.TraineeCourseStatusService.getTraineeCourseStatuses(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
    this.dataSource.data = response.items; 
    this.paging.length = response.totalItemsCount    
    this.isLoading = false;

   
    })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach((row) =>
          this.selection.select(row)
        );
  }
  addNew(){
    
  }
  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getTraineeCourseStatuses();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getTraineeCourseStatuses();
  } 


  deleteItem(row) {
    const id = row.traineeCourseStatusId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.TraineeCourseStatusService.delete(id).subscribe(() => {
          this.getTraineeCourseStatuses();
          this.snackBar.open('Information Delete Successfully ', '', {
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

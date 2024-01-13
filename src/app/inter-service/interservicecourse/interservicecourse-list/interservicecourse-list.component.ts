import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseDuration} from '../../models/courseduration'
import {CourseDurationService} from '../../service/courseduration.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-interservicecourse-list',
  templateUrl: './interservicecourse-list.component.html',
  styleUrls: ['./interservicecourse-list.component.sass']
})
export class InterservicecourseListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CourseDuration[] = [];
  isLoading = false;
  courseTypeId=MasterData.coursetype.InterService;
  showHideDiv = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";


  displayedColumns: string[] = ['ser', 'courseName', 'organizationName','noOfCandidates', 'durationFrom','durationTo', 'status', 'actions'];

  dataSource: MatTableDataSource<CourseDuration> = new MatTableDataSource();


   selection = new SelectionModel<CourseDuration>(true, []);

  
  constructor(private snackBar: MatSnackBar,private CourseDurationService: CourseDurationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
   //  this.getCourseDurationsByCourseType();
     this.getCourseDurationForInterService();
  }
  getCourseDurationsByCourseType(){
    this.isLoading = true;
    this.CourseDurationService.getCourseDurationsByCourseType(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.courseTypeId).subscribe(response => {
      this.dataSource.data = response.items; 
      console.log("data source");
      console.log(this.dataSource.data);
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      console.log(response);
    })
  }

  getCourseDurationForInterService(){
    this.CourseDurationService.getCourseDurationForInterServiceByCourseType(this.courseTypeId).subscribe(response => {
      this.dataSource.data = response; 
      console.log("data source");
      console.log(this.dataSource.data);
      // this.paging.length = response.totalItemsCount    
      // this.isLoading = false;
      // console.log(response);
    })
  }

  inActiveItem(row){
    const id = row.courseDurationId; 
   
        if(row.isActive == true){
          this.confirmService.confirm('Confirm Deactive message', 'Are You Sure Deactive This Item').subscribe(result => {
            if (result) {
          this.CourseDurationService.deactiveCourseDuration(id).subscribe(() => {
            this.getCourseDurationForInterService()
            this.snackBar.open('Information Deactive Successfully ', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-warning'
            });
          })
        }
      })
    }
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCourseDurationForInterService();
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCourseDurationForInterService();
  } 
  toggle() {
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle() {
    this.showHideDiv = false;
    this.print();
  }
  print() {
    let printContents, popupWin;
    printContents = document.getElementById("print-routine").innerHTML;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          body{  width: 99%;}
            label { font-weight: 400;
                    font-size: 13px;
                    padding: 2px;
                    margin-bottom: 5px;
                  }
            table, td, th {
                  border: 1px solid silver;
                    }
                    table td {
                  font-size: 13px;
                    }
                  
                    .table.table.tbl-by-group.db-li-s-in tr .cl-action{
                      display: none;
                    }
        
                    .table.table.tbl-by-group.db-li-s-in tr td{
                      text-align:center;
                      padding: 0px 5px;
                    }
                    table th {
                  font-size: 13px;
                    }
              table {
                    border-collapse: collapse;
                    width: 98%;
                    }
                th {
                    height: 26px;
                    }
                .header-text{
                  text-align:center;
                }
                .header-text h3{
                  margin:0;
                }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <h3>Inter Service Course List</h3>
          
          </div>
          <br>
          <hr>
          ${printContents}
          
        </body>
      </html>`);
    popupWin.document.close();
  }
  deleteItem(row) {
    const id = row.courseDurationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.CourseDurationService.delete(id).subscribe(() => {
          this.getCourseDurationForInterService();
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


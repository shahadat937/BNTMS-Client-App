import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CourseDurationService } from '../service/courseduration.service';
import { CourseDuration } from '../models/courseduration';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import {TraineeNominationService} from '../service/traineenomination.service'
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-coursecreatenbcd-list',
  templateUrl: './coursecreatenbcd-list.component.html',
  styleUrls: ['./coursecreatenbcd-list.component.sass']
})
export class CourseCreateNbcdListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CourseDuration[] = [];
  isLoading = false;
  fileUrl = environment.fileUrl;
  courseTypeId=MasterData.coursetype.LocalCourse;
  groupArrays:{ schoolName: string; courses: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: 100,
    length: 1
  }
  searchText="";
  candidateCount:any;
  passOutStatus:any;
nbcdCourseList:any[];
role:any;
traineeId:any;
branchId:any;
showHideDiv= false;

  displayedColumns: string[] = ['ser', 'schoolName', 'courseName', 'professional', 'noOfCandidates', 'nbcd', 'durationFrom', 'durationTo', 'remark', 'actions'];

  //displayedColumns: string[] = ['ser','schoolName','courseName', 'professional','nbcd','durationFrom','durationTo', 'remark', 'actions'];

  dataSource: MatTableDataSource<CourseDuration> = new MatTableDataSource();


   selection = new SelectionModel<CourseDuration>(true, []);

  
  constructor(private datepipe: DatePipe, private authService: AuthService,private snackBar: MatSnackBar,private TraineeNominationService: TraineeNominationService,private CourseDurationService: CourseDurationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

     this.getCourseDurationListForNbcdSchool();
     //this.getTraineeNominationsByCourseDurationId(3183);
  }
  getCourseDurationListForNbcdSchool(){
    this.isLoading = true;
    this.CourseDurationService.getCourseDurationListForNbcdSchool(this.branchId).subscribe(response => {
      this.nbcdCourseList = response; 

      // this gives an object with dates as keys
      const groups = this.nbcdCourseList.reduce((groups, courses) => {
        const schoolName = courses.schoolName;
        if (!groups[schoolName]) {
          groups[schoolName] = [];
        }
        groups[schoolName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((schoolName) => {
        return {
          schoolName,
          courses: groups[schoolName]
        };
      });
      console.log(this.groupArrays);

     // this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      console.log(response);
    })
  }

  getDateComparision(obj){

    var currentDate = this.datepipe.transform((new Date), 'MM/dd/yyyy');
    //Date dateTime11 = Convert.ToDateTime(dateFrom);  
    var current = new Date(currentDate);
    // var date1 = new Date(obj.durationFrom); 
	  var date2 =  new Date(obj.durationTo);
    console.log(obj)
    console.log(current, date2)
    console.log(this.passOutStatus);

    if(current > date2){
      this.passOutStatus = 1;
    }else{
      this.passOutStatus = 0;
    }
    console.log(this.passOutStatus);
    // else if(current >= date1 && current <= date2){
    //   this.weekStatus = 2;
    // }else if(current < date1){
    //   this.weekStatus = 3;
    // }else{
    // }
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCourseDurationListForNbcdSchool();
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCourseDurationListForNbcdSchool();
  } 

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
  }

  addCourse(rowValue){
    console.log("event");
    console.log(this.branchId);
    this.confirmService.confirm('Confirm Add message', 'Are You Sure Add This Course').subscribe(result => {
      console.log(result);
      if (result) {
        this.loading = true;
        this.CourseDurationService.saveCourseDurationNbcd(rowValue,this.branchId).subscribe(response => {
            this.reloadCurrentRoute();
        //  this.router.navigateByUrl('/course-management/courseduration-list');
      //  this.
          this.snackBar.open('Information Inserted Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-success'
          });
        },
        )
      }
    }) 
  }
  toggle(){
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle(){
    this.showHideDiv= false;
    this.print();
  }
  print(){ 
     
    let printContents, popupWin;
    printContents = document.getElementById('print-routine').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
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
                    .tbl-by-group tr .cl-action {
                      display:none;
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
                .header-text, td{
                  text-align:center;
                }
                .header-text h3{
                  margin:0;
                }
                
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <h3>NBCD Course List</h3>
         
          </div>
          <br>
          <hr>
          
          ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();

}
  deleteItem(row) {
    const id = row.courseDurationId; 
    console.log("Course Duration id");
    console.log(id);
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.CourseDurationService.delete(id).subscribe(() => {
         this.getCourseDurationListForNbcdSchool();
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

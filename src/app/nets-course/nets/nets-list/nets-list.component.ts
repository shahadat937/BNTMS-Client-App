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
import { dashboardService } from 'src/app/admin/dashboard/services/dashboard.service';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { TraineeNominationService } from '../../service/traineenomination.service';




@Component({
  selector: 'app-nets-list',
  templateUrl: './nets-list.component.html',
  styleUrls: ['./nets-list.component.sass']
})
export class NetsListComponent implements OnInit {
  masterData = MasterData;
 loading = false;
 ELEMENT_DATA: CourseDuration[] = [];
 isLoading = false;
 fileUrl = environment.fileUrl;
 courseTypeId=MasterData.coursetype.LocalCourse;
 groupArrays:{ schoolName: string; courses: any; }[];
 paging = {
   pageIndex: this.masterData.paging.pageIndex,
   pageSize: 1000,
   length: 1
 }
 searchText="";
 candidateCount:any;
 passOutStatus:any;
 localCourseList:any;

 displayedColumns: string[] = ['ser', 'baseSchoolName', 'courseName', 'professional', 'noOfCandidates', 'nbcd', 'durationFrom', 'durationTo', 'remark', 'actions'];

 //displayedColumns: string[] = ['ser','baseSchoolName','courseName', 'professional','nbcd','durationFrom','durationTo', 'remark', 'actions'];

 dataSource: MatTableDataSource<CourseDuration> = new MatTableDataSource();


  selection = new SelectionModel<CourseDuration>(true, []);

 
 constructor(private datepipe: DatePipe,private dashboardService:dashboardService,  private snackBar: MatSnackBar,private TraineeNominationService: TraineeNominationService,private CourseDurationService: CourseDurationService,private router: Router,private confirmService: ConfirmService) { }

 ngOnInit() {
   // this.getCourseDurationsByCourseType(0);
    //this.getTraineeNominationsByCourseDurationId(3183);
    this.getCourseDurationFilterList(1);
 }
 getCourseDurationsByCourseType(){
   this.isLoading = true;
   this.CourseDurationService.getCourseDurationsByCourseType(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.courseTypeId).subscribe(response => {
     this.dataSource.data = response.items; 

     // this gives an object with dates as keys
     const groups = this.dataSource.data.reduce((groups, courses) => {
       const schoolName = courses.baseSchoolName;
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
     console.log("group"); 

     this.paging.length = response.totalItemsCount    
     this.isLoading = false;
     console.log(response);
   })
 }

 getCoursesByViewType(viewStatus){

   if(viewStatus==1){
    this.getCourseDurationFilterList(viewStatus)
   }
   else if(viewStatus==2){
     this.getCourseDurationFilterList(viewStatus)
   }
   else if(viewStatus==3){
     let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
     this.dashboardService.getUpcomingCourseListByBase(currentDateTime,0).subscribe(response => {         
       
       this.localCourseList=response;
 
       console.log("school name");  
       // this gives an object with dates as keys
       const groups = this.localCourseList.reduce((groups, courses) => {
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
 
     })
   }
 }

 getCourseDurationFilterList(viewStatus){
   this.CourseDurationService.getCourseDurationFilter(viewStatus,this.masterData.coursetype.NETS).subscribe(response => {
     this.localCourseList = response; 

     // this gives an object with dates as keys
     const groups = this.localCourseList.reduce((groups, courses) => {
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
     console.log("group");
     
     console.log('all school ' , this.groupArrays);
     console.log(this.groupArrays);

     // this.paging.length = response.totalItemsCount    
     // this.isLoading = false;
     console.log(response);
   })
 }
 
 getDateComparision(obj){

   var currentDate = this.datepipe.transform((new Date), 'MM/dd/yyyy');
   //Date dateTime11 = Convert.ToDateTime(dateFrom);  
   var current = new Date(currentDate);
   // var date1 = new Date(obj.durationFrom); 
   var date2 =  new Date(obj.durationTo);
   

   if(current > date2){
     this.passOutStatus = 1;
   }else{
     this.passOutStatus = 0;
   }
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
   this.getCourseDurationsByCourseType();
 }
 applyFilter(searchText: any){ 
   this.searchText = searchText;
   this.getCourseDurationsByCourseType();
 } 

 // getTraineeNominationsByCourseDurationId(courseDurationId) {
 //   console.log(courseDurationId)
 //   this.CourseDurationService.getNominatedTraineeCountByDurationId(courseDurationId).subscribe(res => {
 //     this.candidateCount = res.countedTrainee;
 //   });
 //   console.log(courseDurationId +"="+this.candidateCount)
 // }

 deleteItem(row) {
   const id = row.courseDurationId; 
   console.log("Course Duration id");
   console.log(id);
   this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
     console.log(result);
     if (result) {
       this.CourseDurationService.delete(id).subscribe(() => {
        this.getCourseDurationsByCourseType();
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

import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseWeek} from '../../models/CourseWeek'
import {CourseWeekService} from '../../service/CourseWeek.service'
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-courseweek-list',
  templateUrl: './courseweek-list.component.html',
  styleUrls: ['./courseweek-list.component.sass'] 
})
export class CourseWeekListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CourseWeek[] = [];
  isLoading = false;
  btnText:string;
  branchId:any;
  traineeId:any;
  role:any;
  schoolId:any;
  schoolName:any;
  currentDate:any;
  courseDurationId:any;
  weekList:any;
  weekStatus:any;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: 100,
    length: 1
  }
  searchText="";
  groupArrays:{ courseName: string; courses: any; }[];

  displayedColumns: string[] = ['ser','courseName','weekName','dateFrom','dateTo', 'actions'];
  dataSource: MatTableDataSource<CourseWeek> = new MatTableDataSource();


   selection = new SelectionModel<CourseWeek>(true, []);

  
  constructor(private snackBar: MatSnackBar,private datepipe: DatePipe, private route: ActivatedRoute,private authService: AuthService,private CourseWeekService: CourseWeekService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {

    

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.schoolId = this.branchId;
    //console.log(this.schoolId)
    this.CourseWeekService.find(this.schoolId).subscribe(response => {  
      this.schoolId= response.baseSchoolNameId
          //this.schoolId = response.courseNameId  
      // this.schoolName = response.schoolName;
      // console.log(this.schoolName);
    })

    this.getCourseWeeks(this.branchId,this.courseDurationId);
    
  }

  getDateComparision(obj){
    this.currentDate = this.datepipe.transform((new Date), 'MM/dd/yyyy');
    //Date dateTime11 = Convert.ToDateTime(dateFrom);  
    var current = new Date(this.currentDate);
    var date1 = new Date(obj.dateFrom); 
	  var date2 =  new Date(obj.dateTo);
    console.log(obj)
    console.log(current, date1, date2)

    if(current > date2){
      this.weekStatus = 1;
    }else if(current >= date1 && current <= date2){
      this.weekStatus = 2;
    }else if(current < date1){
      this.weekStatus = 3;
    }else{
    }
  }
 
  getCourseWeeks(baseSchoolNameId,courseDurationId) {
    this.isLoading = true;
    this.CourseWeekService.getCourseWeeks(this.paging.pageIndex, this.paging.pageSize,this.searchText,baseSchoolNameId,courseDurationId).subscribe(response => {
      this.weekList = response.items; 
      console.log(this.weekList)

      // this gives an object with dates as keys
      const groups = this.dataSource.data.reduce((groups, courses) => {
        const schoolName = courses.weekName;
        if (!groups[schoolName]) {
          groups[schoolName] = [];
        }
        groups[schoolName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((courseName) => {
        return {
          courseName,
          courses: groups[courseName]
        };
      });
      console.log(this.groupArrays);


      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCourseWeeks(this.branchId,this.courseDurationId);
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCourseWeeks(this.branchId,this.courseDurationId);
  }  
 
  deleteItem(row) {
    const id = row.courseWeekId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      if (result) {
        this.CourseWeekService.delete(id).subscribe(() => {
          this.getCourseWeeks(this.branchId,this.courseDurationId);
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

  inActiveItem(row){
    const id = row.courseWeekId;    
    if(row.status == 0){
      this.confirmService.confirm('Confirm Status Updated message', 'Are You Sure  Updated This Item').subscribe(result => {
        if (result) {
          this.CourseWeekService.ChangeCourseWeekStatus(id,1).subscribe(() => {
            this.getCourseWeeks(this.branchId,this.courseDurationId);
            this.snackBar.open('Status Updated Successfully ', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-warning'
            });
          })
        }
      })
    }
    else{
      this.confirmService.confirm('Confirm Status Updated message', 'Are You Sure  Updated This Item').subscribe(result => {
        if (result) {
          this.CourseWeekService.ChangeCourseWeekStatus(id,0).subscribe(() => {
            this.getCourseWeeks(this.branchId,this.courseDurationId);
            this.snackBar.open('Information Updated Successfully ', '', { 
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
          })
        }
      })
    }
  }
}

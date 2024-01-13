import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-courseinstructorlist-dashboard',
  templateUrl: './courseinstructorlist-dashboard.component.html',
  styleUrls: ['./courseinstructorlist-dashboard.component.sass']
})
export class CourseInstructorListDashboardComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  destination:string;
  InstructorByCourse:any;
  localCourseCount:number;
  InstructorList:any;
  runningCourses:any;
  dbType:any;
  courseDurationId:any;
  courseTypeId:any;
  schoolId:any;

  branchId: any;
  traineeId: any;
  role: any;
  
  groupArrays: { schoolname: string; courses: any }[];
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedInstructorColumns: string[] = ['ser','course','instructorCount','actions'];

  constructor(private datepipe: DatePipe,private authService: AuthService,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId = this.authService.currentUserValue.traineeId.trim();
    // this.branchId =  this.authService.currentUserValue.branchId.trim();
    this.branchId = this.authService.currentUserValue.branchId ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId);

    //this.getTraineeNominations();
    //var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    this.dbType = this.route.snapshot.paramMap.get('dbType'); 
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    console.log("rr"+this.schoolId)
    this.getInstructorByCourse(this.schoolId);
    if (this.role == this.userRole.CO || this.role == this.userRole.TrainingOffice ||  this.role == this.userRole.TC ||  this.role == this.userRole.TCO) {
      this.getInstructorBySchoolForBase(this.branchId);
    } else {
      this.getInstructorByCourse(this.schoolId);
    }
  }

  getInstructorByCourse(schoolId){
    this.schoolDashboardService.getInstructorByCourse(schoolId).subscribe(response => {         
      this.InstructorList=response;
      console.log(response)
    })
  }

  getInstructorBySchoolForBase(baseId){
    this.schoolDashboardService.getInstructorBySchoolForBase(baseId).subscribe((response) => {
      this.InstructorList = response;
      console.log(this.InstructorList);
      const groups = this.InstructorList.reduce((groups, courses) => {
        const schoolname = courses.schoolName;
        if (!groups[schoolname]) {
          groups[schoolname] = [];
        }
        groups[schoolname].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((schoolname) => {
        return {
          schoolname,
          courses: groups[schoolname],
        };
      });

      console.log(this.groupArrays);
    });
  }
}

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
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-readingmateriallistdashboard.component',
  templateUrl: './readingmateriallistdashboard.component.html',
  styleUrls: ['./readingmateriallistdashboard.component.sass']
})
export class ReadingMateriallistDashboardComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  destination:string;
  MaterialByCourse:any;
  ReadIngMaterialList:any;
  schoolId:any;
  branchId:any;
  traineeId:any;
  role:any;
  groupArrays:{ schoolname: string; courses: any; }[];
  fileUrl:any = environment.fileUrl;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedReadingMaterialColumns: string[] = ['ser','course','materialCount','actions'];

  constructor(private datepipe: DatePipe,private authService: AuthService,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    // this.branchId =  this.authService.currentUserValue.branchId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    this.getReadingMetarialBySchool(this.schoolId);
    if(this.role == this.userRole.CO || this.role == this.userRole.TrainingOffice || this.role == this.userRole.TC || this.role == this.userRole.TCO){
      this.getReadingMetarialByBase(this.branchId);
    }else{
      this.getReadingMetarialBySchool(this.schoolId);
    }

  }

  getReadingMetarialBySchool(schoolId){
    this.schoolDashboardService.getReadingMetarialBySchool(schoolId).subscribe(response => {   
      this.ReadIngMaterialList=response;
      console.log(response)
    })
  }

  getReadingMetarialByBase(schoolId){
    this.schoolDashboardService.getReadingMetarialByBase(schoolId).subscribe(response => {   
      this.ReadIngMaterialList=response;
      console.log(response)
      const groups = this.ReadIngMaterialList.reduce((groups, courses) => {
        const schoolname = courses.schoolname;
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
          courses: groups[schoolname]
        };
      });

      console.log(this.groupArrays)
    })
  }
}

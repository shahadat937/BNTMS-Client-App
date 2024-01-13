import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { dashboardService } from '../services/dashboard.service';
//import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-routinesoftcopytrainee.component',
  templateUrl: './routinesoftcopytrainee.component.html',
  styleUrls: ['./routinesoftcopytrainee.component.sass']
})
export class RoutineSoftcopyTraineeComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  materialList:any;
  MaterialByCourse:any;
  traineeId:any;
  ReadIngMaterialList:any;
  schoolId:any;
  role:any;
  //traineeId:any;
  branchId:any;
  fileUrl:any = environment.fileUrl;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedReadingMaterialColumns: string[] = ['ser','course','documentName','documentLink'];
  constructor(private datepipe: DatePipe,private authService: AuthService,private dashboardService: dashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
  //  this.traineeId = this.route.snapshot.paramMap.get('traineeId');
  //  this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId');
  this.role = this.authService.currentUserValue.role.trim();
  this.traineeId =  this.authService.currentUserValue.traineeId.trim();
  //this.branchId =  this.authService.currentUserValue.branchId.trim();
  console.log(this.role, this.traineeId, this.branchId)

   this.getRoutineSoftCopyByTrainee(this.traineeId);
  }
  getRoutineSoftCopyByTrainee(id){
    this.dashboardService.getRoutineSoftCopyByTrainee(id).subscribe(res=>{
      this.materialList = res;
      console.log("material list---");
      console.log(this.materialList);
      console.log(res)
    });
  }
}

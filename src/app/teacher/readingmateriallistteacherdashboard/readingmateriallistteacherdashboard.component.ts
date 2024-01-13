import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { InstructorDashboardService } from '../services/InstructorDashboard.service';
//import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-readingmateriallistteacherdashboard.component',
  templateUrl: './readingmateriallistteacherdashboard.component.html',
  styleUrls: ['./readingmateriallistteacherdashboard.component.sass']
})
export class ReadingMaterialListTeacherDashboardComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  materialList:any;
  MaterialByCourse:any;
  traineeId:any;
  ReadIngMaterialList:any;
  schoolId:any;
  fileUrl:any = environment.fileUrl;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedReadingMaterialColumns: string[] = ['ser','readingMaterialTitle','documentName','aurhorName','publisherName','documentLink'];
  constructor(private datepipe: DatePipe,private instructorDashboardService: InstructorDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
   this.traineeId = this.route.snapshot.paramMap.get('traineeId');
   this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId');
   this.getReadingMetarialByInstructor(this.schoolId);
  }
  getReadingMetarialByInstructor(id){
    this.instructorDashboardService.getSpReadingMaterialByTraineeId(id).subscribe(res=>{
      this.materialList = res;
      console.log("material list---");
      console.log(this.materialList);
      console.log(res)
    });
  }
}

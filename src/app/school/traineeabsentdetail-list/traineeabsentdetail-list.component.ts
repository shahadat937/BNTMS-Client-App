import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseInstructor} from '../../subject-management/models/courseinstructor';
import {SchoolDashboardService} from '../services/SchoolDashboard.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-traineeabsentdetail-list',
  templateUrl: './traineeabsentdetail-list.component.html',
  styleUrls: ['./traineeabsentdetail-list.component.sass']
})
export class TraineeAbsentDetailListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  TraineeAbsentDetail:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[]= ['ser','moduleName','subjectName','attendanceDate', 'periodName',  'attendanceRemarksCause'];
  
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private schoolDashboardService: SchoolDashboardService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.onModuleSelectionChangeGetsubjectList();
    
  }

  onModuleSelectionChangeGetsubjectList(){
    var traineeId = this.route.snapshot.paramMap.get('traineeId'); 
    this.schoolDashboardService.getTraineeAbsentDetail(Number(traineeId)).subscribe(res=>{
      this.TraineeAbsentDetail=res;  
    }); 
  }

}

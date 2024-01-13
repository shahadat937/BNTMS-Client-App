import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDashboardService } from '../services/StudentDashboard.service';

@Component({
  selector: 'app-teacherevaluation',
  templateUrl: './teacherevaluation-list.component.html',
  styleUrls: ['./teacherevaluation-list.component.sass']
})
export class TeacherEvaluationListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  CourseModuleByCourseName:any;
  status=1;
  traineeId:any;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedCourseModuleColumns: string[] = ['ser','course','subjectName','name','actions'];


  
  constructor(private snackBar: MatSnackBar,private studentDashboardService: StudentDashboardService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId');
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    console.log(this.traineeId,baseSchoolNameId,courseNameId,courseDurationId)
    this.getTdecQuestionGroupListBySp(baseSchoolNameId,courseNameId,courseDurationId)
  }

  getTdecQuestionGroupListBySp(baseSchoolNameId,courseNameId,courseDurationId){
    this.studentDashboardService.getTdecQuestionGroupListBySp(baseSchoolNameId,courseNameId,courseDurationId).subscribe(res=>{
      this.CourseModuleByCourseName = res;
      console.log("Evaluation list");
      console.log(this.CourseModuleByCourseName)
    });
  }

}

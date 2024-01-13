import { Component, OnInit  } from '@angular/core';
import { BNASubjectName } from '../../../subject-management/models/BNASubjectName';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{ MasterData } from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { BNAExamMarkService } from '../../../exam-management/service/bnaexammark.service';

@Component({
  selector: 'app-marklistbycourse',
  templateUrl: './marklistbycourse-list.component.html',
  styleUrls: ['./marklistbycourse-list.component.sass']
})
export class MarkListByCourseComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  status=1;
  marklistbycourse:any[];
  dbType:Number = 0;
  dbType1:any;
  dbType2:any;
  courseType:Number;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  
  displayedColumns: string[] ;
  //displayedColumns: string[] = ['ser','pno','name','rankposition','course','courseTitle','subjectName','totalMark','passMarkBna', 'obtaintMark'];
  //displayedColumns: string[] = ['pno','name','position','general Navigation ','instrument','relvel and Fleet Work','rule of The Road'];


   selection = new SelectionModel<BNASubjectName>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BNAExamMarkService: BNAExamMarkService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
   
    this.getTraineeMarkListByDuration();
    
  }
 
  getTraineeMarkListByDuration() {
    this.isLoading = true;
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    this.dbType = Number(this.route.snapshot.paramMap.get('dbType')); 
    this.dbType1=this.route.snapshot.paramMap.get('dbType1');
    this.dbType2=this.route.snapshot.paramMap.get('dbType2');
    this.courseType = Number(this.route.snapshot.paramMap.get('courseTypeId')); 
    console.log("db type"+this.dbType1)
    this.BNAExamMarkService.getTraineeMarkListByDuration(courseDurationId).subscribe(res=>{
      this.marklistbycourse=res;  
      console.log("1"); 
      console.log(this.dbType); 
      this.displayedColumns =[...Object.keys(this.marklistbycourse[0])];
      console.log([...Object.keys(this.marklistbycourse[0])]);
  //displayedColumns: string[] = [...Object.keys(this.marklistbycourse[0])];
   
    
    });
  }

  
}

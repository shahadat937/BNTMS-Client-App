import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BNASubjectName } from '../../subject-management/models/BNASubjectName';
import { BNASubjectNameService } from '../../subject-management/service/BNASubjectName.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewsubjectbymodule',
  templateUrl: './viewsubjectbymodule-list.component.html',
  styleUrls: ['./viewsubjectbymodule-list.component.sass']
})
export class ViewSubjectListByModuleComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  courseNameId:any;
  status=1;
  SelectedsubjectsBySchoolAndCourse:BNASubjectName[];
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','subjectName','subjectTypeName','totalPeriod','totalMark','passMarkBNA','actions'];


   selection = new SelectionModel<BNASubjectName>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSubjectNames();
    
  }
 
  getSubjectNames() {
    this.isLoading = true;
    var baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    var courseModuleId = this.route.snapshot.paramMap.get('courseModuleId'); 
    this.BNASubjectNameService.getbnaSubjectListForStudentDashboard(baseSchoolNameId,this.courseNameId,courseModuleId).subscribe(res=>{
      this.SelectedsubjectsBySchoolAndCourse=res;  
    });
  }

}

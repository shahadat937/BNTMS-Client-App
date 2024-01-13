import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectMark } from '../../../subject-management/models/SubjectMark';
import { SubjectMarkService } from '../../../subject-management/service/SubjectMark.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-viewsubjectmarkbysubject',
  templateUrl: './viewsubjectmarkbysubject-list.component.html',
  styleUrls: ['./viewsubjectmarkbysubject-list.component.sass']
})
export class ViewSubjectMarkListBySubjectComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  ELEMENT_DATA: SubjectMark[] = [];
  isLoading = false;
  baseSchoolNameId:any;
  courseNameId:any;
  bnaSubjectNameId:any;
  courseListStatus:any;
  traineeId:any;
  role:any;
  courseDurationId:any;
  courseName:string;
  traineeDb:any;
  status=1;
  SelectedsubjectMarksBySubject:SubjectMark[];
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'markType', 'mark', 'passMark'];


   selection = new SelectionModel<SubjectMark>(true, []);

  
  constructor(private snackBar: MatSnackBar, private authService: AuthService ,private SubjectMarkService: SubjectMarkService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    const branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    this.getSubjectMarks();
  }
 
  getSubjectMarks() {
    console.log(this.role)
    this.isLoading = true;
    this.traineeDb = 1;
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    this.courseListStatus = this.route.snapshot.paramMap.get('courseListStatus'); 
    //console.log(this.baseSchoolNameId,this.courseNameId,bnaSubjectNameId)
    this.SubjectMarkService.getSelectedsubjectMarksBySubject(Number(this.baseSchoolNameId),Number(this.courseNameId),Number(this.bnaSubjectNameId)).subscribe(res=>{
      this.SelectedsubjectMarksBySubject=res;  
    });
  }

  
}

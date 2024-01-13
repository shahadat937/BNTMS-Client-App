import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BNAExamInstructorAssign} from '../../../exam-management/models/bnaexaminstructorassign';
import {BNAExamInstructorAssignService} from '../../../exam-management/service/bnaexaminstructorassign.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-examinstructor-list',
  templateUrl: './examinstructor-list.component.html',
  styleUrls: ['./examinstructor-list.component.sass']
})
export class ExamInstructorListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNAExamInstructorAssign[] = [];
  isLoading = false;
  GetInstructorByParameters:BNAExamInstructorAssign[];
  baseSchoolNameId:any;
  courseNameId:any;
  courseTypeId: number;
  dbType:any;
  schooldash:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[]= ['ser','trainee','bnaSubjectName','classRoutine'];
  
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private BNAExamInstructorAssignService: BNAExamInstructorAssignService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.onModuleSelectionChangeGetsubjectList();
   
  }
 
  // getCourseInstructors() {
  //   this.isLoading = true;
  //   this.CourseInstructorService.getCourseInstructors(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     
  //     console.log(response);
  //     this.dataSource.data = response.items; 
  //     this.paging.length = response.totalItemsCount    
  //     this.isLoading = false;
  //   })
  // }

  onModuleSelectionChangeGetsubjectList(){
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    var courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    this.schooldash=this.route.snapshot.paramMap.get('schooldash');
    this.dbType=this.route.snapshot.paramMap.get('dbType'); 
    console.log('1111');
    console.log(this.schooldash)
    if(this.baseSchoolNameId != null && courseNameId !=null){
      this.BNAExamInstructorAssignService.getInstructorBySchoolAndCourse(this.baseSchoolNameId,courseNameId).subscribe(res=>{
        this.GetInstructorByParameters=res;  
        console.log(this.GetInstructorByParameters); 
      }); 
    }
  }

  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getCourseInstructors();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getCourseInstructors();
  // } 

  // deleteItem(row) {
  //   const id = row.courseInstructorId; 
  //   this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.CourseInstructorService.delete(id).subscribe(() => {
  //         this.getCourseInstructors();
  //         this.snackBar.open('Information Deleted Successfully ', '', {
  //           duration: 3000,
  //           verticalPosition: 'bottom', 
  //           horizontalPosition: 'right',
  //           panelClass: 'snackbar-danger'
  //         });
  //       })
  //     }
  //   })
    
  // }
}

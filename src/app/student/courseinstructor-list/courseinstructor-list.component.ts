import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {CourseInstructor} from '../../subject-management/models/courseinstructor';
import {CourseInstructorService} from '../../subject-management/service/courseinstructor.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courseinstructor-list',
  templateUrl: './courseinstructor-list.component.html',
  styleUrls: ['./courseinstructor-list.component.sass']
})
export class CourseInstructorListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CourseInstructor[] = [];
  isLoading = false;
  GetInstructorByParameters:CourseInstructor[];
  baseSchoolNameId:any;
  courseNameId:any;
  courseModuleId:any;
  courseDurationId:any;
  courseSectionId:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[]= ['ser','courseName','bnaSubjectName','trainee'];
  
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute,private CourseInstructorService: CourseInstructorService,private router: Router,private confirmService: ConfirmService) { }

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
    var bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    this.courseModuleId = this.route.snapshot.paramMap.get('courseModuleId'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    this.courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.courseSectionId = this.route.snapshot.paramMap.get('courseSectionId'); 
    if(this.baseSchoolNameId != null && bnaSubjectNameId != null && this.courseModuleId !=null && this.courseNameId !=null && this.courseSectionId !=null){
      this.CourseInstructorService.getInstructorByParameters(this.baseSchoolNameId,bnaSubjectNameId,this.courseModuleId,this.courseNameId, this.courseDurationId, this.courseSectionId).subscribe(res=>{
        this.GetInstructorByParameters=res;  
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

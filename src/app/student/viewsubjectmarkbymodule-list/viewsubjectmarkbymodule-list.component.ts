import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubjectMark } from '../../subject-management/models/SubjectMark';
import { SubjectMarkService } from '../../subject-management/service/SubjectMark.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewsubjectmarkbymodule',
  templateUrl: './viewsubjectmarkbymodule-list.component.html',
  styleUrls: ['./viewsubjectmarkbymodule-list.component.sass']
})
export class ViewSubjectMarkListByModuleComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: SubjectMark[] = [];
  isLoading = false;
  baseSchoolNameId:any;
  courseNameId:any;
  courseModuleId:any;
  courseName:string;
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

  
  constructor(private snackBar: MatSnackBar,private SubjectMarkService: SubjectMarkService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSubjectMarks();
  }
 
  getSubjectMarks() {
    this.isLoading = true;
    this.baseSchoolNameId = this.route.snapshot.paramMap.get('baseSchoolNameId'); 
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    var bnaSubjectNameId = this.route.snapshot.paramMap.get('bnaSubjectNameId'); 
    this.courseModuleId = this.route.snapshot.paramMap.get('courseModuleId'); 
    //console.log(this.baseSchoolNameId,this.courseNameId,bnaSubjectNameId)
    this.SubjectMarkService.getSelectedsubjectMarksBySubject(Number(this.baseSchoolNameId),Number(this.courseNameId),Number(bnaSubjectNameId)).subscribe(res=>{
      this.SelectedsubjectMarksBySubject=res;  
    });
  }

  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getSubjectMarks();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getSubjectMarks();
  // } 

  // deleteItem(row) {
  //   const id = row.SubjectMarkId; 
  //   this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This SubjectMark Item').subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.SubjectMarkService.delete(id).subscribe(() => {
  //         this.getSubjectMarks();
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

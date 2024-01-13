import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
//import { BNASubjectName } from '../../../subject-management/models/BNASubjectName';
//import { BNASubjectNameService } from '../../../subject-management/service/BNASubjectName.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { BNASubjectNameService } from '../../service/BNASubjectName.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { BNASubjectName } from '../../models/BNASubjectName';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-viewsubjectbyqexam',
  templateUrl: './viewsubjectbyqexam-list.component.html',
  styleUrls: ['./viewsubjectbyqexam-list.component.sass']
})
export class ViewSubjectListByQExamComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  status=1;
  isShown: boolean = false;
  subjectNameList: BNASubjectName[];
  selectedBranch: SelectedModel[];
  //SelectedsubjectsBySchoolAndCourse:BNASubjectName[];
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['paperNo', 'subjectName', 'totalMark', 'passMarkBna','qExamTime', 'remarks'];


   selection = new SelectionModel<BNASubjectName>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.onSelectionChange();
    this.getSelectedBranch();
    
  }
  onSelectionChange() {
    this.isLoading = true;
    //this.isShown = true;
    this.BNASubjectNameService.getselectedSubjectName().subscribe(res => {
      this.subjectNameList = res
      console.log(this.subjectNameList);
    });
  }
  getSelectedBranch() {
    this.BNASubjectNameService.getSelectedBranch().subscribe(res => {
      this.selectedBranch = res
    });
  }
  onBranchSelectionChange(dropdown){
    this.isShown=true;
    if(dropdown.isUserInput) {
      this.BNASubjectNameService.getselectedSubjectNameByBranchId(dropdown.source.value,1252).subscribe(res=>{
        this.subjectNameList=res
        console.log(this.subjectNameList); 
      });
    }
  }
 
  
  // deleteItem(row) {
  //   const id = row.bnaSubjectNameId; 
  //   this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This BNASubjectName Item').subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.BNASubjectNameService.delete(id).subscribe(() => {
  //         this.getBNASubjectNames();
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

import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BNASubjectName } from '../../models/BNASubjectName';
import { BNASubjectNameService } from '../../service/BNASubjectName.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subjectname-list',
  templateUrl: './subjectname-list.component.html',
  styleUrls: ['./subjectname-list.component.sass']
})
export class SubjectnameListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  status=2;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','subjectName','subjectCode','subjectType','kindOfSubject','totalMark','passMarkBna',/*'bnaSemesterId','courseNameId','isActive',*/ 'actions'];
  dataSource: MatTableDataSource<BNASubjectName> = new MatTableDataSource();


   selection = new SelectionModel<BNASubjectName>(true, []);

  
  constructor(private snackBar: MatSnackBar,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBNASubjectNames();
    
  }
 
  getBNASubjectNames() {
    this.isLoading = true;
    this.BNASubjectNameService.getBNASubjectNames(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.status).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBNASubjectNames();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBNASubjectNames();
  } 

  deleteItem(row) {
    const id = row.bnaSubjectNameId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This BNASubjectName Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNASubjectNameService.delete(id).subscribe(() => {
          this.getBNASubjectNames();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })
    
  }
}

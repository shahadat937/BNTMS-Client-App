import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TdecQuestionName } from '../../models/TdecQuestionName';
import { TdecQuestionNameService } from '../../service/TdecQuestionName.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-tdecquestionname-list',
  templateUrl: './tdecquestionname-list.component.html',
  styleUrls: ['./tdecquestionname-list.component.sass']
})
export class TdecQuestionNameListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TdecQuestionName[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','name',  'actions'];
  dataSource: MatTableDataSource<TdecQuestionName> = new MatTableDataSource();
  role:any;
  traineeId:any;
  branchId:any;
  selection = new SelectionModel<TdecQuestionName>(true, []);

  
  constructor(private route: ActivatedRoute,private authService: AuthService,private snackBar: MatSnackBar,private TdecQuestionNameService: TdecQuestionNameService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    this.getTdecQuestionNames();
  //  this.getTdecQuestionNameFilteredResult();
  }
  
  // getTdecQuestionNameFilteredResult(){
//this.branchId == null ? 1 :this.branchId
  // }

  getTdecQuestionNames() {
    this.isLoading = true;
    this.TdecQuestionNameService.getTdecQuestionNameFiltered(this.paging.pageIndex, this.paging.pageSize,this.searchText,this.branchId == '' ? 0 :this.branchId).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.filteredData.forEach((row) =>
          this.selection.select(row)
        );
  }
  addNew(){
    
  }
 
  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getTdecQuestionNames();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getTdecQuestionNames();
  } 


  deleteItem(row) {
    const id = row.tdecQuestionNameId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.TdecQuestionNameService.delete(id).subscribe(() => {
          this.getTdecQuestionNames();
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

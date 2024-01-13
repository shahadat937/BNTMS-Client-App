import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewEntryEvaluation } from '../../models/NewEntryEvaluation';
import { NewEntryEvaluationService } from '../../service/NewEntryEvaluation.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-newentryevaluation-list',
  templateUrl: './newentryevaluation-list.component.html',
  styleUrls: ['./newentryevaluation-list.component.sass']
})
export class NewEntryEvaluationListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: NewEntryEvaluation[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','traineePNo', 'courseWeek', 'noitikota', 'sahonsheelota','utsaho','samayanubartita', 'manovhab','udyam', 'khapKhawano','onyano',    'actions'];
  dataSource: MatTableDataSource<NewEntryEvaluation> = new MatTableDataSource();

  selection = new SelectionModel<NewEntryEvaluation>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private NewEntryEvaluationService: NewEntryEvaluationService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getNewEntryEvaluations();
  }
  
  getNewEntryEvaluations() {
    this.isLoading = true;
    this.NewEntryEvaluationService.getNewEntryEvaluations(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      console.log("New Entry List");
      console.log(this.dataSource.data);
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
    this.getNewEntryEvaluations();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getNewEntryEvaluations();
  } 


  deleteItem(row) {
    const id = row.newEntryEvaluationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.NewEntryEvaluationService.delete(id).subscribe(() => {
          this.getNewEntryEvaluations();
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

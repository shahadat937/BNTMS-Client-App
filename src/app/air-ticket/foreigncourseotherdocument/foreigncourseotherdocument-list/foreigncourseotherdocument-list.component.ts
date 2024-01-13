import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ForeignCourseOtherDocument } from '../../models/ForeignCourseOtherDocument';
import { ForeignCourseOtherDocumentService } from '../../service/ForeignCourseOtherDocument.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-foreigncourseotherdocumentcomponent-list',
  templateUrl: './foreigncourseotherdocument-list.component.html',
  styleUrls: ['./foreigncourseotherdocument-list.component.sass']
})
export class ForeignCourseOtherDocumentComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ForeignCourseOtherDocument[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','courseDurationId', 'courseNameId',   'foreignCourseDocTypeId', 'status', 'fileUpload',   'actions'];
  dataSource: MatTableDataSource<ForeignCourseOtherDocument> = new MatTableDataSource();

  selection = new SelectionModel<ForeignCourseOtherDocument>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private ForeignCourseOtherDocumentService: ForeignCourseOtherDocumentService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
   // this.getForeignCourseOtherDocuments();
  }
  
  // getForeignCourseOtherDocuments() {
  //   this.isLoading = true;
  //   this.ForeignCourseOtherDocumentService.getForeignCourseOtherDocuments(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

  //     this.dataSource.data = response.items; 
  //     this.paging.length = response.totalItemsCount    
  //     this.isLoading = false;
  //   })
  // }
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
   // this.getForeignCourseOtherDocuments();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    //this.getForeignCourseOtherDocuments();
  } 


  deleteItem(row) {
    const id = row.foreignCourseOthersDocumentId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.ForeignCourseOtherDocumentService.delete(id).subscribe(() => {
         // this.getForeignCourseOtherDocuments();
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

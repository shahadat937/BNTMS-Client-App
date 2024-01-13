import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BNAInstructorType } from '../../models/BNAInstructorType';
import { BNAInstructorTypeService } from '../../service/BNAInstructorType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-BNAInstructorType',
  templateUrl: './bnainstructortype-list.component.html',
  styleUrls: ['./bnainstructortype-list.component.sass']
})
export class BNAInstructorTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNAInstructorType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'instructorTypeName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<BNAInstructorType> = new MatTableDataSource();

  selection = new SelectionModel<BNAInstructorType>(true, []);
  
  constructor(private snackBar: MatSnackBar,private BNAInstructorTypeService: BNAInstructorTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getBNAInstructorTypes();
  }
 
  getBNAInstructorTypes() {
    this.isLoading = true;
    this.BNAInstructorTypeService.getBNAInstructorTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBNAInstructorTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBNAInstructorTypes();
  } 

  deleteItem(row) {
    const id = row.bnaInstructorTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNAInstructorTypeService.delete(id).subscribe(() => {
          this.getBNAInstructorTypes();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })    
  }
}

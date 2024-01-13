import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CodeValueType } from '../../models/CodeValueType';
import { CodeValueTypeService } from '../../service/CodeValueType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-CodeValueType',
  templateUrl: './codevaluetype-list.component.html',
  styleUrls: ['./codevaluetype-list.component.sass']
})
export class CodeValueTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CodeValueType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'type', 'isActive', 'actions'];
  dataSource: MatTableDataSource<CodeValueType> = new MatTableDataSource();

  selection = new SelectionModel<CodeValueType>(true, []);
  
  constructor(private snackBar: MatSnackBar,private CodeValueTypeService: CodeValueTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getCodeValueTypes();
  }
 
  getCodeValueTypes() {
    this.isLoading = true;
    this.CodeValueTypeService.getCodeValueTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCodeValueTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCodeValueTypes();
  } 

  deleteItem(row) {
    const id = row.codeValueTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.CodeValueTypeService.delete(id).subscribe(() => {
          this.getCodeValueTypes();
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

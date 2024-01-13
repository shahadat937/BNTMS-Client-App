import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoCurricularActivityType } from '../../models/CoCurricularActivityType';
import { CoCurricularActivityTypeService } from '../../service/CoCurricularActivityType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-CoCurricularActivityType',
  templateUrl: './cocurricularactivitytype-list.component.html',
  styleUrls: ['./cocurricularactivitytype-list.component.sass']
})
export class CoCurricularActivityTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CoCurricularActivityType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'coCurricularActivityName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<CoCurricularActivityType> = new MatTableDataSource();

  selection = new SelectionModel<CoCurricularActivityType>(true, []);
  
  constructor(private snackBar: MatSnackBar,private CoCurricularActivityTypeService: CoCurricularActivityTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getCoCurricularActivityTypes();
  }
 
  getCoCurricularActivityTypes() {
    this.isLoading = true;
    this.CoCurricularActivityTypeService.getCoCurricularActivityTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCoCurricularActivityTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCoCurricularActivityTypes();
  } 

  deleteItem(row) {
    const id = row.coCurricularActivityTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.CoCurricularActivityTypeService.delete(id).subscribe(() => {
          this.getCoCurricularActivityTypes();
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

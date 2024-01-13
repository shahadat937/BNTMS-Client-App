import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RelationType } from '../../models/RelationType';
import { RelationTypeService } from '../../service/RelationType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-RelationType',
  templateUrl: './relationtype-list.component.html',
  styleUrls: ['./relationtype-list.component.sass']
})
export class RelationTypeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: RelationType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'relationTypeName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<RelationType> = new MatTableDataSource();

  selection = new SelectionModel<RelationType>(true, []);
  
  constructor(private snackBar: MatSnackBar,private RelationTypeService: RelationTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getRelationTypes();
  }
 
  getRelationTypes() {
    this.isLoading = true;
    this.RelationTypeService.getRelationTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getRelationTypes();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getRelationTypes();
  } 

  deleteItem(row) {
    const id = row.relationTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.RelationTypeService.delete(id).subscribe(() => {
          this.getRelationTypes();
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

import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MigrationDocument} from '../../models/migrationdocument'
import {MigrationDocumentService} from '../../service/migrationdocument.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-migrationdocument-list',
  templateUrl: './migrationdocument-list.component.html',
  styleUrls: ['./migrationdocument-list.component.sass']
})
export class MigrationDocumentListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: MigrationDocument[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','traineeId','courseDurationId','traineeNominationId','relationType','actions'];
  dataSource: MatTableDataSource<MigrationDocument> = new MatTableDataSource();


   selection = new SelectionModel<MigrationDocument>(true, []);

  
  constructor(private snackBar: MatSnackBar,private MigrationDocumentService: MigrationDocumentService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getMigrationDocuments();
    
  }
 
  getMigrationDocuments() {
    this.isLoading = true;
    this.MigrationDocumentService.getMigrationDocuments(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getMigrationDocuments();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getMigrationDocuments();
  } 

  deleteItem(row) {
    const id = row.migrationDocumentId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.MigrationDocumentService.delete(id).subscribe(() => {
          this.getMigrationDocuments();
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

import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {TraineeSectionSelection} from '../../models/TraineeSectionSelection'
import {TraineeSectionSelectionService} from '../../service/TraineeSectionSelection.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-TraineeSectionSelection-list',
  templateUrl: './TraineeSectionSelection-list.component.html',
  styleUrls: ['./TraineeSectionSelection-list.component.sass']
})
export class TraineeSectionSelectionListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeSectionSelection[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','bnaBatch','bnaSemester','bnaClassSectionSelection','previewsSection','actions'];
  dataSource: MatTableDataSource<TraineeSectionSelection> = new MatTableDataSource();


   selection = new SelectionModel<TraineeSectionSelection>(true, []);

  
  constructor(private snackBar: MatSnackBar,private TraineeSectionSelectionService: TraineeSectionSelectionService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getTraineeSectionSelections();
    
  }
 
  getTraineeSectionSelections() {
    this.isLoading = true;
    this.TraineeSectionSelectionService.getTraineeSectionSelections(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getTraineeSectionSelections();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getTraineeSectionSelections();
  } 

  deleteItem(row) {
    const id = row.traineeSectionSelectionId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.TraineeSectionSelectionService.delete(id).subscribe(() => {
          this.getTraineeSectionSelections();
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

import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BNAClassSectionSelection } from '../../models/BNAClassSectionSelection';
import { BNAClassSectionSelectionService } from '../../service/BNAClassSectionSelection.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bnaclasssectionselection-list',
  templateUrl: './bnaclasssectionselection-list.component.html',
  styleUrls: ['./bnaclasssectionselection-list.component.sass']
})
export class BnaclasssectionselectionListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNAClassSectionSelection[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'sectionName','isActive', 'actions'];
  dataSource: MatTableDataSource<BNAClassSectionSelection> = new MatTableDataSource();

  selection = new SelectionModel<BNAClassSectionSelection>(true, []);

  constructor(private snackBar: MatSnackBar,private BNAClassSectionSelectionService: BNAClassSectionSelectionService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getBNAClassSectionSelections();
  }
 
  getBNAClassSectionSelections() {
    this.isLoading = true;
    this.BNAClassSectionSelectionService.getBNAClassSectionSelections(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBNAClassSectionSelections();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBNAClassSectionSelections();
  } 

  deleteItem(row) {
    const id = row.bnaClassSectionSelectionId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BNAClassSectionSelectionService.delete(id).subscribe(() => {
          this.getBNAClassSectionSelections();
          this.snackBar.open('BNAClassSectionSelection Information Deleted Successfully ', '', {
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

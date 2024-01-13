import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Rank } from '../../models/Rank';
import { RankService } from '../../service/Rank.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MasterData } from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-Rank-list',
  templateUrl: './Rank-list.component.html',
  styleUrls: ['./Rank-list.component.sass']
})
export class RankListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Rank[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'select', 'sl',/*'rankId',*/ 'rankName','position', 'completeStatus','isActive', 'actions'];
  dataSource: MatTableDataSource<Rank> = new MatTableDataSource();


  selection = new SelectionModel<Rank>(true, []);
  
  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private RankService: RankService,private router: Router,private confirmService: ConfirmService) { }
  // ngOnInit() {
  //   this.dataSource2.paginator = this.paginator;
  // }
  ngOnInit() {
    this.getRanks();
    
  }
 
  getRanks() {
    this.isLoading = true;
    this.RankService.getRanks(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

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
    this.getRanks();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getRanks();
  } 


  deleteItem(row) {
    const id = row.rankId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Rank Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.RankService.delete(id).subscribe(() => {
          this.getRanks();
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

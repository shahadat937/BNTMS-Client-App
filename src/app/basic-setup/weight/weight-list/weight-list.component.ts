import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Weight } from '../../models/weight';
import { WeightService } from '../../service/weight.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-weight',
  templateUrl: './weight-list.component.html',
  styleUrls: ['./weight-list.component.sass']
})
export class WeightListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Weight[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'weightName','isActive', 'actions'];
  dataSource: MatTableDataSource<Weight> = new MatTableDataSource();


  selection = new SelectionModel<Weight>(true, []);
  
  constructor(private snackBar: MatSnackBar,private weightService: WeightService,private router: Router,private confirmService: ConfirmService) { }
  // ngOnInit() {
  //   this.dataSource2.paginator = this.paginator;
  // }
  ngOnInit() {
    this.getWeights();
   // this.refresh();
  }
 
  getWeights() {
    this.isLoading = true;
    this.weightService.getWeights(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
    this.dataSource.data = response.items; 
    this.paging.length = response.totalItemsCount    
    this.isLoading = false;

   // this.isLoading = true;
    //this.weightService.getWeights(this.pageNumber, this.pageSize).subscribe(response => {
      // this.Weights = response.result;
      // this.pagination = response.pagination;
      // this.loading = false;
 
   //   this.dataSource.data = response.items;
    //    setTimeout(() => {
     //     this.paginator.pageIndex = this.pageNumber;
     //     this.paginator.length = response.totalItemsCount;
      //  }); 
      //  this.isLoading = false;
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
    this.getWeights();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getWeights();
  } 


  deleteItem(row) {
    const id = row.weightId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Weight Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.weightService.delete(id).subscribe(() => {
          this.getWeights();
          this.snackBar.open('Weight Information Delete Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })
     //this.WeightService.delete(id).subscribe();

    // const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //   data: row,
    //   direction: tempDirection,
    // });
    // this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
    //   if (result === 1) {
    //     const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
    //       (x) => x.id === this.id
    //     );
       
    //     this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
    //     this.refreshTable();
    //     this.showNotification(
    //       'snackbar-danger',
    //       'Delete Record Successfully...!!!',
    //       'bottom',
    //       'center'
    //     );
    //   }
    //});
  }
}

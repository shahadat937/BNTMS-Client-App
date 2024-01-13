import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentType } from '../../models/PaymentType';
import { PaymentTypeService } from '../../service/PaymentType.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-paymenttype',
  templateUrl: './paymenttype-list.component.html',
  styleUrls: ['./paymenttype-list.component.sass']
})
export class PaymentTypeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: PaymentType[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'paymentTypeName','actions'];
  dataSource: MatTableDataSource<PaymentType> = new MatTableDataSource();


  selection = new SelectionModel<PaymentType>(true, []);
  
  constructor(private snackBar: MatSnackBar,private PaymentTypeService: PaymentTypeService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getPaymentType();
  }
 
  getPaymentType() {
    this.isLoading = true;
    this.PaymentTypeService.getPaymentType(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
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
    this.getPaymentType();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getPaymentType();
  } 


  deleteItem(row) {
    const id = row.paymentTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.PaymentTypeService.delete(id).subscribe(() => {
          this.getPaymentType();
          this.snackBar.open('Information Delete Successfully ', '', {
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

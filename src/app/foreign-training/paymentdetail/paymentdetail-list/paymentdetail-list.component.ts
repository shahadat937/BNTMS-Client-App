import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {PaymentDetail} from '../../models/paymentdetail'
import {PaymentDetailService} from '../../service/paymentdetail.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-paymentdetail-list',
  templateUrl: './paymentdetail-list.component.html',
  styleUrls: ['./paymentdetail-list.component.sass']
})
export class PaymentDetailListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: PaymentDetail[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','traineeId','numberOfInstallment','usdRate','totalUsd','actions'];
  dataSource: MatTableDataSource<PaymentDetail> = new MatTableDataSource();


   selection = new SelectionModel<PaymentDetail>(true, []);

  
  constructor(private snackBar: MatSnackBar,private PaymentDetailService: PaymentDetailService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getPaymentDetails();
    
  }
 
  getPaymentDetails() {
    this.isLoading = true;
    this.PaymentDetailService.getPaymentDetails(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getPaymentDetails();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getPaymentDetails();
  } 

  deleteItem(row) {
    const id = row.paymentDetailId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.PaymentDetailService.delete(id).subscribe(() => {
          this.getPaymentDetails();
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

import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {InstallmentPaidDetail} from '../../models/installmentpaiddetail'
import {InstallmentPaidDetailService} from '../../service/installmentpaiddetail.service'
import { SelectionModel } from '@angular/cdk/collections';
import {  Router  } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-installmentpaiddetail-list',
  templateUrl: './installmentpaiddetail-list.component.html',
  styleUrls: ['./installmentpaiddetail-list.component.sass']
})
export class InstallmentPaidDetailListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: InstallmentPaidDetail[] = [];
  isLoading = false;
  courseDurationId:any;
  traineeId:any;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','totalBdt','scheduleDate','paymentCompletedStatus','actions'];
  dataSource: MatTableDataSource<InstallmentPaidDetail> = new MatTableDataSource();


   selection = new SelectionModel<InstallmentPaidDetail>(true, []);

  
  constructor(private route : ActivatedRoute,private snackBar: MatSnackBar,private InstallmentPaidDetailService: InstallmentPaidDetailService,private router: Router, private confirmService: ConfirmService) { }

  ngOnInit() {
     this.courseDurationId = this.route.snapshot.paramMap.get("courseDurationId");
     this.traineeId = this.route.snapshot.paramMap.get("traineeId");
     console.log(this.courseDurationId);
     console.log(this.traineeId);
    this.getInstallmentPaidDetails();
    
  }
 
  getInstallmentPaidDetails() {
    this.isLoading = true;
    this.InstallmentPaidDetailService.getInstallmentPaidDetails(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getInstallmentPaidDetails();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getInstallmentPaidDetails();
  } 

  deleteItem(row) {
    const id = row.installmentPaidDetailId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.InstallmentPaidDetailService.delete(id).subscribe(() => {
          this.getInstallmentPaidDetails();
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
  inActiveItem(row){
    const id = row.installmentPaidDetailId;    
    //var baseSchoolNameId=this.BulletinForm.value['baseSchoolNameId'];
    if(row.paymentCompletedStatus == 0){
      this.confirmService.confirm('Confirm Deactive message', 'Are You Sure Completed This Installment?').subscribe(result => {
        if (result) {
          this.InstallmentPaidDetailService.ChangepaymentCompletedStatus(id,1).subscribe(() => {
            this.getInstallmentPaidDetails();
            this.snackBar.open('Bulletin Stopped!', '', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-warning'
            });
          })
        }
      })
    }
    else{
      this.confirmService.confirm('Confirm Active message', 'Are You Sure Due This Installment?').subscribe(result => {
        if (result) {
          this.InstallmentPaidDetailService.ChangepaymentCompletedStatus(id,0).subscribe(() => {
            this.getInstallmentPaidDetails();
            this.snackBar.open('Bulletin Running!', '', { 
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'right',
              panelClass: 'snackbar-success'
            });
          })
        }
      })
    }
  }
}

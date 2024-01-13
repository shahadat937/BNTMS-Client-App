import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BIODataGeneralInfo } from '../../models/BIODataGeneralInfo';
import { BIODataGeneralInfoService } from '../../service/BIODataGeneralInfo.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MasterData } from 'src/assets/data/master-data';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';


@Component({
  selector: 'app-trainee-list',
  templateUrl: './trainee-list.component.html',
  styleUrls: ['./trainee-list.component.sass']
})
export class TraineeListComponent implements OnInit {

  
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BIODataGeneralInfo[] = [];
  isLoading = false;
  userRole= Role;
  traineeList:BIODataGeneralInfo[]=[];
  role:any;
  userId:any;
  traineeId:any;
  branchId:any;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'sl','pno','bnaNo','bnaBatch','joiningDate', 'actions'];
  dataSource: MatTableDataSource<BIODataGeneralInfo> = new MatTableDataSource();

  selection = new SelectionModel<BIODataGeneralInfo>(true, []);

  
  constructor(private snackBar: MatSnackBar,private authService: AuthService,private BIODataGeneralInfoService: BIODataGeneralInfoService,private router: Router,private confirmService: ConfirmService) { }
  
  @ViewChild('labelImport')  labelImport: ElementRef;
  ngOnInit() {
    this.role = this.authService.currentUserValue.role.trim();
    this.userId=this.authService.currentUserValue.id;
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();

    console.log("fffffffss");
    console.log(this.role, this.traineeId,this.branchId)
console.log("fffffffffffff");
    this.getBIODataGeneralInfos();
    this.getTraineeListForUpdate();
    
  }
  
  getBIODataGeneralInfos() {
    this.isLoading = true;
    this.BIODataGeneralInfoService.getBIODataGeneralInfos(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      console.log(this.dataSource.data)
    })
  }

  getTraineeListForUpdate(){
    this.BIODataGeneralInfoService.getTraineeListForUpdate(this.branchId,this.searchText).subscribe(response => {
      this.traineeList=response;     
      console.log("Trainee List");
      console.log(response)
    })
  }
  // getTraineeListForProfileUpdate() {
  //   this.isLoading = true;
  //   this.BIODataGeneralInfoService.getBIODataGeneralInfos(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
  //     this.dataSource.data = response.items; 
  //     this.paging.length = response.totalItemsCount    
  //     this.isLoading = false;
  //     console.log(this.dataSource.data)
  //   })
  // }
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
    this.getBIODataGeneralInfos();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getTraineeListForUpdate();
  } 


  deleteItem(row) {
    const id = row.traineeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      if (result) {
        this.BIODataGeneralInfoService.delete(id).subscribe(() => {
          this.getBIODataGeneralInfos();
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

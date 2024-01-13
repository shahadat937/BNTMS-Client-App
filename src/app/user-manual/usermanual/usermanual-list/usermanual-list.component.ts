import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {UserManual} from '../../models/UserManual'
import {UserManualService} from '../../service/UserManual.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-usermanual-list',
  templateUrl: './usermanual-list.component.html',
  styleUrls: ['./usermanual-list.component.sass']
})
export class UserManualListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: UserManual[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  role:any;
  traineeId:any;
  branchId:any;

  //groupArrays:{ readingMaterialTitle: string; courses: any; }[];

  displayedColumns: string[] = ['ser','roleName','doc', 'actions'];
  dataSource: MatTableDataSource<UserManual> = new MatTableDataSource();


   selection = new SelectionModel<UserManual>(true, []);

  
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private UserManualService: UserManualService,private readonly sanitizer: DomSanitizer,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    this.getUserManuals();
    
  }
 
  getUserManuals() {
    this.isLoading = true;
    this.UserManualService.getUserManuals(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     
      this.dataSource.data = response.items; 
      // const groups = this.dataSource.data.reduce((groups, courses) => {
      //   const materialTitle = courses.readingMaterialTitle;
      //   if (!groups[materialTitle]) {
      //     groups[materialTitle] = [];
      //   }
      //   groups[materialTitle].push(courses);
      //   return groups;
      // }, {});

      // Edit: to add it in the array format instead
      // this.groupArrays = Object.keys(groups).map((readingMaterialTitle) => {
      //   return {
      //     readingMaterialTitle,
      //     courses: groups[readingMaterialTitle]
      //   };
      // });
      // console.log(this.groupArrays);

      console.log(this.dataSource.data)
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getUserManuals();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getUserManuals();
  } 

  safeUrlPic(url: any){ 
    var specifiedUrl = this.sanitizer.bypassSecurityTrustUrl(url); 
    return specifiedUrl;
  }

  deleteItem(row) {
    const id = row.userManualId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
      console.log(result);
      if (result) {
        this.UserManualService.delete(id).subscribe(() => {
          this.getUserManuals();
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

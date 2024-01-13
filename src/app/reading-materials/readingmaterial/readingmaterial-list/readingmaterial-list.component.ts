import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {ReadingMaterial} from '../../models/readingmaterial'
import {ReadingMaterialService} from '../../service/readingmaterial.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import {Role} from 'src/app/core/models/role'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-readingmaterial-list',
  templateUrl: './readingmaterial-list.component.html',
  styleUrls: ['./readingmaterial-list.component.sass']
})
export class ReadingMaterialListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  ELEMENT_DATA: ReadingMaterial[] = [];
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

  groupArrays:{ readingMaterialTitle: string; courses: any; }[];

  displayedColumns: string[] = ['ser','readingMaterialTitle','courseName','documentName','documentLink', 'actions'];
  dataSource: MatTableDataSource<ReadingMaterial> = new MatTableDataSource();


   selection = new SelectionModel<ReadingMaterial>(true, []);

  
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private ReadingMaterialService: ReadingMaterialService,private readonly sanitizer: DomSanitizer,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)
    if(this.role == this.userRole.MasterAdmin){
      this.branchId = 0;
    }

    this.getReadingMaterials();
    
  }
 
  getReadingMaterials() {
    this.isLoading = true;
    this.ReadingMaterialService.getReadingMaterialsBySchool(this.paging.pageIndex, this.paging.pageSize,this.searchText, this.branchId).subscribe(response => {
     

      this.dataSource.data = response.items; 

      const groups = this.dataSource.data.reduce((groups, courses) => {
        const materialTitle = courses.readingMaterialTitle;
        if (!groups[materialTitle]) {
          groups[materialTitle] = [];
        }
        groups[materialTitle].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((readingMaterialTitle) => {
        return {
          readingMaterialTitle,
          courses: groups[readingMaterialTitle]
        };
      });
      console.log(this.groupArrays);

      console.log(this.dataSource.data)
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getReadingMaterials();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getReadingMaterials();
  } 

  safeUrlPic(url: any){ 
    var specifiedUrl = this.sanitizer.bypassSecurityTrustUrl(url); 
    return specifiedUrl;
  }

  deleteItem(row) {
    const id = row.readingMaterialId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.ReadingMaterialService.delete(id).subscribe(() => {
          this.getReadingMaterials();
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

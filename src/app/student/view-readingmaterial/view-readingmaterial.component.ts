import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/core/service/auth.service';
import { StudentDashboardService } from '../services/StudentDashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-readingmaterial',
  templateUrl: './view-readingmaterial.component.html',
  styleUrls: ['./view-readingmaterial.component.sass']
})

export class ViewReadingMaterialComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  @ViewChild('videoPlayer') videoplayer: ElementRef;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  fileIUrl = environment.fileUrl;
  bookList:any =[];
  countbooks:any;
  videoList:any =[];
  countvideos:any;
  slideList:any =[];
  countslides:any;
  materialList:any =[];
  countmaterial:any;
  role:any;
  traineeId:any;
  branchId:any;

  groupArrays:{ readingMaterialTitle: string; courses: any; }[];

  
  constructor(private snackBar: MatSnackBar, private studentDashboardService:StudentDashboardService, private authService: AuthService,private readonly sanitizer: DomSanitizer,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();    
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    this.getReadingMaterials();
    
  }
 
  getReadingMaterials() {
    this.studentDashboardService.getReadingMaterialListByType(this.masterData.readingMaterial.books).subscribe(res=>{            
      this.bookList=res; 
      this.countbooks = this.bookList.length;    
      console.log(this.bookList);  
    })
    ;this.studentDashboardService.getReadingMaterialListByType(this.masterData.readingMaterial.videos).subscribe(res=>{            
      this.videoList=res; 
      this.countvideos = this.videoList.length;    
      console.log(this.videoList);  
    });
    this.studentDashboardService.getReadingMaterialListByType(this.masterData.readingMaterial.slides).subscribe(res=>{            
      this.slideList=res; 
      this.countslides = this.slideList.length;    
      console.log(this.countslides);  
    });
    this.studentDashboardService.getReadingMaterialListByType(this.masterData.readingMaterial.materials).subscribe(res=>{            
      this.materialList=res; 
      this.countmaterial = this.materialList.length;    
      console.log(this.countmaterial);  
    });
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

  toggleVideo(event: any) {
    this.videoplayer.nativeElement.play();
}

  deleteItem(row) {
    const id = row.readingMaterialId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        // this.ReadingMaterialService.delete(id).subscribe(() => {
        //   this.getReadingMaterials();
        //   this.snackBar.open('Information Deleted Successfully ', '', {
        //     duration: 3000,
        //     verticalPosition: 'bottom',
        //     horizontalPosition: 'right',
        //     panelClass: 'snackbar-danger'
        //   });
        // })
      }
    })
    
  }
}

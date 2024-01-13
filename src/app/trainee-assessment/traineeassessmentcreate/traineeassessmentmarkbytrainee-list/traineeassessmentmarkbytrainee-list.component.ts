import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {TraineeAssessmentCreate} from '../../models/TraineeAssessmentCreate'
import {TraineeAssessmentCreateService} from '../../service/TraineeAssessmentCreate.service'
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import {Location} from '@angular/common';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-traineeassessmentmarkbytrainee-list',
  templateUrl: './traineeassessmentmarkbytrainee-list.component.html',
  styleUrls: ['./traineeassessmentmarkbytrainee-list.component.sass']
})
export class TraineeAssessmentMarkByTraineeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeAssessmentCreate[] = [];
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


  traineeAssessmentMarkList:any[];

  //groupArrays:{ readingMaterialTitle: string; courses: any; }[];

  displayedColumns: string[] = ['ser','course','assessmentName','startDate','endDate','status', 'actions'];
  dataSource: MatTableDataSource<TraineeAssessmentCreate> = new MatTableDataSource();


   selection = new SelectionModel<TraineeAssessmentCreate>(true, []);

  
  constructor(private snackBar: MatSnackBar, private _location: Location,private authService: AuthService,  private route: ActivatedRoute,private TraineeAssessmentCreateService: TraineeAssessmentCreateService,private readonly sanitizer: DomSanitizer,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)


    this.getTraineeAssessmentMarkListByAssessmentTrainee();
    
  }

 
  getTraineeAssessmentMarkListByAssessmentTrainee() {
    
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    var traineeAssessmentCreateId = this.route.snapshot.paramMap.get('traineeAssessmentCreateId'); 
    var assessmentTraineeId = this.route.snapshot.paramMap.get('assessmentTraineeId'); 
    console.log(courseDurationId, traineeAssessmentCreateId, assessmentTraineeId)
    this.isLoading = true;
    this.TraineeAssessmentCreateService.getTraineeAssessmentMarkListByAssessmentTrainee(courseDurationId, traineeAssessmentCreateId,assessmentTraineeId).subscribe(response => {
      this.traineeAssessmentMarkList = response;
      console.log(response);
    })
  }
  backClicked() {
    this._location.back();
  }
  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getTraineeAssessmentCreates();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getTraineeAssessmentGroupListByAssessment(this.searchText);
  // } 

  // safeUrlPic(url: any){ 
  //   var specifiedUrl = this.sanitizer.bypassSecurityTrustUrl(url); 
  //   return specifiedUrl;
  // }

  // inActiveItem(row){
  //   const id = row.traineeAssessmentCreateId;    
  //   //var baseSchoolNameId=this.BulletinForm.value['baseSchoolNameId'];
  //   if(row.status == 0){
  //     this.confirmService.confirm('Confirm Deactive message', 'Are You Sure Stop This Assessment').subscribe(result => {
  //       if (result) {
  //         //this.runningload = true;
  //         this.TraineeAssessmentCreateService.ChangeAssessmentStatus(id,1).subscribe(() => {
  //         //  this.getBulletins(baseSchoolNameId);
  //         this.getTraineeAssessmentCreates();
  //           this.snackBar.open('Assessment Stopped!', '', {
  //             duration: 3000,
  //             verticalPosition: 'bottom',
  //             horizontalPosition: 'right',
  //             panelClass: 'snackbar-warning'
  //           });
  //         })
  //       }
  //     })
  //   }
  //   else{
      
  //     this.confirmService.confirm('Confirm Active message', 'Are You Sure Run This Assessment').subscribe(result => {
  //       if (result) {
  //         //this.runningload = true;
  //         this.TraineeAssessmentCreateService.ChangeAssessmentStatus(id,0).subscribe(() => {
  //         //  this.getBulletins(baseSchoolNameId);
  //         this.getTraineeAssessmentCreates();
  //           this.snackBar.open('Assessment Running!', '', { 
  //             duration: 3000,
  //             verticalPosition: 'bottom',
  //             horizontalPosition: 'right',
  //             panelClass: 'snackbar-success'
  //           });
  //         })
  //       }
  //     })
  //   }
  // }

  // deleteItem(row) {
  //   const id = row.traineeAssessmentCreateId; 
  //   this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item?').subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.TraineeAssessmentCreateService.delete(id).subscribe(() => {
  //         this.getTraineeAssessmentCreates();
  //         this.snackBar.open('Information Deleted Successfully ', '', {
  //           duration: 3000,
  //           verticalPosition: 'bottom',
  //           horizontalPosition: 'right',
  //           panelClass: 'snackbar-danger'
  //         });
  //       })
  //     }
  //   })
    
  // }
}

import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {TraineeNomination} from '../../models/traineenomination'
import {TraineeNominationService} from '../../service/traineenomination.service'
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-foreigntraineenomination-list',
  templateUrl: './foreigntraineenomination-list.component.html',
  styleUrls: ['./foreigntraineenomination-list.component.sass']
})
export class ForeignTraineeNominationListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeNomination[] = [];
  isLoading = false;
  courseDurationId:number;
  courseNameId:number;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','traineePNo','rankName','traineeName','courseName','familyAllowId', 'actions'];
  dataSource: MatTableDataSource<TraineeNomination> = new MatTableDataSource();


   selection = new SelectionModel<TraineeNomination>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeNominationService: TraineeNominationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.TraineeNominationService.findByCourseDuration(+courseDurationId).subscribe(
      res => {
          this.courseDurationId= res.courseDurationId, 
          this.courseNameId = res.courseNameId 
     //  console.log(res);
      }
    );
    this.getTraineeNominationsByCourseDurationId(courseDurationId)
  }
 
  // getTraineeNominations() {
  //   this.isLoading = true;
  //   this.TraineeNominationService.getTraineeNominations(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

  //     this.dataSource.data = response.items; 
  //     this.paging.length = response.totalItemsCount    
  //     this.isLoading = false;
  //   })
  // }

 getTraineeNominationsByCourseDurationId(courseDurationId) {
    this.isLoading = true;
    this.TraineeNominationService.getTraineeNominationsByCourseDurationId(this.paging.pageIndex, this.paging.pageSize,this.searchText,courseDurationId).subscribe(response => {
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      //console.log(this.courseDurationId);
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
   // this.getTraineeNominations();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    //this.getTraineeNominations();
  } 

  deleteItem(row) {
    const id = row.traineeNominationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
     // console.log(result);
      if (result) {
        this.TraineeNominationService.delete(id).subscribe(() => {
          this.getTraineeNominationsByCourseDurationId(this.courseDurationId);
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

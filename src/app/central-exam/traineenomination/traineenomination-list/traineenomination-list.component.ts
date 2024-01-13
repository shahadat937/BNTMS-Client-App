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
  selector: 'app-traineenomination-list',
  templateUrl: './traineenomination-list.component.html',
  styleUrls: ['./traineenomination-list.component.sass']
})
export class TraineeNominationListComponent implements OnInit {
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

  displayedColumns: string[] = ['ser','traineeName', 'examCenter', 'presentBillet',  'actions'];
  dataSource: MatTableDataSource<TraineeNomination> = new MatTableDataSource();


   selection = new SelectionModel<TraineeNomination>(true, []);

  
  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeNominationService: TraineeNominationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
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
 getTraineeNominationsByCourseDurationId(courseDurationId) {
    this.isLoading = true;
    this.TraineeNominationService.getTraineeNominationsByCourseDurationId(this.paging.pageIndex, this.paging.pageSize,this.searchText,courseDurationId).subscribe(response => {
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
      console.log("Data source");
      console.log(this.dataSource.data);
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
  } 

  deleteItem(row) {
    const id = row.traineeNominationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
     // console.log(result);
      if (result) {
        this.TraineeNominationService.delete(id).subscribe(() => {
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

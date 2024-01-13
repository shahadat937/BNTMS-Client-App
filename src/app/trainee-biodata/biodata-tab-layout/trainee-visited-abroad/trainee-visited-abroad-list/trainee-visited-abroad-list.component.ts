import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TraineeVisitedAboard } from '../../models/TraineeVisitedAboard';
import { TraineeVisitedAboardService } from '../../service/TraineeVisitedAboard.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trainee-visited-abroad',
  templateUrl: './trainee-visited-abroad-list.component.html',
  styleUrls: ['./trainee-visited-abroad-list.component.sass']
})
export class TraineeVisitedAboardListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeVisitedAboard[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  // searchText="";

  displayedColumns: string[] = ['ser', 'country','purposeOfVisit','durationFrom','durationTo','actions'];
  dataSource: MatTableDataSource<TraineeVisitedAboard> = new MatTableDataSource();

  selection = new SelectionModel<TraineeVisitedAboard>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeVisitedAboardService: TraineeVisitedAboardService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getTraineeVisitedAboards();
  }
 
  getTraineeVisitedAboards() {
    this.isLoading = true;
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');

    this.TraineeVisitedAboardService.getdatabytraineeid(+this.traineeId).subscribe(response => {     
     console.log(response);
     this.dataSource.data=response;
    })
  }
  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getTraineeVisitedAboards();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getTraineeVisitedAboards();
  // } 

  deleteItem(row) {
    const id = row.traineeVisitedAboardId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.TraineeVisitedAboardService.delete(id).subscribe(() => {
          this.getTraineeVisitedAboards();
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

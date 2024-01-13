import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GameSport } from '../../models/GameSport';
import { GameSportService } from '../../service/GameSport.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game-sport-list',
  templateUrl: './game-sport-list.component.html',
  styleUrls: ['./game-sport-list.component.sass']
})
export class GameSportListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: GameSport[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  // searchText="";

  displayedColumns: string[] = ['ser', 'game','levelOfParticipation','performance','additionalInformation', 'actions'];
  dataSource: MatTableDataSource<GameSport> = new MatTableDataSource();

  SelectionModel = new SelectionModel<GameSport>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private GameSportService: GameSportService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getGameSports();
  }
 
  getGameSports() {
    this.isLoading = true;

    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.GameSportService.getdatabytraineeid(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }

  deleteItem(row) {
    const id = row.gameSportId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.GameSportService.delete(id).subscribe(() => {
          this.getGameSports();
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

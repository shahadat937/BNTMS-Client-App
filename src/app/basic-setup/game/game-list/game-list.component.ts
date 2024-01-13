import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from '../../models/game';
import { GameService } from '../../service/game.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-game',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.sass']
})
export class GameListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Game[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','gameName','isActive', 'actions'];
  dataSource: MatTableDataSource<Game> = new MatTableDataSource();


   selection = new SelectionModel<Game>(true, []);

  
  constructor(private snackBar: MatSnackBar,private gameService: GameService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getGames();
    
  }
 
  getGames() {
    this.isLoading = true;
    this.gameService.getGames(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getGames();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getGames();
  } 

  deleteItem(row) {
    const id = row.gameId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.gameService.delete(id).subscribe(() => {
          this.getGames();
          this.snackBar.open('Information Deleted Successfully ', '', {
            duration: 2000,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'snackbar-danger'
          });
        })
      }
    })
    
  }
}

import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Board } from '../../models/Board';
import { BoardService } from '../../service/Board.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
 

@Component({
  selector: 'app-Board',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.sass']
})
export class BoardListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Board[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = [ 'ser', 'boardName', 'isActive', 'actions'];
  dataSource: MatTableDataSource<Board> = new MatTableDataSource();

  selection = new SelectionModel<Board>(true, []);
  
  constructor(private snackBar: MatSnackBar,private BoardService: BoardService,private router: Router,private confirmService: ConfirmService) { }
  
  ngOnInit() {
    this.getBoards();
  }
 
  getBoards() {
    this.isLoading = true;
    this.BoardService.getBoards(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
      
      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBoards();
  }

  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBoards();
  } 

  deleteItem(row) {
    const id = row.boardId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.BoardService.delete(id).subscribe(() => {
          this.getBoards();
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

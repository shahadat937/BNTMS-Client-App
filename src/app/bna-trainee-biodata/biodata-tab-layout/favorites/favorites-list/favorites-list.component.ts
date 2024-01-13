import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Favorites } from '../../models/Favorites';
import { FavoritesService } from '../../service/Favorites.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.sass']
})
export class FavoritesListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Favorites[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'favoritesTypeName','favoritesName','additionalInformation', 'actions'];
  dataSource: MatTableDataSource<Favorites> = new MatTableDataSource();

  SelectionModel = new SelectionModel<Favorites>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private FavoritesService: FavoritesService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getFavorites();
  }
 
  getFavorites() {
    this.isLoading = true;
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.FavoritesService.getFavoritesByTraineeId(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getFavorites();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getFavorites();
  } 

  deleteItem(row) {
    const id = row.favoritesId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.FavoritesService.delete(id).subscribe(() => {
          this.getFavorites();
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

import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Favorites } from '../../models/Favorites';
import { FavoritesService } from '../../service/Favorites.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-favorites',
  templateUrl: './view-favorites.component.html',
  styleUrls: ['./view-favorites.component.sass']
})
export class ViewFavoritesComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Favorites[] = [];
  isLoading = false;
   favoritesId: number;
    traineeId: number;
    favoritesTypeId:number;
    favoritesTypeName: string;
    favoritesName: string;
    additionalInformation: string;
    menuPosition: number;
    isActive: true

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private FavoritesService: FavoritesService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('favoritesId'); 
    this.FavoritesService.find(+id).subscribe( res => {
      console.log(res);
      this.favoritesId= res.favoritesId,
      this.favoritesTypeId=res.favoritesTypeId,
      this.favoritesTypeName = res.favoritesTypeName,
      this.traineeId= res.traineeId,
      this.favoritesName= res.favoritesName,
      this.additionalInformation=res.additionalInformation,
      this.isActive= true
    })
  }
}

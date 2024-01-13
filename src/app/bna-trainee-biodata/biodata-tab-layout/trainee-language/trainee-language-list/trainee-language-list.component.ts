import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TraineeLanguage } from '../../models/TraineeLanguage';
import { TraineeLanguageService } from '../../service/TraineeLanguage.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trainee-language-list',
  templateUrl: './trainee-language-list.component.html',
  styleUrls: ['./trainee-language-list.component.sass']
})
export class TraineeLanguageListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeLanguage[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'languageName','speaking','writing','reading','additionalInformation', 'actions'];
  dataSource: MatTableDataSource<TraineeLanguage> = new MatTableDataSource();

  SelectionModel = new SelectionModel<TraineeLanguage>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeLanguageService: TraineeLanguageService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getTraineeLanguages();
  }
 
  getTraineeLanguages() {
    this.isLoading = true;
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.TraineeLanguageService.getTraineeLanguageByTraineeId(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getTraineeLanguages();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getTraineeLanguages();
  } 

  deleteItem(row) {
    const id = row.traineeLanguageId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      if (result) {
        this.TraineeLanguageService.delete(id).subscribe(() => {
          this.getTraineeLanguages();
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

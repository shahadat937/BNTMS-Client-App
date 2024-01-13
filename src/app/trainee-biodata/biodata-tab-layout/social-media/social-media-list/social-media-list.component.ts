import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SocialMedia } from '../../models/SocialMedia';
import { SocialMediaService } from '../../service/SocialMedia.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-social-media-list',
  templateUrl: './social-media-list.component.html',
  styleUrls: ['./social-media-list.component.sass']
})
export class SocialMediaListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: SocialMedia[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'socialMediaTypeName','socialMediaAccountName','additionalInformation','actions'];
  dataSource: MatTableDataSource<SocialMedia> = new MatTableDataSource();

  SelectionModel = new SelectionModel<SocialMedia>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private SocialMediaService: SocialMediaService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getSocialMedias();
  }
 
  getSocialMedias() {
    this.isLoading = true;
    this.traineeId= this.route.snapshot.paramMap.get('traineeId');
    this.SocialMediaService.getSocialMediaByTraineeId(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getSocialMedias();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getSocialMedias();
  } 

  deleteItem(row) {
    const id = row.socialMediaId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.SocialMediaService.delete(id).subscribe(() => {
          this.getSocialMedias();
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

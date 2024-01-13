import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SocialMediaType } from '../../models/SocialMediaType';
import { SocialmediaTypeService } from '../../service/socialmediatype.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MasterData } from 'src/assets/data/master-data';

@Component({
  selector: 'app-socialmediatype-list',
  templateUrl: './socialmediatype-list.component.html',
  styleUrls: ['./socialmediatype-list.component.sass']
})
export class SocialmediatypeListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: SocialMediaType[] = [];
  isLoading = false;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'socialMediaTypeName','isActive', 'actions'];
  dataSource: MatTableDataSource<SocialMediaType> = new MatTableDataSource();

  selection = new SelectionModel<SocialMediaType>(true, []);

  constructor(private snackBar: MatSnackBar,private socialMediaTypeService: SocialmediaTypeService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getSocialMediaTypes();
  }
 
  getSocialMediaTypes() {
    this.isLoading = true;
    this.socialMediaTypeService.getSocialMediaTypes(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getSocialMediaTypes();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getSocialMediaTypes();
  } 

  deleteItem(row) {
    const id = row.socialMediaTypeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This SocialMediaType Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.socialMediaTypeService.delete(id).subscribe(() => {
          this.getSocialMediaTypes();
          this.snackBar.open('SocialMediaType Information Deleted Successfully ', '', {
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

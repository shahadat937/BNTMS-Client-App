import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Feature } from '../../models/feature';
import { FeatureService } from '../../service/feature.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feature',
  templateUrl: './feature-list.component.html',
  styleUrls: ['./feature-list.component.sass']
})
export class FeatureListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Feature[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','featureName','path','iconName','icon','moduleName','featureCode','orderNo','isActive', 'actions'];
  dataSource: MatTableDataSource<Feature> = new MatTableDataSource();


   selection = new SelectionModel<Feature>(true, []);

  
  constructor(private snackBar: MatSnackBar,private FeatureService: FeatureService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getFeatures();
    
  }
 
  getFeatures() {
    this.isLoading = true;
    this.FeatureService.getFeatures(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getFeatures();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getFeatures();
  } 

  deleteItem(row) {
    const id = row.featureId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.FeatureService.delete(id).subscribe(() => {
          this.getFeatures();
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

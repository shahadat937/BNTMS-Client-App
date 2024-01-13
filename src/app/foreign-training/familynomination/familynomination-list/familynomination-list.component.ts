import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {FamilyNomination} from '../../models/familynomination'
import {FamilyNominationService} from '../../service/familynomination.service'
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-familynomination-list',
  templateUrl: './familynomination-list.component.html',
  styleUrls: ['./familynomination-list.component.sass']
})
export class FamilyNominationListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: FamilyNomination[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','traineeId','courseDurationId','traineeNominationId','fundingDetailId','relationTypeId','actions'];
  dataSource: MatTableDataSource<FamilyNomination> = new MatTableDataSource();


   selection = new SelectionModel<FamilyNomination>(true, []);

  
  constructor(private snackBar: MatSnackBar,private FamilyNominationService: FamilyNominationService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getFamilyNominations();
    
  }
 
  getFamilyNominations() {
    this.isLoading = true;
    this.FamilyNominationService.getFamilyNominations(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getFamilyNominations();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getFamilyNominations();
  } 

  deleteItem(row) {
    const id = row.familyNominationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.FamilyNominationService.delete(id).subscribe(() => {
          this.getFamilyNominations();
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

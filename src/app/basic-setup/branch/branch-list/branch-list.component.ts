import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Branch } from '../../models/branch';
import { BranchService } from '../../service/branch.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-branch',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.sass']
})
export class BranchListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Branch[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','branchName','shortName','isActive', 'actions'];
  dataSource: MatTableDataSource<Branch> = new MatTableDataSource();


   selection = new SelectionModel<Branch>(true, []);

  
  constructor(private snackBar: MatSnackBar,private branchService: BranchService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getBranchs();
    
  }
 
  getBranchs() {
    this.isLoading = true;
    this.branchService.getBranchs(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getBranchs();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getBranchs();
  } 

  deleteItem(row) {
    const id = row.branchId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.branchService.delete(id).subscribe(() => {
          this.getBranchs();

          this.snackBar.open('Branch Information Deleted Successfully ', '', {
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

import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrandFather } from '../../models/GrandFather';
import { GrandFatherService } from '../../service/GrandFather.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-grandfather-list',
  templateUrl: './grandfather-list.component.html',
  styleUrls: ['./grandfather-list.component.sass']
})
export class GrandFatherListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: GrandFather[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  // searchText="";

  displayedColumns: string[] = ['ser', 'grandFatherType','occupation','grandFathersName','age','deadStatusValue','nationality','actions'];
  dataSource: MatTableDataSource<GrandFather> = new MatTableDataSource();

  SelectionModel = new SelectionModel<GrandFather>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private GrandFatherService: GrandFatherService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getGrandFathers();
  }
 
  getGrandFathers() {
    this.isLoading = true;
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.GrandFatherService.getdatabytraineeid(+this.traineeId).subscribe(response => {     
     
     this.dataSource.data=response;
    })
  }
  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getGrandFathers();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getGrandFathers();
  // } 

  deleteItem(row) {
    const id = row.grandFatherId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      
      if (result) {
        this.GrandFatherService.delete(id).subscribe(() => {
          this.getGrandFathers();
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

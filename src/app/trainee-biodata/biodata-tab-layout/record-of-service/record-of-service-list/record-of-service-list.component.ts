import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RecordOfService } from '../../models/RecordOfService';
import { RecordOfServiceService } from '../../service/RecordOfService.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-record-of-service-list',
  templateUrl: './record-of-service-list.component.html',
  styleUrls: ['./record-of-service-list.component.sass']
})
export class RecordOfServiceListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: RecordOfService[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'dateFrom','dateTo','shipEstablishment','appointment','remarks','actions'];
  dataSource: MatTableDataSource<RecordOfService> = new MatTableDataSource();

  SelectionModel = new SelectionModel<RecordOfService>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private RecordOfServiceService: RecordOfServiceService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getRecordOfServices();
  }
 
  getRecordOfServices() {
    this.isLoading = true;
    this.traineeId= this.route.snapshot.paramMap.get('traineeId');
    this.RecordOfServiceService.getRecordOfServiceByTraineeId(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getRecordOfServices();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getRecordOfServices();
  } 

  deleteItem(row) {
    const id = row.recordOfServiceId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.RecordOfServiceService.delete(id).subscribe(() => {
          this.getRecordOfServices();
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

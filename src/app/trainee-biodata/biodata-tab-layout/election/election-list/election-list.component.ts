import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Election } from '../../models/Election';
import { ElectionService } from '../../service/Election.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';

@Component({
  selector: 'app-election',
  templateUrl: './election-list.component.html',
  styleUrls: ['./election-list.component.sass']
})
export class ElectionListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Election[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  // searchText="";

  displayedColumns: string[] = ['ser', 'instituteName','elected','appointmentName','durationFrom','durationTo','additionalInformation', 'actions'];
  dataSource: MatTableDataSource<Election> = new MatTableDataSource();

  selection = new SelectionModel<Election>(true, []);

  constructor(private route: ActivatedRoute,private ElectionService: ElectionService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getElections();
  }
 
  getElections() {
    this.isLoading = true;
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');

    this.ElectionService.getdatabytraineeid(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getElections();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getElections();
  // } 

  deleteItem(row) {
    const id = row.electionId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.ElectionService.delete(id).subscribe(() => {
          this.getElections();
        })
      }
    }) 
  }

}

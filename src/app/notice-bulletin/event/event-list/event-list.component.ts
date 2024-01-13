import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Event } from '../../models/event';
import { EventService } from '../../service/event.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.sass']
})
export class EventListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Event[] = [];
  isLoading = false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser','baseSchoolNameId','courseDurationId','courseNameId','eventDetails', 'status', 'actions'];
  dataSource: MatTableDataSource<Event> = new MatTableDataSource();


   selection = new SelectionModel<Event>(true, []);

  
  constructor(private snackBar: MatSnackBar,private eventService: EventService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.getevents();
    
  }
 
  getevents() {
    this.isLoading = true;
    this.eventService.getevents(this.paging.pageIndex, this.paging.pageSize,this.searchText).subscribe(response => {
     

      this.dataSource.data = response.items; 
      this.paging.length = response.totalItemsCount    
      this.isLoading = false;
    })
  }

  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getevents();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getevents();
  } 

  deleteItem(row) {
    const id = row.eventId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.eventService.delete(id).subscribe(() => {
          this.getevents();
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

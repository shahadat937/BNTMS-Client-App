import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { SchoolDashboardService } from '../services/SchoolDashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-schoolevent-list.component',
  templateUrl: './schoolevent-list.component.html',
  styleUrls: ['./schoolevent-list.component.sass']
})
export class SchoolEventListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  destination:string;
  MaterialByCourse:any;
  EventForSchoolDashboard:any;
  schoolId:any;
  fileUrl:any = environment.fileUrl;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  displayedReadingMaterialColumns: string[] = ['ser','eventHeading','eventDetails','duration','newStatus'];

  constructor(private datepipe: DatePipe,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.schoolId = this.route.snapshot.paramMap.get('baseSchoolNameId');
    this.getEventBySchoolId(this.schoolId);
  }

  getEventBySchoolId(schoolId){
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    this.schoolDashboardService.getEventBySchoolId(schoolId,currentDateTime).subscribe(response => {   
      this.EventForSchoolDashboard=response;
      console.log(response)
    })
  }
}

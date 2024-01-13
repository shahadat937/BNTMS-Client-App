import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {BNAExamInstructorAssign} from '../../../exam-management/models/bnaexaminstructorassign';
import {BNAExamInstructorAssignService} from '../../../exam-management/service/bnaexaminstructorassign.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { dashboardService } from '../services/dashboard.service';
import { TraineeNominationService } from '../../../staff-collage/service/traineenomination.service';

@Component({
  selector: 'app-centralexamnominated-list',
  templateUrl: './centralexamnominated-list.component.html',
  styleUrls: ['./centralexamnominated-list.component.sass']
})
export class CentralExamNominatedListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: BNAExamInstructorAssign[] = [];
  isLoading = false;
  showHideDiv = false;
  GetInstructorByParameters:BNAExamInstructorAssign[];
  baseSchoolNameId:any;
  courseNameId:any;
  courseTypeId: number;
  mainDb:any;
  nominatedList:any;
  yearNow:any = 0;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: 1000,
    length: 1
  }
  searchText="";

  displayedColumns: string[]= ['ser','course','duration','candidate','action'];
  
  constructor(private snackBar: MatSnackBar,private TraineeNominationService: TraineeNominationService,private dashboardService: dashboardService,private route: ActivatedRoute,private BNAExamInstructorAssignService: BNAExamInstructorAssignService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    this.onModuleSelectionChangeGetsubjectList();
   
  }
 

  onModuleSelectionChangeGetsubjectList(){
    this.courseNameId = this.route.snapshot.paramMap.get('courseNameId'); 
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId'); 
    this.mainDb = this.route.snapshot.paramMap.get('mainDb'); 
    // this.courseTypeId = Number(this.route.snapshot.paramMap.get('courseTypeId'));
    // this.schooldash=this.route.snapshot.paramMap.get('schooldash');
    // this.dbType=this.route.snapshot.paramMap.get('dbType'); 
    this.TraineeNominationService.getTraineeNominationsByCourseDurationId(this.paging.pageIndex, this.paging.pageSize,this.searchText,courseDurationId).subscribe(response => {
      this.nominatedList = response.items;
      console.log(this.nominatedList);
    })
  }

  getCalculateAge(getDate,returnstatus){
    var currentDate = new Date(new Date().getFullYear(), 0, 1);
    var startDate = new Date(getDate);

    this.yearNow = currentDate.getFullYear();
    var monthNow = currentDate.getMonth() + 1;
    var dateNow = currentDate.getDate()

    var yearDob = startDate.getFullYear();
    var monthDob = startDate.getMonth() + 1;
    var dateDob = startDate.getDate();
    var yearAge,monthAge,dateAge;
    
    yearAge = this.yearNow - yearDob;

    if (monthNow >= monthDob)
       monthAge = monthNow - monthDob;
    else {
      yearAge--;
       monthAge = 12 + monthNow -monthDob;
    }

    if (dateNow >= dateDob)
       dateAge = dateNow - dateDob;
    else {
      monthAge--;
       dateAge = 31 + dateNow - dateDob;

      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
    }

    if(returnstatus == 0){
      return (yearAge +" Years "+ monthAge +" Months "+ dateAge +" Days");
    }else if(returnstatus == 1){
      return (yearAge);
    }else if(returnstatus == 2){
      return (monthAge);
    }else if(returnstatus == 3){
      return (dateAge);
    }else{
      return 0;
    }
    
  }

  toggle(){
    this.showHideDiv = !this.showHideDiv;
  }
  printSingle(){
    this.showHideDiv= false;
    this.print();
  }
  print(){ 
     
    let printContents, popupWin;
    printContents = document.getElementById('printNomineeList').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          body{  width: 99%;}
            label { 
              font-weight: 400;
              font-size: 13px;
              padding: 2px;
              margin-bottom: 5px;
            }
            table, td, th {
              border: 1px solid silver;
            }
            table td {
              font-size: 13px;
              text-align:center;
            }
            .nomination-custom-design.staff-collage tr td.cl-name {
              text-align: left;
            }
            .nomination-custom-design.staff-collage tr .cl-action {
              display:none;
            }
            table th {
              font-size: 13px;
              text-align:center;
            }
            table {
              border-collapse: collapse;
              width: 98%;
            }
            th {
              height: 26px;
            }
            .header-text{
              text-align:center;
            }
            .header-text h3{
              margin:0;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          </div>
          <br>
          ${printContents}
          
        </body>
      </html>`
    );
    popupWin.document.close();

  }

}

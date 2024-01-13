import { Component, OnInit  } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{ MasterData } from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentDashboardService } from '../services/StudentDashboard.service';

@Component({
  selector: 'app-traineemarksheet',
  templateUrl: './traineemarksheet-list.component.html',
  styleUrls: ['./traineemarksheet-list.component.sass']
})
export class TraineeMarkSheetComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  isLoading = false;
  status=1;
  marklistbycourse:any[];
  showHideDiv= false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  
  displayedColumns: string[] ;
  //displayedColumns: string[] = ['ser','pno','name','rankposition','course','courseTitle','subjectName','totalMark','passMarkBna', 'obtaintMark'];
  //displayedColumns: string[] = ['pno','name','position','general Navigation ','instrument','relvel and Fleet Work','rule of The Road'];


  
  constructor(private snackBar: MatSnackBar, private studentDashboardService: StudentDashboardService ,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
   
    this.getTraineeMarkListByDuration();
    
  }
 
  getTraineeMarkListByDuration() {
    this.isLoading = true;
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');
    var traineeId = Number(this.route.snapshot.paramMap.get('traineeId')); 
    this.studentDashboardService.getTraineeMarksheet(traineeId,courseDurationId).subscribe(res=>{
      this.marklistbycourse=res;  
      this.displayedColumns =[...Object.keys(this.marklistbycourse[0])];
      console.log([...Object.keys(this.marklistbycourse[0])]);
  //displayedColumns: string[] = [...Object.keys(this.marklistbycourse[0])];
   
    
    });
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
    printContents = document.getElementById('print-routine').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
          body{  width: 99%;}
            label { font-weight: 400;
                    font-size: 13px;
                    padding: 2px;
                    margin-bottom: 5px;
                  }
            table, td, th {
                  border: 1px solid silver;
                    }
                    table td {
                  font-size: 13px;
                    }

                    table th {
                  font-size: 13px;
                    }
              table {
                    border-collapse: collapse;
                    width: 98%;
                    }
                th {
                    height: 26px;
                    }
                .header-text, td{
                  text-align:center;
                }
                .header-text h3{
                  margin:0;
                }
                
          </style>
        </head>
        <body onload="window.print();window.close()">
          <div class="header-text">
          <h3>Trainee Mark Sheet</h3>
         
          </div>
          <br>
          <hr>
          
          ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();

}
  
}

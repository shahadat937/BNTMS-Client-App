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
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-countedofficers-list',
  templateUrl: './countedofficers-list.component.html',
  styleUrls: ['./countedofficers-list.component.sass']
})
export class CountedOfficersListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  isLoading = false;
  destination:string;
  Countedlist:any;
  schoolId:any;
  officerTypeId:any;
  branchId:any;
  traineeId:any;
  role:any;
  

  showHideDiv= false;
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";
  groupArrays:{ courseName: string; courses: any; }[];
  groupCOArrays:{ schoolName: string; courses: any; }[];

  displayedColumns: string[] = ['ser','name','course','duration'];

  constructor(private datepipe: DatePipe,private authService: AuthService,private schoolDashboardService: SchoolDashboardService,private route: ActivatedRoute,private snackBar: MatSnackBar,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
    //this.getTraineeNominations();
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    // this.branchId =  this.authService.currentUserValue.branchId.trim();
    this.branchId =  this.authService.currentUserValue.branchId  ? this.authService.currentUserValue.branchId.trim() : "";
    console.log(this.role, this.traineeId, this.branchId)

    this.schoolId = this.route.snapshot.paramMap.get('schoolId'); 
    this.officerTypeId = this.route.snapshot.paramMap.get('officerTypeId'); 
    var traineeStatusId = this.route.snapshot.paramMap.get('traineeStatusId'); 
    console.log(traineeStatusId)
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy');
    if(this.role == this.userRole.MasterAdmin ||this.role == this.userRole.CO || this.role == this.userRole.TrainingOffice || this.role == this.userRole.TC || this.role == this.userRole.TCO){
      if(Number(this.officerTypeId) == this.masterData.OfficerType.Foreign){
        this.destination = "Foreign Trainee";      
        this.schoolDashboardService.getNominatedForeignTraineeByTypeAndBase(currentDateTime,this.schoolId, this.masterData.OfficerType.Foreign).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.schoolName;
            if (!groups[schoolName]) {
              groups[schoolName] = [];
            }
            groups[schoolName].push(courses);
            return groups;
          }, {});
    
          // Edit: to add it in the array format instead
          this.groupCOArrays = Object.keys(groups).map((schoolName) => {
            return {
              schoolName,
              courses: groups[schoolName]
            };
          });
          console.log(this.groupCOArrays);   
        })
      }
      else if(Number(traineeStatusId) == this.masterData.TraineeStatus.officer){
        this.destination = "Officer";
        this.schoolDashboardService.getCourseTotalOfficerListByBase(currentDateTime, this.masterData.TraineeStatus.officer, this.schoolId).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.schoolName;
            if (!groups[schoolName]) {
              groups[schoolName] = [];
            }
            groups[schoolName].push(courses);
            return groups;
          }, {});
    
          // Edit: to add it in the array format instead
          this.groupCOArrays = Object.keys(groups).map((schoolName) => {
            return {
              schoolName,
              courses: groups[schoolName]
            };
          });
          console.log(this.groupCOArrays); 
        })
      }
      else if(Number(traineeStatusId) == this.masterData.TraineeStatus.sailor){
        this.destination = "Sailor";
        this.schoolDashboardService.getCourseTotalOfficerListByBase(currentDateTime, this.masterData.TraineeStatus.sailor, this.schoolId).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.schoolName;
            if (!groups[schoolName]) {
              groups[schoolName] = [];
            }
            groups[schoolName].push(courses);
            return groups;
          }, {});
    
          // Edit: to add it in the array format instead
          this.groupCOArrays = Object.keys(groups).map((schoolName) => {
            return {
              schoolName,
              courses: groups[schoolName]
            };
          });
          console.log(this.groupCOArrays); 
        })
      }
      else if(Number(traineeStatusId) == this.masterData.TraineeStatus.civil){
        this.destination = "Civil";
        this.schoolDashboardService.getCourseTotalOfficerListByBase(currentDateTime, this.masterData.TraineeStatus.civil, this.schoolId).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.schoolName;
            if (!groups[schoolName]) {
              groups[schoolName] = [];
            }
            groups[schoolName].push(courses);
            return groups;
          }, {});
    
          // Edit: to add it in the array format instead
          this.groupCOArrays = Object.keys(groups).map((schoolName) => {
            return {
              schoolName,
              courses: groups[schoolName]
            };
          });
          console.log(this.groupCOArrays); 
        })
      }
      else{
        this.destination = "Trainee";
        this.schoolDashboardService.getNominatedTotalTraineeByBaseFromSp(this.branchId).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.schoolName;
            if (!groups[schoolName]) {
              groups[schoolName] = [];
            }
            groups[schoolName].push(courses);
            return groups;
          }, {});
    
          // Edit: to add it in the array format instead
          this.groupCOArrays = Object.keys(groups).map((schoolName) => {
            return {
              schoolName,
              courses: groups[schoolName]
            };
          });
          console.log(this.groupCOArrays);               
        })
      }
    }else{
      if(Number(this.officerTypeId) == this.masterData.OfficerType.Foreign){
        this.destination = "Foreign Trainee";      
        this.schoolDashboardService.getnominatedForeignTraineeFromSpRequestBySchoolId(currentDateTime,this.schoolId, this.masterData.OfficerType.Foreign).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
          const schoolName = courses.course + '-'+ courses.courseTitle;
            if (!groups[schoolName]) {
            groups[schoolName] = [];
              }
            groups[schoolName].push(courses);
            return groups;
          }, {});
  
        // Edit: to add it in the array format instead
          this.groupArrays = Object.keys(groups).map((courseName) => {
            return {
          courseName,
            courses: groups[courseName]
            };
            });
            console.log(this.groupArrays);
  
          console.log(this.Countedlist);
        })
      }
      else if(Number(traineeStatusId) == this.masterData.TraineeStatus.officer){
        this.destination = "Officer";
        this.schoolDashboardService.getrunningCourseTotalOfficerListBySchoolRequest(currentDateTime, this.masterData.TraineeStatus.officer, this.schoolId).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.course + '-'+ courses.courseTitle;
              if (!groups[schoolName]) {
              groups[schoolName] = [];
                }
              groups[schoolName].push(courses);
              return groups;
            }, {});
    
          // Edit: to add it in the array format instead
            this.groupArrays = Object.keys(groups).map((courseName) => {
              return {
            courseName,
              courses: groups[courseName]
              };
              });
              console.log(this.groupArrays);
    
            console.log(this.Countedlist);
  
          console.log(this.Countedlist);
        })
      }
      else if(Number(traineeStatusId) == this.masterData.TraineeStatus.sailor){
        this.destination = "Sailor";
        this.schoolDashboardService.getrunningCourseTotalOfficerListBySchoolRequest(currentDateTime, this.masterData.TraineeStatus.sailor, this.schoolId).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.course + '-'+ courses.courseTitle;
              if (!groups[schoolName]) {
              groups[schoolName] = [];
                }
              groups[schoolName].push(courses);
              return groups;
            }, {});
    
          // Edit: to add it in the array format instead
            this.groupArrays = Object.keys(groups).map((courseName) => {
              return {
            courseName,
              courses: groups[courseName]
              };
              });
              console.log(this.groupArrays);
    
            console.log(this.Countedlist);
  
          console.log(this.Countedlist);
        })
      }
      else if(Number(traineeStatusId) == this.masterData.TraineeStatus.civil){
        this.destination = "Civil";
        this.schoolDashboardService.getrunningCourseTotalOfficerListBySchoolRequest(currentDateTime, this.masterData.TraineeStatus.civil, this.schoolId).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.course + '-'+ courses.courseTitle;
              if (!groups[schoolName]) {
              groups[schoolName] = [];
                }
              groups[schoolName].push(courses);
              return groups;
            }, {});
    
          // Edit: to add it in the array format instead
            this.groupArrays = Object.keys(groups).map((courseName) => {
              return {
            courseName,
              courses: groups[courseName]
              };
              });
              console.log(this.groupArrays);
    
            console.log(this.Countedlist);
  
          console.log(this.Countedlist);
        })
      }
      else{
        this.destination = "Trainee";
        this.schoolDashboardService.getnominatedCourseListFromSpRequestBySchoolId(currentDateTime,this.schoolId).subscribe(response => {         
          this.Countedlist=response;
  
          // this gives an object with dates as keys
          const groups = this.Countedlist.reduce((groups, courses) => {
            const schoolName = courses.course + '-'+ courses.courseTitle;
              if (!groups[schoolName]) {
              groups[schoolName] = [];
                }
              groups[schoolName].push(courses);
              return groups;
            }, {});
    
          // Edit: to add it in the array format instead
            this.groupArrays = Object.keys(groups).map((courseName) => {
              return {
            courseName,
              courses: groups[courseName]
              };
              });
              console.log(this.groupArrays);
    
            console.log(this.Countedlist);
            
          console.log(this.Countedlist);
        })
      }
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
          <h3>Total Trainee List</h3>
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

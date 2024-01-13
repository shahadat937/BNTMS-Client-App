import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { dashboardService } from '../services/dashboard.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import {MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Role } from 'src/app/core/models/role';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.sass']
})
export class SchoolListComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  schoolList:any;
  isLoading = false;
  showHideDiv= false;
  
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

    
  branchId:any;
  traineeId:any;
  role:any;

  groupArrays:{ baseName: string; schools: any; }[];

  displayedColumns: string[] = ['ser','schoolName','courseCount'];

  
  constructor(private snackBar: MatSnackBar,private authService: AuthService,private dashboardService: dashboardService,private router: Router,private confirmService: ConfirmService) { }

  ngOnInit() {
        
    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)
    
    this.getBnaClassTests();
    
  }
 
  getBnaClassTests() {
    this.isLoading = true;
    this.dashboardService.getSpCourseCountBySchool().subscribe(response => {
     
      this.schoolList = response; 
      
      // this gives an object with dates as keys
      const groups = this.schoolList.reduce((groups, schools) => {
        const baseName = schools.baseName;
        if (!groups[baseName]) {
          groups[baseName] = [];
        }
        groups[baseName].push(schools);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((baseName) => {
        return {
          baseName,
          schools: groups[baseName]
        };
      });

      console.log(this.groupArrays)


      this.isLoading = false;
      console.log(this.schoolList)
    })
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
          <h3><u>BN TRAINING STATE</u></h3>
         
          </div>
          <br>
          <hr>
          
          ${printContents}
        </body>
      </html>`
    );
    popupWin.document.close();

}
  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getBnaClassTests();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getBnaClassTests();
  // } 

  // deleteItem(row) {
  //   const id = row.bnaClassTestId; 
  //   this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.BnaClassTestService.delete(id).subscribe(() => {
  //         this.getBnaClassTests();
  //         this.snackBar.open('Information Deleted Successfully ', '', {
  //           duration: 3000,
  //           verticalPosition: 'bottom',
  //           horizontalPosition: 'right',
  //           panelClass: 'snackbar-danger'
  //         });
  //       })
  //     }
  //   })
    
  // }
}

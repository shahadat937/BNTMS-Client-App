import { Component, OnInit, ViewChild,ElementRef  } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute,Router } from '@angular/router';
import { BNASubjectNameService } from '../../service/BNASubjectName.service';
import { ConfirmService } from 'src/app/core/service/confirm.service';
import{MasterData} from 'src/assets/data/master-data'
import { MatSnackBar } from '@angular/material/snack-bar';
import { BNASubjectName } from '../../models/BNASubjectName';
import { SelectedModel } from 'src/app/core/models/selectedModel';
import { AuthService } from 'src/app/core/service/auth.service';
import { Role } from 'src/app/core/models/role';

@Component({
  selector: 'app-viewsubjectbyjcos',
  templateUrl: './viewsubjectbyjcos-list.component.html',
  styleUrls: ['./viewsubjectbyjcos-list.component.sass']
})
export class ViewSubjectListByJCOsComponent implements OnInit {
   masterData = MasterData;
  loading = false;
  userRole = Role;
  ELEMENT_DATA: BNASubjectName[] = [];
  isLoading = false;
  status=1;
  isShown: boolean = false;
  subjectNameList: any[];
  selectedBranch: SelectedModel[];
  dbType:any; 
  showHideDiv= false;
  
  branchId:any;
  traineeId:any;
  role:any;

  //SelectedsubjectsBySchoolAndCourse:BNASubjectName[];
  groupArrays:{ branchName: string; courses: any; }[];
  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['paperNo', 'subjectName', 'totalMark', 'passMarkBna','qExamTime', 'remarks'];


   selection = new SelectionModel<BNASubjectName>(true, []);

  
  constructor(private snackBar: MatSnackBar, private authService: AuthService,private BNASubjectNameService: BNASubjectNameService,private router: Router,private confirmService: ConfirmService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.dbType = Number(this.route.snapshot.paramMap.get('backType'));
    var courseDurationId = this.route.snapshot.paramMap.get('courseDurationId');

    this.role = this.authService.currentUserValue.role.trim();
    this.traineeId =  this.authService.currentUserValue.traineeId.trim();
    this.branchId =  this.authService.currentUserValue.branchId.trim();
    console.log(this.role, this.traineeId, this.branchId)

    //this.onSelectionChange();
    this.getSelectedBranch();
    this.getselectedSubjectNameList(courseDurationId);
    
  }
  
  getSelectedBranch() {
    this.BNASubjectNameService.getSelectedBranch().subscribe(res => {
      this.selectedBranch = res
    });
  }
  
  getselectedSubjectNameList(courseDurationId) {
    this.isLoading = true;
    //this.isShown = true;
    this.BNASubjectNameService.getselectedSubjectNameList(courseDurationId).subscribe(res => {
      this.subjectNameList = res

      // this gives an object with dates as keys
      const groups = this.subjectNameList.reduce((groups, courses) => {
        const branchName = courses.branchName;
        if (!groups[branchName]) {
          groups[branchName] = [];
        }
        groups[branchName].push(courses);
        return groups;
      }, {});

      // Edit: to add it in the array format instead
      this.groupArrays = Object.keys(groups).map((branchName) => {
        return {
          branchName,
          courses: groups[branchName]
        };
      });

      console.log(this.groupArrays)
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
                    .tbl-by-group tr .cl-mrk-rmrk {
                      display:none;
                    }
                    .tbl-by-group tr .btn-tbl-view {
                      display:none;
                    }
                    .tbl-by-group tr .btn-tbl-nomination {
                      display:none;
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
          <h3>Subject List</h3>
          </div>
          <br>
          <hr>
          ${printContents}
        </body>
        
        <footer>
        <p>tms.navy.mil.bd</p>
        </footer>
      </html>`
      
    );
    popupWin.document.close();

}
 
  
  // deleteItem(row) {
  //   const id = row.bnaSubjectNameId; 
  //   this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This BNASubjectName Item').subscribe(result => {
  //     console.log(result);
  //     if (result) {
  //       this.BNASubjectNameService.delete(id).subscribe(() => {
  //         this.getBNASubjectNames();
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

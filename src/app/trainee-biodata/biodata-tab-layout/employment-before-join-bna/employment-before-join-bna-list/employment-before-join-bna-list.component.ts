import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmploymentBeforeJoinBNA } from '../../models/EmploymentBeforeJoinBNA';
import { EmploymentBeforeJoinBNAService } from '../../service/EmploymentBeforeJoinBNA.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employment-before-join-bna-list',
  templateUrl: './employment-before-join-bna-list.component.html',
  styleUrls: ['./employment-before-join-bna-list.component.sass']
})
export class EmploymentBeforeJoinBNAListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: EmploymentBeforeJoinBNA[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'name','appointment','durationFrom', 'durationTo', 'remarks', 'additionalInformation', 'actions'];
  dataSource: MatTableDataSource<EmploymentBeforeJoinBNA> = new MatTableDataSource();

  SelectionModel = new SelectionModel<EmploymentBeforeJoinBNA>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private EmploymentBeforeJoinBNAService: EmploymentBeforeJoinBNAService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getEmploymentBeforeJoinBNAs();
  }
 
  getEmploymentBeforeJoinBNAs() {
    this.isLoading = true;

    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.EmploymentBeforeJoinBNAService.getdatabytraineeid(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getEmploymentBeforeJoinBNAs();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getEmploymentBeforeJoinBNAs();
  } 

  deleteItem(row) {
    const id = row.employmentBeforeJoinBnaId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This  Item').subscribe(result => {
      if (result) {
        this.EmploymentBeforeJoinBNAService.delete(id).subscribe(() => {
          this.getEmploymentBeforeJoinBNAs();
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

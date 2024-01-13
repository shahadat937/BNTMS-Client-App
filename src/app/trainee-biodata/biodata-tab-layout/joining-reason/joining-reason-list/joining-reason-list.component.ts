import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { JoiningReason } from '../../models/JoiningReason';
import { JoiningReasonService } from '../../service/JoiningReason.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-joining-reason-list',
  templateUrl: './joining-reason-list.component.html',
  styleUrls: ['./joining-reason-list.component.sass']
})
export class JoiningReasonListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: JoiningReason[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'reasonTypeName','ifAnotherReason','additionlInformation','actions'];
  dataSource: MatTableDataSource<JoiningReason> = new MatTableDataSource();

  SelectionModel = new SelectionModel<JoiningReason>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private JoiningReasonService: JoiningReasonService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getJoiningReasons();
  }
 
  getJoiningReasons() {
    this.isLoading = true;
    this.traineeId= this.route.snapshot.paramMap.get('traineeId');
    this.JoiningReasonService.getJoiningReasonByTraineeId(+this.traineeId).subscribe(response => {     
     console.log(response);
     this.dataSource.data=response;
    })
  }
  
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getJoiningReasons();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getJoiningReasons();
  } 

  deleteItem(row) {
    const id = row.joiningReasonId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      console.log(result);
      if (result) {
        this.JoiningReasonService.delete(id).subscribe(() => {
          this.getJoiningReasons();
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

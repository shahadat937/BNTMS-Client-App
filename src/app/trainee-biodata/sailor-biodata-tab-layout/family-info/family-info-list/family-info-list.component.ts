import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ParentRelative } from '../../models/ParentRelative';
import { ParentRelativeService } from '../../service/ParentRelative.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-family-info-list',
  templateUrl: './family-info-list.component.html',
  styleUrls: ['./family-info-list.component.sass']
})
export class ParentRelativeListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ParentRelative[];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  // searchText="";

  displayedColumns: string[] = ['ser','nameInFull', 'relationType','deadStatusValue','occupation','mobile', 'actions'];
  //public dataSource = new MatTableDataSource<ParentRelative>();
  dataSource: MatTableDataSource<ParentRelative> = new MatTableDataSource();

  SelectionModel = new SelectionModel<ParentRelative>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private ParentRelativeService: ParentRelativeService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getParentRelatives();
  }
 
  getParentRelatives() {
    this.isLoading = true;
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.ParentRelativeService.getdatabytraineeid(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getParentRelatives();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getParentRelatives();
  // } 

  deleteItem(row) {
    const id = row.parentRelativeId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.ParentRelativeService.delete(id).subscribe(() => {
          this.getParentRelatives();
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

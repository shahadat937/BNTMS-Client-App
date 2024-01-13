import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EducationalQualification } from '../../models/EducationalQualification';
import { EducationalQualificationService } from '../../service/EducationalQualification.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-educational-qualification-list',
  templateUrl: './educational-qualification-list.component.html',
  styleUrls: ['./educational-qualification-list.component.sass']
})
export class EducationalQualificationListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: EducationalQualification[];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  // searchText="";

  displayedColumns: string[] = ['ser', 'examType','passingYear','group','result','board', 'actions'];
  //public dataSource = new MatTableDataSource<EducationalQualification>();
  dataSource: MatTableDataSource<EducationalQualification> = new MatTableDataSource();

  SelectionModel = new SelectionModel<EducationalQualification>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private EducationalQualificationService: EducationalQualificationService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getEducationalQualifications();
  }
 
  getEducationalQualifications() {
    this.isLoading = true;
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.EducationalQualificationService.getdatabytraineeid(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  // pageChanged(event: PageEvent) {
  
  //   this.paging.pageIndex = event.pageIndex
  //   this.paging.pageSize = event.pageSize
  //   this.paging.pageIndex = this.paging.pageIndex + 1
  //   this.getEducationalQualifications();
 
  // }
  // applyFilter(searchText: any){ 
  //   this.searchText = searchText;
  //   this.getEducationalQualifications();
  // } 

  deleteItem(row) {
    const id = row.educationalQualificationId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.EducationalQualificationService.delete(id).subscribe(() => {
          this.getEducationalQualifications();
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

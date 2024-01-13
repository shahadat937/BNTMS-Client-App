import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CovidVaccine } from '../../models/CovidVaccine';
import { CovidVaccineService } from '../../service/CovidVaccine.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-covid-vaccine-list',
  templateUrl: './covid-vaccine-list.component.html',
  styleUrls: ['./covid-vaccine-list.component.sass']
})
export class CovidVaccineListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CovidVaccine[] = [];
  isLoading = false;
  traineeId: any;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'vaccineName','date','place','noOfDose','remarks','actions'];
  dataSource: MatTableDataSource<CovidVaccine> = new MatTableDataSource();

  SelectionModel = new SelectionModel<CovidVaccine>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private CovidVaccineService: CovidVaccineService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getCovidVaccines();
  }
 
  getCovidVaccines() {
    this.isLoading = true;
    this.traineeId= this.route.snapshot.paramMap.get('traineeId');
    this.CovidVaccineService.getCovidVaccineByTraineeId(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getCovidVaccines();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getCovidVaccines();
  } 

  deleteItem(row) {
    const id = row.covidVaccineId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.CovidVaccineService.delete(id).subscribe(() => {
          this.getCovidVaccines();
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

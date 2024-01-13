import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Question } from '../../models/Question';
import { QuestionService } from '../../service/Question.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.sass']
})
export class QuestionListComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Question[] = [];
  isLoading = false;
  traineeId: string;

  paging = {
    pageIndex: this.masterData.paging.pageIndex,
    pageSize: this.masterData.paging.pageSize,
    length: 1
  }
  searchText="";

  displayedColumns: string[] = ['ser', 'questionType','answer','additionalInformation','actions'];
  dataSource: MatTableDataSource<Question> = new MatTableDataSource();

  SelectionModel = new SelectionModel<Question>(true, []);

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private QuestionService: QuestionService,private router: Router,private confirmService: ConfirmService) { }
  ngOnInit() {
    this.getQuestions();
  }
 
  getQuestions() {
    this.isLoading = true;
    
    this.traineeId = this.route.snapshot.paramMap.get('traineeId');
    this.QuestionService.getdatabytraineeid(+this.traineeId).subscribe(response => {     
     this.dataSource.data=response;
    })
  }
  pageChanged(event: PageEvent) {
  
    this.paging.pageIndex = event.pageIndex
    this.paging.pageSize = event.pageSize
    this.paging.pageIndex = this.paging.pageIndex + 1
    this.getQuestions();
 
  }
  applyFilter(searchText: any){ 
    this.searchText = searchText;
    this.getQuestions();
  } 

  deleteItem(row) {
    const id = row.questionId; 
    this.confirmService.confirm('Confirm delete message', 'Are You Sure Delete This Item').subscribe(result => {
      if (result) {
        this.QuestionService.delete(id).subscribe(() => {
          this.getQuestions();
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

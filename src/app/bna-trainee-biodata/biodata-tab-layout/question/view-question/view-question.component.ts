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
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.sass']
})
export class ViewQuestionComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Question[] = [];
  isLoading = false;
  questionId: number;
  traineeId: number;
  questionTypeId: number;
  questionType: string; 
  answer: string; 
  additionalInformation: string;
           
  

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private QuestionService: QuestionService,private router: Router,private confirmService: ConfirmService) { }
  
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('questionId'); 
    this.QuestionService.find(+id).subscribe( res => {
      this.questionId = res.questionId,
      this.traineeId = res.traineeId,
      this.questionTypeId = res.questionTypeId,
      this.questionType = res.questionType,
      this.answer = res.answer,
      this.additionalInformation = res.additionalInformation
             
    })
    //this.getDistrict();
    //this.getThana();
  }

  


}

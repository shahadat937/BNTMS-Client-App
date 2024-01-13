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
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-educational-qualification',
  templateUrl: './view-educational-qualification.component.html',
  styleUrls: ['./view-educational-qualification.component.sass']
})
export class ViewEducationalQualificationComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: EducationalQualification[] = [];
  isLoading = false;
  educationalQualificationId: number;
  traineeId: number;
  examTypeId: number;
  examType: string;
  boardId: number;
  board: string;
  // address: string;
  // subject: string;
  // instituteName: string;
  groupId: number;
  group: string;
  passingYear: string;
  result: string;
  // outOfResult: string;
  // courseDuration: string;
  // status:number;           
  // additionaInformation: string;
  examTypeValues:SelectedModel[]; 
  groupValues:SelectedModel[]; 
  boardValues:SelectedModel[]; 

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private EducationalQualificationService: EducationalQualificationService,private router: Router,private confirmService: ConfirmService) { }
  
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('educationalQualificationId'); 
    this.EducationalQualificationService.find(+id).subscribe( res => {
      this.educationalQualificationId = res.educationalQualificationId,
      this.traineeId = res.traineeId,
      this.examTypeId = res.examTypeId,
      this.examType = res.examType,
      this.groupId = res.groupId,
      this.group = res.group,    
      this.boardId = res.boardId,
      this.board = res.board,
      this.passingYear = res.passingYear,
      this.result = res.result      
    })
    
  }

  

}

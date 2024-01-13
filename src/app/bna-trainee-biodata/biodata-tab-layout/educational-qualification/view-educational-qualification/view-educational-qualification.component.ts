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
  address: string;
  subject: string;
  instituteName: string;
  groupId: number;
  group: string;
  passingYear: string;
  result: string;
  outOfResult: string;
  courseDuration: string;
  status:number;           
  additionaInformation: string;
  examTypeValues:SelectedModel[]; 
  groupValues:SelectedModel[]; 
  boardValues:SelectedModel[]; 

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private EducationalQualificationService: EducationalQualificationService,private router: Router,private confirmService: ConfirmService) { }
  
  // getExamType(){    
  //   this.EducationalQualificationService.getselectedexamtype().subscribe(res=>{
  //     this.examTypeValues=res
   
  //     for(let code of this.examTypeValues){        
  //       if(this.examTypeId == code.value ){
  //         this.examType = code.text;
  //         return this.examType;
  //       }
  //     }      
  //   });
  // }

  // getBoard(){    
  //   this.EducationalQualificationService.getselectedboard().subscribe(res=>{
  //     this.boardValues=res
   
  //     for(let code of this.boardValues){        
  //       if(this.boardId == code.value ){
  //         this.board = code.text;
  //         return this.board;
  //       }
  //     }      
  //   });
  // }

  // getGroup(){    
  //   this.EducationalQualificationService.getselectedgroup().subscribe(res=>{
  //     this.groupValues=res
     
  //     for(let code of this.groupValues){        
  //       if(this.groupId == code.value ){
  //         this.group = code.text;
  //         return this.group;
  //       }
  //     }      
  //   });
  // }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('educationalQualificationId'); 
    this.EducationalQualificationService.find(+id).subscribe( res => {
      this.educationalQualificationId = res.educationalQualificationId,
      this.traineeId = res.traineeId,
      this.examTypeId = res.examTypeId,
      this.examType = res.examType,
      this.board = res.board,
      this.group = res.group,    
      this.boardId = res.boardId,
      this.address = res.address,
      this.subject = res.subject,
      this.instituteName = res.instituteName,
      this.groupId = res.groupId,
      this.passingYear = res.passingYear,
      this.result = res.result,
      this.outOfResult = res.outOfResult,
      this.courseDuration = res.courseDuration,
      this.status = res.status,            
      this.additionaInformation = res.additionaInformation        
    })
    // this.getExamType();
    // this.getBoard();
    // this.getGroup();
  }

  

}

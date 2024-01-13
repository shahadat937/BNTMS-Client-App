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
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-family-info',
  templateUrl: './view-family-info.component.html',
  styleUrls: ['./view-family-info.component.sass']
})
export class ViewParentRelativeComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: ParentRelative[] = [];
  isLoading = false;
  parentRelativeId: number;
  traineeId: number;
  relationTypeId: number;
  relationType: string;
  nameInFull: string;
  deadStatus: number;
  deadStatusValue: string;
  occupationId: number;
  occupation: string;
  mobile: string;
  
  

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private ParentRelativeService: ParentRelativeService,private router: Router,private confirmService: ConfirmService) { }
  
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('parentRelativeId'); 
    this.ParentRelativeService.find(+id).subscribe( res => {
      
      this.parentRelativeId = res.parentRelativeId,
      this.traineeId = res.traineeId,
      this.relationTypeId = res.relationTypeId,
      this.relationType = res.relationType,
      this.nameInFull = res.nameInFull,
      this.deadStatus = res.deadStatus,
      this.deadStatusValue = res.deadStatusValue,     
      this.occupationId = res.occupationId,   
      this.occupation = res.occupation,
      this.mobile = res.mobile  
        
    })
    // this.getExamType();
    // this.getBoard();
    // this.getGroup();
  }

  

}

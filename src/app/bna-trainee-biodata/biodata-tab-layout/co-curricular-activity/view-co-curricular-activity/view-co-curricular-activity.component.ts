import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoCurricularActivity } from '../../models/CoCurricularActivity';
import { CoCurricularActivityService } from '../../service/CoCurricularActivity.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-co-curricular-activity',
  templateUrl: './view-co-curricular-activity.component.html',
  styleUrls: ['./view-co-curricular-activity.component.sass']
})
export class ViewCoCurricularActivityComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: CoCurricularActivity[] = [];
  isLoading = false;
  coCurricularActivityId: number;
  traineeId: number;
  coCurricularActivityTypeId: number;
  coCurricularActivityType: string;
  participation: string;
  achievement: string;  
  // examTypeValues:SelectedModel[]; 
  // groupValues:SelectedModel[]; 
  // boardValues:SelectedModel[]; 

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private CoCurricularActivityService: CoCurricularActivityService,private router: Router,private confirmService: ConfirmService) { }
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('coCurricularActivityId'); 
    this.CoCurricularActivityService.find(+id).subscribe( res => {
      this.coCurricularActivityId = res.coCurricularActivityId,
      this.traineeId = res.traineeId,
      this.coCurricularActivityTypeId = res.coCurricularActivityTypeId,
      this.coCurricularActivityType = res.coCurricularActivityType,
      this.participation = res.participation,
      this.achievement = res.achievement
    })
  }

  

}

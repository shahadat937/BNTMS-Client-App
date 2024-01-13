import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TraineeVisitedAboard } from '../../models/TraineeVisitedAboard';
import { TraineeVisitedAboardService } from '../../service/TraineeVisitedAboard.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-trainee-visited-abroad',
  templateUrl: './view-trainee-visited-abroad.component.html',
  styleUrls: ['./view-trainee-visited-abroad.component.sass']
})
export class ViewTraineeVisitedAboardComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeVisitedAboard[] = [];
  isLoading = false;
  traineeVisitedAboardId: number;
  traineeId: number;
  countryId: number;
  country: string;
  purposeOfVisit: string;
  durationFrom: Date;
  durationTo: Date;
  additionalInformation: string;
  //status: number;
  // electedValues:SelectedModel[]; 

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeVisitedAboardService: TraineeVisitedAboardService,private router: Router,private confirmService: ConfirmService) { }
  
  // getElected(){    
  //   this.TraineeVisitedAboardService.getselectedelected().subscribe(res=>{
  //     this.electedValues=res
  //     console.log(this.electedValues);
  //     for(let code of this.electedValues){        
  //       if(this.electedId == code.value ){
  //         this.elected = code.text;
  //         return this.elected;
  //       }
  //     }      
  //   });
  // }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('traineeVisitedAboardId'); 
    this.TraineeVisitedAboardService.find(+id).subscribe( res => {
      console.log(res);
      this.traineeVisitedAboardId = res.traineeVisitedAboardId,
      this.traineeId = res.traineeId,
      this.countryId = res.countryId,
      this.country = res.country,
      this.purposeOfVisit = res.purposeOfVisit,
      this.durationFrom = res.durationFrom,
      this.durationTo = res.durationTo,
      this.additionalInformation = res.additionalInformation 
      //this.status = res.status      
    })
    //this.getElected();
  }
}

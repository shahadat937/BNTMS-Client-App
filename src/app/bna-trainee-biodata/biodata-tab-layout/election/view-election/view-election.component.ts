import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Election } from '../../models/Election';
import { ElectionService } from '../../service/Election.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-election',
  templateUrl: './view-election.component.html',
  styleUrls: ['./view-election.component.sass']
})
export class ViewElectionComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: Election[] = [];
  isLoading = false;
  electionId: number;
  traineeId: number;
  instituteName: string;
  electedId: number;
  elected: string;
  appointmentName: string;
  durationFrom: Date;
  durationTo: Date;
  additionalInformation: string;  

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private ElectionService: ElectionService,private router: Router,private confirmService: ConfirmService) { }
  
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('electionId'); 
    this.ElectionService.find(+id).subscribe( res => {
      this.electionId = res.electionId,
      this.traineeId = res.traineeId,
      this.instituteName = res.instituteName,
      this.electedId = res.electedId,
      this.elected = res.elected,
      this.appointmentName = res.appointmentName,
      this.durationFrom = res.durationFrom,
      this.durationTo = res.durationTo,                
      this.additionalInformation = res.additionalInformation        
    })
    //this.getElected();
  }
}

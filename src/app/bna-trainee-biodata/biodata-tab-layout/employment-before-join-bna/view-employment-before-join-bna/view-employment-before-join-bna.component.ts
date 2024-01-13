import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmploymentBeforeJoinBNA } from '../../models/EmploymentBeforeJoinBNA';
import { EmploymentBeforeJoinBNAService } from '../../service/EmploymentBeforeJoinBNA.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-employment-before-join-bna',
  templateUrl: './view-employment-before-join-bna.component.html',
  styleUrls: ['./view-employment-before-join-bna.component.sass']
})
export class ViewEmploymentBeforeJoinBNAComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: EmploymentBeforeJoinBNA[] = [];
  isLoading = false;
  employmentBeforeJoinBnaId: number;
  traineeId: number;
  name: string;
  appointment: string; 
  durationFrom:Date;
  durationTo:Date;
  remarks: string;
  additionalInformation: string;
           
  

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private EmploymentBeforeJoinBNAService: EmploymentBeforeJoinBNAService,private router: Router,private confirmService: ConfirmService) { }
  
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('employmentBeforeJoinBnaId'); 
    this.EmploymentBeforeJoinBNAService.find(+id).subscribe( res => {
      console.log(res);
      this.employmentBeforeJoinBnaId = res.employmentBeforeJoinBnaId,
      this.traineeId = res.traineeId,
      this.name = res.name,
      this.appointment = res.appointment,
      this.durationFrom = res.durationFrom,
      this.durationTo = res.durationTo,
      this.remarks = res.remarks,
      this.additionalInformation = res.additionalInformation
             
    })
    
  }

  


}

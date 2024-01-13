import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GrandFather } from '../../models/GrandFather';
import { GrandFatherService } from '../../service/GrandFather.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-grandfather',
  templateUrl: './view-grandfather.component.html',
  styleUrls: ['./view-grandfather.component.sass']
})
export class ViewGrandFatherComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: GrandFather[] = [];
  isLoading = false;
  grandFatherId: number;
  traineeId: number;
  grandFatherTypeId: number;
  grandFatherType: string;
  occupationId: number;
  occupation: string;
  grandFathersName: string;
  age: number;
  deadStatus: number;
  deadStatusValue: string;
  nationalityId: number;
  nationality: string;  
  status:number;           
  additionalInformation: string;

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private GrandFatherService: GrandFatherService,private router: Router,private confirmService: ConfirmService) { }
  
  

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('grandFatherId'); 
    this.GrandFatherService.find(+id).subscribe( res => {
      this.grandFatherId = res.grandFatherId,
      this.traineeId = res.traineeId,
      this.grandFatherTypeId = res.grandFatherTypeId,
      this.grandFatherType = res.grandFatherType,
      this.occupation = res.occupation,
      this.deadStatusValue = res.deadStatusValue,
      this.nationality = res.nationality,
      this.grandFathersName = res.grandFathersName,
      this.occupationId = res.occupationId,
      this.age = res.age,
      this.deadStatus = res.deadStatus,
      this.nationalityId = res.nationalityId,
      this.additionalInformation = res.additionalInformation,
      this.status = res.status    
    })
    // this.grendFatherType();
    // this.getOccupationName();
    // this.getNationalityName();
  }

}

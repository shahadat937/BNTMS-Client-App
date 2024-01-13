import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TraineeLanguage } from '../../models/TraineeLanguage';
import { TraineeLanguageService } from '../../service/TraineeLanguage.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-trainee-language',
  templateUrl: './view-trainee-language.component.html',
  styleUrls: ['./view-trainee-language.component.sass']
})
export class ViewTraineeLanguageComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeLanguage[] = [];
  isLoading = false;
  traineeLanguageId: number;
  traineeId: number;
  languageId: number;
  languageName: string;
  speaking: string;
  writing: string;
  reading: string;
  additionalInformation: string;
  status: number;
  menuPosition: number;
  isActive: true

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeLanguageService: TraineeLanguageService,private router: Router,private confirmService: ConfirmService) { }
  
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('traineeLanguageId'); 
    this.TraineeLanguageService.find(+id).subscribe( res => {
      

      this.traineeLanguageId= res.traineeLanguageId,
      this.traineeId= res.traineeId,
      this.languageId= res.languageId,
      this.languageName = res.languageName,
      this.speaking=res.speaking,
      this.writing=res.writing,
      this.reading=res.reading,
      this.additionalInformation= res.additionalInformation,
      //status= res.status,
     // menuPosition=res.menuPosition,
     this.isActive= true

      // this.TraineeLanguageId = res.TraineeLanguageId,
      // this.traineeId = res.traineeId,
      // this.instituteName = res.instituteName,
      // this.address = res.address,
      // this.districtId = res.districtId,
      // this.thanaId = res.thanaId,
      // this.classStudiedFrom = res.classStudiedFrom,
      // this.classStudiedTo = res.classStudiedTo,
      // this.yearFrom = res.yearFrom,
      // this.yearTo = res.yearTo,
      // this.additionaInformation = res.additionaInformation,
      // this.status = res.status         
    })
  }
}

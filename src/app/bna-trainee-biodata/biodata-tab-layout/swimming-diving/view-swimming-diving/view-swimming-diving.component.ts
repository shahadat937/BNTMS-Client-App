import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SwimmingDiving } from '../../models/SwimmingDiving';
import { SwimmingDivingService } from '../../service/SwimmingDiving.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-swimming-diving',
  templateUrl: './view-swimming-diving.component.html',
  styleUrls: ['./view-swimming-diving.component.sass']
})
export class ViewSwimmingDivingComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: SwimmingDiving[] = [];
  isLoading = false;
  swimmingDivingId: number;
  traineeId: number;
  swimmingDivingTypeId: number;
  swimmingLevelId: number; 
  additionalInformation: string;
           
  //districtValues:SelectedModel[]; 
  //thanaValues:SelectedModel[]; 

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private SwimmingDivingService: SwimmingDivingService,private router: Router,private confirmService: ConfirmService) { }
  
  // getDistrict(){    
  //   this.SwimmingDivingService.getselecteddistrict().subscribe(res=>{
  //     this.districtValues=res
  //     console.log(this.districtValues);
  //     for(let code of this.districtValues){        
  //       if(this.districtId == code.value ){
  //         this.district = code.text;
  //         return this.district;
  //       }
  //     }      
  //   });
  // }

  // getThana(){    
  //   this.SwimmingDivingService.getselectedthana().subscribe(res=>{
  //     this.thanaValues=res
  //     console.log(this.thanaValues);
  //     for(let code of this.thanaValues){        
  //       if(this.thanaId == code.value ){
  //         this.thana = code.text;
  //         return this.thana;
  //       }
  //     }      
  //   });
  // }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('swimmingDivingId'); 
    this.SwimmingDivingService.find(+id).subscribe( res => {
      console.log(res);
      this.swimmingDivingId = res.swimmingDivingId,
      this.traineeId = res.traineeId,
      this.swimmingDivingTypeId = res.swimmingDivingTypeId,
      this.swimmingLevelId = res.swimmingLevelId,
      this.additionalInformation = res.additionalInformation
             
    })
    //this.getDistrict();
    //this.getThana();
  }

  


}

import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TraineeMembership } from '../../models/TraineeMembership';
import { TraineeMembershipService } from '../../service/TraineeMembership.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-trainee-membership',
  templateUrl: './view-trainee-membership.component.html',
  styleUrls: ['./view-trainee-membership.component.sass']
})
export class ViewTraineeMembershipComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeMembership[] = [];
  isLoading = false;
  traineeMembershipId: number;
  traineeId: number;
  orgName: string;
  membershipTypeId: number;
  membershipType: string;
  briefAddress: string;
  appointment: string;
  durationFrom: Date;
  durationTo: Date;
  additionalInformation: string;  
  // electedValues:SelectedModel[]; 

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeMembershipService: TraineeMembershipService,private router: Router,private confirmService: ConfirmService) { }
  
  // getElected(){    
  //   this.TraineeMembershipService.getselectedelected().subscribe(res=>{
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
    const id = this.route.snapshot.paramMap.get('traineeMembershipId'); 
    this.TraineeMembershipService.find(+id).subscribe( res => {
      console.log(res);
      this.traineeMembershipId = res.traineeMembershipId,
      this.traineeId = res.traineeId,
      this.orgName = res.orgName,
      this.membershipTypeId = res.membershipTypeId,
      this.membershipType = res.membershipType,
      this.briefAddress = res.briefAddress,
      this.appointment = res.appointment,
      this.durationFrom = res.durationFrom,     
      this.durationTo = res.durationTo,                
      this.additionalInformation = res.additionalInformation        
    })
    //this.getElected();
  }
}

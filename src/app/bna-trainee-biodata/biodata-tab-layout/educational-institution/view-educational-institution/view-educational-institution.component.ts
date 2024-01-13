import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EducationalInstitution } from '../../models/EducationalInstitution';
import { EducationalInstitutionService } from '../../service/EducationalInstitution.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-education',
  templateUrl: './view-educational-institution.component.html',
  styleUrls: ['./view-educational-institution.component.sass']
})
export class ViewEducationalInstitutionComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: EducationalInstitution[] = [];
  isLoading = false;
  educationalInstitutionId: number;
  traineeId: number;
  instituteName: string;
  address: string;
  districtId: number;
  district: string;
  thanaId: number;
  thana: string;
  classStudiedFrom: string;
  classStudiedTo: string;
  yearFrom: string; 
  yearTo: string; 
  additionaInformation: string;
  status:number;           
  districtValues:SelectedModel[]; 
  thanaValues:SelectedModel[]; 

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private EducationalInstitutionService: EducationalInstitutionService,private router: Router,private confirmService: ConfirmService) { }
  
  // getDistrict(){    
  //   this.EducationalInstitutionService.getselecteddistrict().subscribe(res=>{
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
  //   this.EducationalInstitutionService.getselectedthana().subscribe(res=>{
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
    const id = this.route.snapshot.paramMap.get('educationalInstitutionId'); 
    this.EducationalInstitutionService.find(+id).subscribe( res => {
      console.log(res);
      this.educationalInstitutionId = res.educationalInstitutionId,
      this.traineeId = res.traineeId,
      this.instituteName = res.instituteName,
      this.address = res.address,
      this.districtId = res.districtId,
      this.district = res.district,
      this.thanaId = res.thanaId,
      this.thana = res.thana,
      this.classStudiedFrom = res.classStudiedFrom,
      this.classStudiedTo = res.classStudiedTo,
      this.yearFrom = res.yearFrom,
      this.yearTo = res.yearTo,
      this.additionaInformation = res.additionaInformation,
      this.status = res.status         
    })
    // this.getDistrict();
    // this.getThana();
  }

  


}

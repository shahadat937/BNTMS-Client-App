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
  maritalStatus: string;
  deadStatusValue: string;
  nationality: string;
  religion: string;
  caste: string;
  occupation: string;
  previousOccupation: string;
  division: string;
  district: string;
  thana: string;
  defenseType: string;
  rank: string;
  secondNationality: string;
  nameInFull: string;
  dateOfBirth: Date;
  maritalStatusId: number;
  dateOfMarriage: Date;
  age: number;
  deadStatus: number;
  dateOfExpiry: Date;
  nationalityId: number;
  religionId: number;
  casteId: number;
  occupationId: number;
  occupationDetail: string;
  educationQualification: string;
  previousOccupationId: number;
  monthlyIncome: string;
  divisionId: number;
  districtId: number;
  thanaId: number;
  postCode: string;
  presentAddress: string;
  parmanentAddress: string;
  mobile: string;
  email: string;
  remarks: string;
  isDefenceJobExperience: string;
  defenseTypeId: number;
  rankId: number;
  retiredDate: Date;
  placeOfBirth: string;
  dualNationality: string;
  secondNationalityId: number;
  reasonOfMigration: string;
  migrationDate: Date;
  additionalInformation: string;
  status: number;          
  additionaInformation: string;
  

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private ParentRelativeService: ParentRelativeService,private router: Router,private confirmService: ConfirmService) { }
  
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('parentRelativeId'); 
    this.ParentRelativeService.find(+id).subscribe( res => {
      console.log(res);
      this.parentRelativeId = res.parentRelativeId,
      this.traineeId = res.traineeId,
      this.relationTypeId = res.relationTypeId,
      this.relationType = res.relationType,
      this.nameInFull = res.nameInFull,
      this.dateOfBirth = res.dateOfBirth,
      this.maritalStatusId = res.maritalStatusId,
      this.maritalStatus = res.maritalStatus,
      this.dateOfMarriage = res.dateOfMarriage,
      this.age = res.age,
      this.deadStatus = res.deadStatus,
      this.deadStatusValue = res.deadStatusValue,
      this.dateOfExpiry = res.dateOfExpiry,
      this.nationalityId = res.nationalityId,
      this.nationality = res.nationality,
      this.religionId = res.religionId,
      this.religion = res.religion,
      this.casteId = res.casteId,  
      this.caste = res.caste,          
      this.occupationId = res.occupationId,   
      this.occupation = res.occupation,
      this.occupationDetail = res.occupationDetail,   
      this.educationQualification = res.educationQualification,            
      this.previousOccupationId = res.previousOccupationId,   
      this.previousOccupation = res.previousOccupation,
      this.monthlyIncome = res.monthlyIncome,   
      this.divisionId = res.divisionId,   
      this.division = res.division,
      this.districtId = res.districtId,   
      this.district = res.district,
      this.thanaId = res.thanaId,  
      this.thana = res.thana, 
      this.postCode = res.postCode,   
      this.presentAddress = res.presentAddress,   
      this.parmanentAddress = res.parmanentAddress,   
      this.mobile = res.mobile,   
      this.email = res.email,   
      this.remarks = res.remarks,   
      this.isDefenceJobExperience = res.isDefenceJobExperience.trim(),   
      this.defenseTypeId = res.defenseTypeId,   
      this.defenseType = res.defenseType,
      this.rankId = res.rankId,   
      this.rank = res.rank,
      this.retiredDate = res.retiredDate,   
      this.placeOfBirth = res.placeOfBirth,   
      this.dualNationality = res.dualNationality.trim(),   
      this.secondNationalityId = res.secondNationalityId,   
      this.secondNationality = res.secondNationality,
      this.reasonOfMigration = res.reasonOfMigration,   
      this.migrationDate = res.migrationDate,   
      this.additionalInformation = res.additionalInformation,   
      this.status = res.status     
    })
    // this.getExamType();
    // this.getBoard();
    // this.getGroup();
  }

  

}

import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TraineeBIODataOther } from '../../models/TraineeBIODataOther';
import { TraineeBIODataOtherService } from '../../service/TraineeBIODataOther.service';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmService } from '../../../../core/service/confirm.service';
//import{MasterData} from 'src/assets/data/master-data'
import{MasterData} from '../../../../../assets/data/master-data';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectedModel } from 'src/app/core/models/selectedModel';

@Component({
  selector: 'app-view-trainee-biodata-other',
  templateUrl: './view-trainee-biodata-other.component.html',
  styleUrls: ['./view-trainee-biodata-other.component.sass']
})
export class ViewTraineeBIODataOtherComponent implements OnInit {

   masterData = MasterData;
  loading = false;
  ELEMENT_DATA: TraineeBIODataOther[] = [];
  isLoading = false;
  traineeBIODataOtherId: number;
    traineeId: number;  
    bnaCurriculumTypeId: number;  
    bnaSemesterId: number;    
    utofficerTypeId: number;
    utofficerCategoryId: number;
    bnaServiceTypeId: number;
    complexionId: number;
    branchId: number;
    heightId: number;
    weightId: number;
    colorOfEyeId: number;
    bloodGroupId: number;
    religionId: number;
    casteId: number;
    countryId: number; 
    maritalStatusId: number; 
    bnaPromotionStatusId: number; 
    bnaClassSectionSelectionId: number; 
    courseNameId: number; 
    schoolNamesId: number; 
    failureStatusId: number; 
    bnaInstructorTypeId: number; 
    presentBilletId: number; 
    age: string; 
    commissionDate: Date; 
    postCode: string; 
    identificationMark: string; 
    presentAddress: string; 
    permanentAddress: string; 
    traineeStatus: number; 
    passportNo: string; 
    drivingLiccense: string;
    bankAccount: string;
    creditCard: string;
    dateOfMarriage: Date;
    remarks: string;
    placeOfBirth: string;
    dualNationality: string;
    sNationalityId: number;
    reasonOfMigration: string;
    migrationDate: Date;
    additionalInformation: string;
    relegationDate: Date;
    relegationRemarks: string;
    relegationDocument: string;
    shortCode: string;
    

    bloodGroup:string; 
    bnaClassSectionSelection:string; 
    bnaCurriculumType:string; 
    bnaInstructorType:string;
    bnaPromotionStatus:string;
    bnaSemester:string; 
    bnaServiceType:string;
    branch:string; 
    caste: string;
    colorOfEye:string;
    complexion:string;
    courseName: string;
    country:string;
    failureStatus: string;
    height:string; 
    maritalStatus:string; 
    presentBillet:string; 
    religion:string; 
    schoolName:string;
    utofficerCategory:string; 
    utofficerType:string;
    weight: string;
    
  // examTypeValues:SelectedModel[]; 
  // groupValues:SelectedModel[]; 
  // boardValues:SelectedModel[]; 

  constructor(private route: ActivatedRoute,private snackBar: MatSnackBar,private TraineeBIODataOtherService: TraineeBIODataOtherService,private router: Router,private confirmService: ConfirmService) { }
  
  // getExamType(){    
  //   this.TraineeBIODataOtherService.getselectedexamtype().subscribe(res=>{
  //     this.examTypeValues=res
  //     console.log(this.examTypeValues);
  //     for(let code of this.examTypeValues){        
  //       if(this.examTypeId == code.value ){
  //         this.examType = code.text;
  //         return this.examType;
  //       }
  //     }      
  //   });
  // }

  // getBoard(){    
  //   this.EducationalQualificationService.getselectedboard().subscribe(res=>{
  //     this.boardValues=res
  //     console.log(this.boardValues);
  //     for(let code of this.boardValues){        
  //       if(this.boardId == code.value ){
  //         this.board = code.text;
  //         return this.board;
  //       }
  //     }      
  //   });
  // }

  // getGroup(){    
  //   this.EducationalQualificationService.getselectedgroup().subscribe(res=>{
  //     this.groupValues=res
  //     console.log(this.groupValues);
  //     for(let code of this.groupValues){        
  //       if(this.groupId == code.value ){
  //         this.group = code.text;
  //         return this.group;
  //       }
  //     }      
  //   });
  // }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('traineeBioDataOtherId'); 
    this.TraineeBIODataOtherService.find(+id).subscribe( res => {
      console.log(res);
      this.traineeBIODataOtherId = res.traineeBioDataOtherId,
      this.traineeId = res.traineeId,
      this.bnaCurriculumTypeId = res.bnaCurriculumTypeId,
      this.bnaSemesterId = res.bnaSemesterId,

      this.utofficerTypeId = res.utofficerTypeId,
      this.utofficerCategoryId = res.utofficerCategoryId,
      this.bnaServiceTypeId = res.bnaServiceTypeId,
      this.complexionId = res.complexionId,
      this.branchId = res.branchId,
      this.heightId = res.heightId,
      this.weightId = res.weightId,
      this.colorOfEyeId = res.colorOfEyeId,
      this.bloodGroupId = res.bloodGroupId,            
      this.religionId = res.religionId,   
      this.casteId = res.casteId,
      this.countryId = res.countryId,
      this.maritalStatusId = res.maritalStatusId,
      this.bnaPromotionStatusId = res.bnaPromotionStatusId,
      this.bnaClassSectionSelectionId = res.bnaClassSectionSelectionId,
      this.courseNameId = res.courseNameId,
      this.schoolNamesId = res.schoolNamesId,
      this.failureStatusId = res.failureStatusId,
      this.bnaInstructorTypeId = res.bnaInstructorTypeId,
      this.presentBilletId = res.presentBilletId,
      this.age = res.age,            
      this.commissionDate = res.commissionDate, 
      this.postCode = res.postCode,
      this.identificationMark = res.identificationMark,
      this.presentAddress = res.presentAddress,
      this.permanentAddress = res.permanentAddress,
      this.traineeStatus = res.traineeStatus,
      this.passportNo = res.passportNo,
      this.drivingLiccense = res.drivingLiccense,
      this.bankAccount = res.bankAccount,
      this.creditCard = res.creditCard,
      this.dateOfMarriage = res.dateOfMarriage,
      this.remarks = res.remarks,            
      this.placeOfBirth = res.placeOfBirth,  
      this.dualNationality = res.dualNationality,
      this.sNationalityId = res.sNationalityId,
      this.reasonOfMigration = res.reasonOfMigration,
      this.migrationDate = res.migrationDate,
      this.additionalInformation = res.additionalInformation,            
      this.relegationDate = res.relegationDate,
      this.relegationRemarks = res.relegationRemarks,
      this.relegationDocument = res.relegationDocument,
      this.shortCode = res.shortCode,
      
      this.bloodGroup=res.bloodGroup,
      this.bnaClassSectionSelection=res.bnaClassSectionSelection; 
      this.bnaCurriculumType=res.bnaCurriculumType; 
      this.bnaInstructorType=res.bnaInstructorType;
      this.bnaPromotionStatus=res.bnaPromotionStatus;
      this.bnaSemester=res.bnaSemester; 
      this.bnaServiceType=res.bnaServiceType;
      this.branch=res.branch; 
      this.caste= res.caste;
      this.colorOfEye=res.colorOfEye;
      this.complexion=res.complexion;
      this.courseName= res.courseName;
      this.country=res.country;
      this.failureStatus= res.failureStatus;
      this.height=res.height; 
      this.maritalStatus=res.maritalStatus; 
      this.presentBillet=res.presentBillet; 
      this.religion=res.religion; 
      this.schoolName=res.schoolName;

      this.utofficerCategory = res.utofficerCategory;
      this.utofficerType = res.utofficerType;

      this.weight= res.weight;
    })
    // this.getExamType();
    // this.getBoard();
    // this.getGroup();
  }

  

}

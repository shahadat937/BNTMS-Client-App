import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NationalityListComponent } from './nationality/nationality-list/nationality-list.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { NewGenderComponent } from './gender/new-gender/new-gender.component';
import { Page404Component } from '../authentication/page404/page404.component';
import { NewNationalityComponent } from './nationality/new-nationality/new-nationality.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { NewGameComponent } from './game/new-game/new-game.component';
import { ExamPeriodTypeListComponent } from './examperiodtype/examperiodtype-list/examperiodtype-list.component';
import { NewExamPeriodTypeComponent } from './examperiodtype/new-examperiodtype/new-examperiodtype.component';
import { TraineeCourseStatusListComponent } from './traineecoursestatus/traineecoursestatus-list/traineecoursestatus-list.component';
import { NewTraineeCourseStatusComponent } from './traineecoursestatus/new-traineecoursestatus/new-traineecoursestatus.component';
import { WithdrawnDocListComponent } from './withdrawndoc/withdrawndoc-list/withdrawndoc-list.component';
import { NewWithdrawnDocComponent } from './withdrawndoc/new-withdrawndoc/new-withdrawndoc.component';
import { ResultStatusListComponent } from './resultstatus/resultstatus-list/resultstatus-list.component';
import { NewResultStatusComponent } from './resultstatus/new-resultstatus/new-resultstatus.component';
import { BNAClassScheduleStatusListComponent } from './bnaclassschedulestatus/bnaclassschedulestatus-list/bnaclassschedulestatus-list.component';
import { NewBNAClassScheduleStatusComponent } from './bnaclassschedulestatus/new-bnaclassschedulestatus/new-bnaclassschedulestatus.component';
import { ClassTypeListComponent } from './classtype/classtype-list/classtype-list.component';
import { NewClassTypeComponent } from './classtype/new-classtype/new-classtype.component';
import { DownloadRightListComponent } from './downloadright/downloadright-list/downloadright-list.component';
import { NewDownloadRightComponent } from './downloadright/new-downloadright/new-downloadright.component';
import { ShowRightListComponent } from './showright/showright-list/showright-list.component';
import { NewShowRightComponent } from './showright/new-showright/new-showright.component';
import { DocumentTypeListComponent } from './documenttype/documenttype-list/documenttype-list.component';
import { NewDocumentTypeComponent } from './documenttype/new-documenttype/new-documenttype.component';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { NewBranchComponent } from './branch/new-branch/new-branch.component';
import { WeightListComponent} from './weight/weight-list/weight-list.component';
import { NewWeightComponent } from './weight/new-weight/new-weight.component';
import { BNAServiceTypeListComponent } from './bnaservicetype/bnaservicetype-list/bnaservicetype-list.component';
import { NewBNAServiceTypeComponent } from './bnaservicetype/new-bnaervicetype/new-bnaservicetype.component';
import { UTOfficerTypeListComponent } from './utofficertype/utofficertype-list/utofficertype-list.component';
import { NewUTOfficerTypeComponent } from './utofficertype/new-utofficertype/new-utofficertype.component';
import { UTOfficerCategoryListComponent } from './utofficercategory/utofficercategory-list/utofficercategory-list.component';
import { NewUTOfficerCategoryComponent } from './utofficercategory/new-utofficercategory/new-utofficercategory.component';
import { BloodGroupListComponent } from './bloodgroup/bloodgroup-list/bloodgroup-list.component';
import { NewBloodGroupComponent } from './bloodgroup/new-bloodgroup/new-bloodgroup.component';
import { HeightListComponent } from './height/height-list/height-list.component';
import { NewHeightComponent } from './height/new-height/new-height.component';
import { BNACurriculamTypeListComponent } from './bnacurriculamtype/bnacurriculamtype-list/bnacurriculamtype-list.component';
import { NewBNACurriculamTypeComponent } from './bnacurriculamtype/new-bnacurriculamtype/new-bnacurriculamtype.component';
import { ComplexionListComponent } from './complexion/complexion-list/complexion-list.component';
import { NewComplexionComponent } from './complexion/new-complexion/new-complexion.component';
import { GrandFatherTypeListComponent } from './grandfathertype/grandfathertype-list/grandfathertype-list.component';
import { NewGrandFatherTypeComponent } from './grandfathertype/new-grandfathertype/new-grandfathertype.component';
import { RelationTypeListComponent } from './relationtype/relationtype-list/relationtype-list.component';
import { NewRelationTypeComponent } from './relationtype/new-relationtype/new-relationtype.component';
import { PresentBilletListComponent } from './presentbillet/presentbillet-list/presentbillet-list.component';
import { NewPresentBilletComponent } from './presentbillet/new-presentbillet/new-presentbillet.component';
import { BNAInstructorTypeListComponent } from './bnainstructortype/bnainstructortype-list/bnainstructortype-list.component';
import { NewBNAInstructorTypeComponent } from './bnainstructortype/new-bnainstructortype/new-bnainstructortype.component';
import { MaritalstatusListComponent } from './maritalstatus/maritalstatus-list/maritalstatus-list.component';
import { NewMaritalstatusComponent } from './maritalstatus/new-maritalstatus/new-maritalstatus.component';
import { MarkTypeListComponent } from './marktype/marktype-list/marktype-list.component';
import { NewMarkTypeComponent } from './marktype/new-marktype/new-marktype.component';
import { GroupListComponent } from './group/group-list/group-list.component';
import { NewGroupComponent } from './group/new-group/new-group.component';
import { BnaAttendancePeriodListComponent } from './bnaattendanceperiod/bnaattendanceperiod-list/bnaattendanceperiod-list.component';
import { NewBnaAttendancePeriodComponent } from './bnaattendanceperiod/new-bnaattendanceperiod/new-bnaattendanceperiod.component';
import { AccountTypeListComponent } from './accounttype/accounttype-list/accounttype-list.component';
import { NewAccountTypeComponent } from './accounttype/new-accounttype/new-accounttype.component';
import { BnaClassTestTypeListComponent } from './bnaclasstesttype/bnaclasstesttype-list/bnaclasstesttype-list.component';
import { NewBnaClassTestTypeComponent } from './bnaclasstesttype/new-bnaclasstesttype/new-bnaclasstesttype.component';
import { BNASemesterListComponent } from './bnasemester/bnasemester-list/bnasemester-list.component';
import { NewBNASemesterComponent } from './bnasemester/new-bnasemester/new-bnasemester.component';
import { RankListComponent } from './Rank/Rank-list/Rank-list.component';
import { NewRankComponent } from './Rank/new-Rank/new-Rank.component';
import { ReligionListComponent } from './religion/religion-list/religion-list.component';
import { NewReligionComponent } from './religion/new-religion/new-religion.component';
import { ColorOfEyeListComponent } from './colorOfEye/colorOfEye-list/colorOfEye-list.component';
import { NewColorOfEyeComponent } from './colorOfEye/new-colorOfEye/new-colorOfEye.component';
import { DefenseTypeListComponent } from './defenseType/defenseType-list/defenseType-list.component';
import { NewDefenseTypeComponent } from './defenseType/new-defenseType/new-defenseType.component';
import { OccupationListComponent } from './occupation/occupation-list/occupation-list.component';
import { NewOccupationComponent } from './occupation/new-occupation/new-occupation.component';
import { ExamTypeListComponent } from './examType/examType-list/examType-list.component';
import { NewExamTypeComponent } from './examType/new-examType/new-examType.component';
import { ReasonTypeListComponent } from './reasonType/reasonType-list/reasonType-list.component';
import { NewReasonTypeComponent } from './reasonType/new-reasonType/new-reasonType.component';
import { FavoritesTypeListComponent } from './favoritesType/favoritesType-list/favoritesType-list.component';
import { NewFavoritesTypeComponent } from './favoritesType/new-favoritesType/new-favoritesType.component';
import { MembershiptypeListComponent } from './membershiptype/membershiptype-list/membershiptype-list.component';
import { NewMembershiptypeComponent } from './membershiptype/new-membershiptype/new-membershiptype.component';
import { ElectedListComponent } from './elected/elected-list/elected-list.component';
import { NewElectedComponent } from './elected/new-elected/new-elected.component';
import { SocialmediatypeListComponent } from './socialmediatype/socialmediatype-list/socialmediatype-list.component';
import { NewSocialmediatypeComponent } from './socialmediatype/new-socialmediatype/new-socialmediatype.component';
import { BnaclasssectionselectionListComponent } from './bnaclasssectionselection/bnaclasssectionselection-list/bnaclasssectionselection-list.component';
import { NewBnaclasssectionselectiontComponent } from './bnaclasssectionselection/new-bnaclasssectionselectiont/new-bnaclasssectionselectiont.component';
import { LanguageListComponent } from './language/language-list/language-list.component';
import { NewLanguageComponent } from './language/new-language/new-language.component';
import { CourseNameListComponent } from './coursename/coursename-list/coursename-list.component';
import { NewCourseNameComponent } from './coursename/new-coursename/new-coursename.component';
import { CodeValueTypeListComponent } from './codevaluetype/codevaluetype-list/codevaluetype-list.component';
import { NewCodeValueTypeComponent } from './codevaluetype/new-codevaluetype/new-codevaluetype.component';
import { BNAPromotionStatusListComponent } from './bnapromotionstatus/bnapromotionstatus-list/bnapromotionstatus-list.component';
import { NewBNAPromotionStatusComponent } from './bnapromotionstatus/new-bnapromotionstatus/new-bnapromotionstatus.component';
import { StepRelationListComponent } from './steprelation/steprelation-list/steprelation-list.component';
import { NewStepRelationComponent } from './steprelation/new-steprelation/new-steprelation.component';
import { CoCurricularActivityTypeListComponent } from './cocurricularactivitytype/cocurricularactivitytype-list/cocurricularactivitytype-list.component';
import { NewCoCurricularActivityTypeComponent } from './cocurricularactivitytype/new-cocurricularactivitytype/new-cocurricularactivitytype.component';
import { BoardListComponent } from './board/board-list/board-list.component';
import { NewBoardComponent } from './board/new-board/new-board.component';
import { FailureStatusListComponent } from './failurestatus/failurestatus-list/failurestatus-list.component';
import { NewFailureStatusComponent } from './failurestatus/new-failurestatus/new-failurestatus.component';
import { DivisionListComponent } from './division/division-list/division-list.component';
import { NewDivisionComponent } from './division/new-division/new-division.component';
import { CodeValueListComponent } from './codevalue/codevalue-list/codevalue-list.component';
import { NewCodeValueComponent } from './codevalue/new-codevalue/new-codevalue.component';
import { QuestionTypeListComponent } from './questionType/questionType-list/questionType-list.component';
import { NewQuestionTypeComponent } from './questionType/new-questionType/new-questionType.component';
import { BNABatchListComponent } from './bnabatch/bnabatch-list/bnabatch-list.component';
import { NewBNABatchComponent } from './bnabatch/new-bnabatch/new-bnabatch.component';
import { CountryListComponent } from './country/country-list/country-list.component';
import { NewcountryComponent } from './country/new-country/new-country.component';
import { CasteListComponent } from './caste/caste-list/caste-list.component';
import { NewCasteComponent } from './caste/new-caste/new-caste.component';
import { DistrictListComponent } from './district/district-list/district-list.component';
import { NewDistrictComponent } from './district/new-district/new-district.component';
import { AdminAuthorityListComponent } from './adminauthority/adminauthority-list/adminauthority-list.component';
import { NewAdminAuthorityComponent } from './adminauthority/new-adminauthority/new-adminauthority.component';
import { BaseNameListComponent } from './basename/basename-list/basename-list.component';
import { NewBaseNameComponent } from './basename/new-basename/new-basename.component';
import { BaseSchoolNameListComponent } from './baseschoolname/baseschoolname-list/baseschoolname-list.component';
import { NewBaseSchoolNameComponent } from './baseschoolname/new-baseschoolname/new-baseschoolname.component';
import { SubjectClassificationListComponent } from './subjectclassification/subjectclassification-list/subjectclassification-list.component';
import { NewSubjectClassificationComponent } from './subjectclassification/new-subjectclassification/new-subjectclassification.component';
import { ForceTypeListComponent } from './forcetype/forcetype-list/forcetype-list.component';
import { NewForceTypeComponent } from './forcetype/new-forcetype/new-forcetype.component';
import { ThanaListComponent } from './thana/thana-list/thana-list.component';
import { NewThanaComponent } from './thana/new-thana/new-thana.component';
import { CoursetypeListComponent } from './courseType/coursetype-list/coursetype-list.component';
import {NewCoursetypeComponent} from './courseType/new-coursetype/new-coursetype.component'
import { BNASubjectCurriculamListComponent } from './bnasubjectcurriculam/bnasubjectcurriculam-list/bnasubjectcurriculam-list.component';
import { NewBnasubjectcurriculamComponent } from './bnasubjectcurriculam/new-bnasubjectcurriculam/new-bnasubjectcurriculam.component';
import { SubjecttypeListComponent } from './subjecttype/subjecttype-list/subjecttype-list.component';
import { NewSubjectTypeComponent } from './subjecttype/new-subjecttype/new-subjecttype.component';
import { SubjectCategoryListComponent } from './subjectcategory/subjectcategory-list/subjectcategory-list.component';
import { NewSubjectCategoryComponent } from './subjectcategory/new-subjectcategory/new-subjectcategory.component';
import { KindOfSubjectListComponent } from './kindofsubject/kindofsubject-list/kindofsubject-list.component';
import { NewKindOfSubjectComponent } from './kindofsubject/new-kindofsubject/new-kindofsubject.component';
import { BNAAttendanceRemarksListComponent } from './bnaattendanceremarks/bnaattendanceremarks-list/bnaattendanceremarks-list.component';
import { NewBNAAttendanceRemarksComponent } from './bnaattendanceremarks/new-bnaattendanceremarks/new-bnaattendanceremarks.component';
import { CourseModuleListComponent } from './coursemodule/coursemodule-list/coursemodule-list.component';
import { NewCourseModuleComponent } from './coursemodule/new-coursemodule/new-coursemodule.component';
import { CourseSectionListComponent } from './coursesection/coursesection-list/coursesection-list.component';
import { NewCourseSectionComponent } from './coursesection/new-coursesection/new-coursesection.component';
import { ExamMarkRemarksListComponent } from './exammarkremarks/exammarkremarks-list/exammarkremarks-list.component';
import { NewExamMarkRemarksComponent } from './exammarkremarks/new-exammarkremarks/new-exammarkremarks.component';
import { HairColorListComponent } from './haircolor/haircolor-list/haircolor-list.component';
import { NewHairColorComponent } from './haircolor/new-haircolor/new-haircolor.component';
import { ExamCenterListComponent } from './examcenter/examcenter-list/examcenter-list.component';
import { NewExamCenterComponent } from './examcenter/new-examcenter/new-examcenter.component';
import { ExamAttemptTypeListComponent } from './examattempttype/examattempttype-list/examattempttype-list.component';
import { NewExamAttemptTypeComponent } from './examattempttype/new-examattempttype/new-examattempttype.component';
import { OrganizationNameListComponent } from './organizationname/organizationname-list/organizationname-list.component';
import { NewOrganizationNameComponent } from './organizationname/new-organizationname/new-organizationname.component';
import { CourseGradingEntryListComponent } from './coursegradingentry/coursegradingentry-list/coursegradingentry-list.component';
import { NewCourseGradingEntryComponent } from './coursegradingentry/new-coursegradingentry/new-coursegradingentry.component';
import { WeekNameListComponent } from './weekname/weekname-list/weekname-list.component';
import { NewWeekNameComponent } from './weekname/new-weekname/new-weekname.component';
import {BudgetTypeListComponent} from './budgettype/budgettype-list/budgettype-list.component';
import {NewBudgetTypeComponent} from './budgettype/new-budgettype/new-budgettype.component';
import {BudgetCodeListComponent} from './budgetcode/budgetcode-list/budgetcode-list.component';
import {NewBudgetCodeComponent} from './budgetcode/new-budgetcode/new-budgetcode.component';
import {NewPaymentTypeComponent} from './paymenttype/new-paymenttype/new-paymenttype.component';
import {PaymentTypeListComponent} from './paymenttype/paymenttype-list/paymenttype-list.component';
import {ForeignCourseDocTypeListComponent} from './foreigncoursedoctype/foreigncoursedoctype-list/foreigncoursedoctype-list.component';
import {NewForeignCourseDocTypeComponent} from './foreigncoursedoctype/new-foreigncoursedoctype/new-foreigncoursedoctype.component';
import { SaylorSubBranchListComponent } from './saylorsubbranch/saylorsubbranch-list/saylorsubbranch-list.component';
import { NewSaylorSubBranchComponent } from './saylorsubbranch/new-saylorsubbranch/new-saylorsubbranch.component';
import { SaylorRankListComponent } from './saylorrank/saylorrank-list/saylorrank-list.component';
import { NewSaylorRankComponent } from './saylorrank/new-saylorrank/new-saylorrank.component';
import { SaylorBranchListComponent } from './saylorbranch/saylorbranch-list/saylorbranch-list.component';
import { NewSaylorBranchComponent } from './saylorbranch/new-saylorbranch/new-saylorbranch.component';
import { WithdrawnTypeListComponent } from './withdrawntype/withdrawntype-list/withdrawntype-list.component';
import { NewWithdrawnTypeComponent } from './withdrawntype/new-withdrawntype/new-withdrawntype.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  {
    path: 'foreigncoursedoctype-list', 
    component: ForeignCourseDocTypeListComponent,
  },
  { path: 'update-foreigncoursedoctype/:foreignCourseDocTypeId',  
  component: NewForeignCourseDocTypeComponent, 
  },
  {
    path: 'add-foreigncoursedoctype',
    component: NewForeignCourseDocTypeComponent,
  },

  {
    path: 'paymenttype-list',
    component: PaymentTypeListComponent,
  },
  {
    path: 'add-paymenttype', 
    component: NewPaymentTypeComponent,
  },
  { path: 'update-paymenttype/:paymentTypeId', 
  component: NewPaymentTypeComponent 
  },


  {
    path: 'budgetcode-list',
    component: BudgetCodeListComponent,
  },
  {
    path: 'add-budgetcode',
    component: NewBudgetCodeComponent,
  },
  { path: 'update-budgetcode/:budgetCodeId', 
  component: NewBudgetCodeComponent 
  },

  {
    path: 'budgettype-list',
    component: BudgetTypeListComponent,
  },
  {
    path: 'add-budgettype',
    component: NewBudgetTypeComponent,
  },
  { path: 'update-budgettype/:budgetTypeId', 
  component: NewBudgetTypeComponent 
  },
  {
    path: 'saylorbranch-list',
    component: SaylorBranchListComponent,
  },
  { path: 'update-saylorbranch/:saylorBranchId', 
  component: NewSaylorBranchComponent 
  },
  {
    path: 'add-saylorbranch',
    component: NewSaylorBranchComponent,
  },
  {
    path: 'saylorrank-list',
    component: SaylorRankListComponent,
  },
  { path: 'update-saylorrank/:saylorRankId', 
  component: NewSaylorRankComponent 
  },
  {
    path: 'add-saylorrank',
    component: NewSaylorRankComponent,
  },
  {
    path: 'saylorsubbranch-list',
    component: SaylorSubBranchListComponent,
  },
  { path: 'update-saylorsubbranch/:saylorSubBranchId', 
  component: NewSaylorSubBranchComponent 
  },
  {
    path: 'add-saylorsubbranch',
    component: NewSaylorSubBranchComponent,
  },

  {
    path: 'accounttype-list',
    component: AccountTypeListComponent,
  },
  { path: 'update-accounttype/:accountTypeId', 
  component: NewAccountTypeComponent 
  },
  {
    path: 'add-accounttype',
    component: NewAccountTypeComponent,
  },

  {
    path: 'game-list',
    component: GameListComponent,
  },
  { path: 'update-game/:gameId', 
  component: NewGameComponent 
  },
  {
    path: 'add-game',
    component: NewGameComponent,
  },

  {
    path: 'subjecttype-list',
    component: SubjecttypeListComponent,
  },
  { path: 'update-subjecttype/:subjectTypeId',  
  component: NewSubjectTypeComponent 
  },
  {
    path: 'add-subjecttype',
    component: NewSubjectTypeComponent,
  },

  {
    path: 'weekname-list',
    component: WeekNameListComponent,
  },
  { path: 'update-weekname/:weekNameId',  
  component: NewWeekNameComponent 
  },
  {
    path: 'add-weekname',
    component: NewWeekNameComponent,
  },

  {
    path: 'add-coursegradingentry',
    component: NewCourseGradingEntryComponent,
  },
  { path: 'update-coursegradingentry/:courseGradingEntryId',  
  component: NewCourseGradingEntryComponent 
  },
  {
    path: 'add-coursegradingentry',
    component: NewCourseGradingEntryComponent,
  },

  {
    path: 'subjectcategory-list',
    component: SubjectCategoryListComponent,
  },
  { path: 'update-subjectcategory/:subjectCategoryId',  
  component: NewSubjectCategoryComponent 
  },
  {
    path: 'add-subjectcategory',
    component: NewSubjectCategoryComponent,
  },

  {
    path: 'bnasubjectcurriculam-list',
    component: BNASubjectCurriculamListComponent,
  },
  { path: 'update-bnasubjectcurriculum/:bnaSubjectCurriculumId', 
  component: NewBnasubjectcurriculamComponent, 
  },
  {
    path: 'add-bnasubjectcurriculum',
    component: NewBnasubjectcurriculamComponent,
  },

  {
    path: 'coursetype-list',
    component: CoursetypeListComponent,
  },
  { path: 'update-coursetype/:courseTypeId', 
  component:  NewCoursetypeComponent,
  },
  {
    path: 'add-coursetype',
    component: NewCoursetypeComponent,
  },

  {
    path: 'showright-list',
    component: ShowRightListComponent,
  },
  { path: 'update-showright/:showRightId', 
  component:  NewShowRightComponent,
  },
  {
    path: 'add-showright',
    component: NewShowRightComponent,
  },

  {
    path: 'documenttype-list',
    component: DocumentTypeListComponent,
  },
  { path: 'update-documenttype/:documentTypeId', 
  component:  NewDocumentTypeComponent,
  },
  {
    path: 'add-documenttype',
    component: NewDocumentTypeComponent,
  },

  {
    path: 'weight-list',
    component: WeightListComponent,
  },
  { path: 'update-weight/:weightId', 
  component: NewWeightComponent 
  },
  {
    path: 'add-weight',
    component: NewWeightComponent,
  },

  {
    path: 'kindofsubject-list',
    component: KindOfSubjectListComponent,
  },
  { path: 'update-kindofsubject/:kindOfSubjectId',  
  component: NewKindOfSubjectComponent 
  },
  {
    path: 'add-kindofsubject',
    component: NewKindOfSubjectComponent,
  },

  {
    path: 'complexion-list',
    component: ComplexionListComponent,
  },
  { path: 'update-complexion/:complexionId', 
  component: NewComplexionComponent 
  },
  {
    path: 'add-complexion',
    component: NewComplexionComponent,
  },

  {
    path: 'membershiptype-list',
    component: MembershiptypeListComponent,
  },
  { path: 'update-membershiptype/:membershipTypeId', 
  component: NewMembershiptypeComponent 
  },
  {
    path: 'add-membershiptype',
    component: NewMembershiptypeComponent,
  },

  {
    path: 'codevalue-list',
    component: CodeValueListComponent,
  },
  { path: 'update-codevalue/:codeValueId', 
  component: NewCodeValueComponent 
  },
  {
    path: 'add-codevalue',
    component: NewCodeValueComponent,
  },

  {
    path: 'socialmediatype-list',
    component: SocialmediatypeListComponent,
  },
  { path: 'update-socialmediatype/:socialMediaTypeId', 
  component: NewSocialmediatypeComponent 
  },
  {
    path: 'add-socialmediatype',
    component: NewSocialmediatypeComponent,
  },


  {
    path: 'height-list',
    component: HeightListComponent,
  },
  { path: 'update-height/:heightId', 
  component: NewHeightComponent 
  },
  {
    path: 'add-height',
    component: NewHeightComponent,
  },
  
  {
    path: 'elected-list',
    component: ElectedListComponent,
  },
  { path: 'update-elected/:electedId', 
  component: NewElectedComponent 
  },
  {
    path: 'add-elected',
    component: NewElectedComponent,
  },

  {
    path: 'branch-list',
    component: BranchListComponent,
  },
  { path: 'update-branch/:branchId', 
  component: NewBranchComponent
  },
  {
    path: 'add-branch',
    component: NewBranchComponent,
  },

  {
    path: 'bnaattendanceperiod-list',
    component: BnaAttendancePeriodListComponent,
  },
  { path: 'update-bnaattendanceperiod/:bnaAttendancePeriodId', 
  component: NewBnaAttendancePeriodComponent
  },
  {
    path: 'add-bnaattendanceperiod',
    component: NewBnaAttendancePeriodComponent,
  },

  {
    path: 'bnaclasstesttype-list',
    component: BnaClassTestTypeListComponent,
  },
  { path: 'update-bnaclasstesttype/:bnaClassTestTypeId', 
  component: NewBnaClassTestTypeComponent
  },
  {
    path: 'add-bnaclasstesttype',
    component: NewBnaClassTestTypeComponent,
  },

  {
    path: 'haircolor-list',
    component: HairColorListComponent,
  },
  { path: 'update-haircolor/:hairColorId',  
  component: NewHairColorComponent
  },
  {
    path: 'add-haircolor',
    component: NewHairColorComponent,
  },

  {
    path: 'maritalstatus-list',
    component: MaritalstatusListComponent,
  },
  { path: 'update-maritalstatus/:maritalstatusId', 
  component: NewMaritalstatusComponent
  },
  {
    path: 'add-maritalstatus',
    component: NewMaritalstatusComponent,
  },

  {
    path: 'marktype-list',
    component: MarkTypeListComponent,
  },
  { path: 'update-marktype/:markTypeId', 
  component: NewMarkTypeComponent
  },
  {
    path: 'add-marktype',
    component: NewMarkTypeComponent,
  },

  {
    path: 'nationality-list',
    component: NationalityListComponent,
  },
  { path: 'update-nationality/:nationalityId', 
  component: NewNationalityComponent 
  },
  {
    path: 'add-nationality',
    component: NewNationalityComponent,
  },

  {  
    path: 'bnacurriculumtype-list',
    component: BNACurriculamTypeListComponent,
  },
  { path: 'update-bnacurriculumtype/:bnaCurriculumTypeId', 
  component: NewBNACurriculamTypeComponent 
  },
  {
    path: 'add-bnacurriculumtype',
    component: NewBNACurriculamTypeComponent,
  },

  {  
    path: 'bnasemester-list',
    component: BNASemesterListComponent,
  },
  { path: 'update-bnasemester/:bnaSemesterId', 
  component: NewBNASemesterComponent 
  },
  {
    path: 'add-bnasemester',
    component: NewBNASemesterComponent,
  },

  {  
    path: 'Rank-list',
    component: RankListComponent,
  },
  { path: 'update-Rank/:rankId', 
  component: NewRankComponent 
  },
  {
    path: 'add-Rank',
    component: NewRankComponent,
  },
  {  
    path: 'religion-list',
    component: ReligionListComponent,
  },
  { path: 'update-religion/:religionId', 
  component: NewReligionComponent 
  },
  {
    path: 'add-religion',
    component: NewReligionComponent,
  },

  {  
    path: 'colorOfEye-list',
    component: ColorOfEyeListComponent,
  },
  { path: 'update-colorOfEye/:colorOfEyeId', 
  component: NewColorOfEyeComponent 
  },
  {
    path: 'add-colorOfEye',
    component: NewColorOfEyeComponent,
  },

  {  
    path: 'defenseType-list',
    component: DefenseTypeListComponent,
  },
  { path: 'update-defenseType/:defenseTypeId', 
  component: NewDefenseTypeComponent 
  },
  {
    path: 'add-defenseType',
    component: NewDefenseTypeComponent,
  },
  
  {  
    path: 'occupation-list',
    component: OccupationListComponent,
  },
  { path: 'update-occupation/:occupationId', 
  component: NewOccupationComponent 
  },
  {
    path: 'add-occupation',
    component: NewOccupationComponent,
  },

  {  
    path: 'organizationname-list',
    component: OrganizationNameListComponent,
  },
  { path: 'update-organizationname/:organizationNameId', 
  component: NewOrganizationNameComponent 
  },
  {
    path: 'add-organizationname',
    component: NewOrganizationNameComponent,
  },

  {  
    path: 'examType-list',
    component: ExamTypeListComponent,
  },
  { path: 'update-examType/:examTypeId', 
  component: NewExamTypeComponent 
  },
  {
    path: 'add-examType',
    component: NewExamTypeComponent,
  },

  {  
    path: 'reasonType-list',
    component: ReasonTypeListComponent,
  },
  { path: 'update-reasonType/:reasonTypeId', 
  component: NewReasonTypeComponent 
  },
  {
    path: 'add-reasonType',
    component: NewReasonTypeComponent,
  },

  {  
    path: 'favoritesType-list',
    component: FavoritesTypeListComponent,
  },
  { path: 'update-favoritesType/:favoritesTypeId', 
  component: NewFavoritesTypeComponent 
  },
  {
    path: 'add-favoritesType',
    component: NewFavoritesTypeComponent,
  },

  {  
    path: 'questionType-list',
    component: QuestionTypeListComponent,
  },
  { path: 'update-questionType/:questionTypeId', 
  component: NewQuestionTypeComponent 
  },
  {
    path: 'add-questionType',
    component: NewQuestionTypeComponent,
  },

  {  
    path: 'bnabatch-list',
    component: BNABatchListComponent,
  },
  { path: 'update-bnabatch/:bnaBatchId', 
  component: NewBNABatchComponent 
  },
  {
    path: 'add-bnabatch',
    component: NewBNABatchComponent,
  },

  {  
    path: 'country-list',
    component: CountryListComponent,
  },
  { path: 'update-country/:countryId', 
  component: NewcountryComponent 
  },
  {
    path: 'add-country',
    component: NewcountryComponent,
  },

  {  
    path: 'exammarkremarks-list',
    component: ExamMarkRemarksListComponent,
  },
  { path: 'update-exammarkremarks/:examMarkRemarksId', 
  component: NewExamMarkRemarksComponent 
  },
  {
    path: 'add-exammarkremarks',
    component: NewExamMarkRemarksComponent,
  },

  {  
    path: 'examcenter-list',
    component: ExamCenterListComponent,
  },
  { path: 'update-examcenter/:examCenterId', 
  component: NewExamCenterComponent 
  },
  {
    path: 'add-examcenter',
    component: NewExamCenterComponent,
  },

  {  
    path: 'examattempttype-list',
    component: ExamAttemptTypeListComponent,
  },
  { path: 'update-examattempttype/:examAttemptTypeId', 
    component: NewExamAttemptTypeComponent 
  },
  {
    path: 'add-examattempttype',
    component: NewExamAttemptTypeComponent,
  },

  {
    path: 'gender-list',
    component: GenderListComponent,
  },
  { path: 'update-gender/:genderId', 
  component: NewGenderComponent, 
  },
  {
    path: 'add-gender',
    component: NewGenderComponent,
  },

  {
    path: 'traineecoursestatus-list',
    component: TraineeCourseStatusListComponent,
  },
  { path: 'update-traineecoursestatus/:traineeCourseStatusId', 
  component: NewTraineeCourseStatusComponent, 
  },
  {
    path: 'add-traineecoursestatus',
    component: NewTraineeCourseStatusComponent,
  },

  {
    path: 'withdrawndoc-list',
    component: WithdrawnDocListComponent,
  },
  { path: 'update-withdrawndoc/:withdrawnDocId', 
  component: NewWithdrawnDocComponent, 
  },
  {
    path: 'add-withdrawndoc',
    component: NewWithdrawnDocComponent,
  },

  {
    path: 'resultstatus-list',
    component: ResultStatusListComponent,
  },
  { path: 'update-resultstatus/:resultStatusId', 
  component: NewResultStatusComponent, 
  },
  {
    path: 'add-resultstatus',
    component: NewResultStatusComponent,
  },

  {
    path: 'downloadright-list',
    component: DownloadRightListComponent,
  },
  { path: 'update-downloadright/:downloadRightId', 
  component: NewDownloadRightComponent, 
  },
  {
    path: 'add-downloadright',
    component: NewDownloadRightComponent,
  },

  {
    path: 'bnaclassschedulestatus-list',
    component: BNAClassScheduleStatusListComponent,
  },
  { path: 'update-bnaclassschedulestatus/:bnaClassScheduleStatusId', 
  component: NewBNAClassScheduleStatusComponent, 
  },
  {
    path: 'add-bnaclassschedulestatus',
    component: NewBNAClassScheduleStatusComponent,
  },

  {
    path: 'examperiodtype-list',
    component: ExamPeriodTypeListComponent,
  },
  { path: 'update-examperiodtype/:examPeriodTypeId', 
  component: NewExamPeriodTypeComponent, 
  },
  {
    path: 'add-examperiodtype',
    component: NewExamPeriodTypeComponent,
  },

  {
    path: 'classtype-list',
    component: ClassTypeListComponent,
  },
  { path: 'update-classtype/:classTypeId', 
  component: NewClassTypeComponent, 
  },
  {
    path: 'add-classtype',
    component: NewClassTypeComponent,
  },
  {
    path: 'withdrawntype-list',
    component: WithdrawnTypeListComponent,
  },
  { path: 'update-withdrawntype/:withdrawnTypeId', 
  component: NewWithdrawnTypeComponent, 
  },
  {
    path: 'add-withdrawntype',
    component: NewWithdrawnTypeComponent,
  },

  {
    path: 'group-list',
    component: GroupListComponent,
  },
  { path: 'update-group/:groupId', 
  component: NewGroupComponent, 
  },
  {
    path: 'add-group',
    component: NewGroupComponent,
  },

  {
    path: 'language-list',
    component: LanguageListComponent,
  },
  { path: 'update-language/:languageId', 
  component: NewLanguageComponent, 
  },
  {
    path: 'add-language',
    component: NewLanguageComponent,
  },


  {
    path: 'utofficertype-list',
    component: UTOfficerTypeListComponent,
  },
  { path: 'update-utofficertype/:utofficerTypeId', 
  component: NewUTOfficerTypeComponent, 
  },
  {
    path: 'add-utofficertype',
    component: NewUTOfficerTypeComponent,
  },

  {
    path: 'utofficercategory-list',
    component: UTOfficerCategoryListComponent,
  },
  { path: 'update-utofficercategory/:utofficerCategoryId', 
  component: NewUTOfficerCategoryComponent, 
  },
  {
    path: 'add-utofficercategory',
    component: NewUTOfficerCategoryComponent,
  },

  {
    path: 'bnaservicetype-list',
    component: BNAServiceTypeListComponent,
  },
  { path: 'update-bnaservicetype/:BNAServiceTypeId', 
  component: NewBNAServiceTypeComponent, 
  },
  {
    path: 'add-bnaservicetype',
    component: NewBNAServiceTypeComponent,
  }, 


  {
    path: 'bnaclasssectionselection-list',
    component: BnaclasssectionselectionListComponent,
  },
  { path: 'update-bnaclasssectionselection/:bnaClassSectionSelectionId', 
  component: NewBnaclasssectionselectiontComponent, 
  },
  {
    path: 'add-bnaclasssectionselection', 
    component: NewBnaclasssectionselectiontComponent,
  },


  {
    path: 'bloodgroup-list',
    component: BloodGroupListComponent,
  },
  { path: 'update-bloodgroup/:bloodGroupId', 
  component: NewBloodGroupComponent, 
  },
  {
    path: 'add-bloodgroup',
    component: NewBloodGroupComponent,
  },

  {
    path: 'grandfathertype-list',
    component: GrandFatherTypeListComponent,
  },
  { path: 'update-grandfathertype/:grandfatherTypeId', 
  component: NewGrandFatherTypeComponent, 
  },
  {
    path: 'add-grandfathertype',
    component: NewGrandFatherTypeComponent,
  },

  {
    path: 'relationtype-list',
    component: RelationTypeListComponent,
  },
  { path: 'update-relationtype/:relationTypeId', 
  component: NewRelationTypeComponent, 
  },
  {
    path: 'add-relationtype',
    component: NewRelationTypeComponent,
  },

  {
    path: 'presentbillet-list',
    component: PresentBilletListComponent,
  },
  { path: 'update-presentbillet/:presentBilletId', 
  component: NewPresentBilletComponent, 
  },
  {
    path: 'add-presentbillet',
    component: NewPresentBilletComponent,
  },

  {
    path: 'bnainstructortype-list',
    component: BNAInstructorTypeListComponent,
  },
  { path: 'update-bnainstructortype/:bnaInstructorTypeId', 
  component: NewBNAInstructorTypeComponent, 
  },
  {
    path: 'add-bnainstructortype',
    component: NewBNAInstructorTypeComponent,
  },

  {
    path: 'coursename-list',
    component: CourseNameListComponent,
  },
  { path: 'update-coursename/:courseNameId', 
  component: NewCourseNameComponent, 
  },
  {
    path: 'add-coursename',
    component: NewCourseNameComponent,
  },

  {
    path: 'codevaluetype-list',
    component: CodeValueTypeListComponent,
  },
  { path: 'update-codevaluetype/:codeValueTypeId', 
  component: NewCodeValueTypeComponent, 
  },
  {
    path: 'add-codevaluetype',
    component: NewCodeValueTypeComponent,
  },

  {
    path: 'bnapromotionstatus-list',
    component: BNAPromotionStatusListComponent,
  },
  { path: 'update-bnapromotionstatus/:bnaPromotionStatusId', 
  component: NewBNAPromotionStatusComponent, 
  },
  {
    path: 'add-bnapromotionstatus',
    component: NewBNAPromotionStatusComponent,
  },

  {
    path: 'steprelation-list',
    component: StepRelationListComponent,
  },
  { path: 'update-steprelation/:stepRelationId', 
  component: NewStepRelationComponent, 
  },
  {
    path: 'add-steprelation',
    component: NewStepRelationComponent,
  },

  {
    path: 'cocurricularactivitytype-list',
    component: CoCurricularActivityTypeListComponent,
  },
  { path: 'update-cocurricularactivitytype/:coCurricularActivityTypeId', 
  component: NewCoCurricularActivityTypeComponent, 
  },
  {
    path: 'add-cocurricularactivitytype',
    component: NewCoCurricularActivityTypeComponent,
  },

  {
    path: 'board-list',
    component: BoardListComponent,
  },
  { path: 'update-board/:boardId', 
  component: NewBoardComponent, 
  },
  {
    path: 'add-board',
    component: NewBoardComponent,
  },

  {
    path: 'failurestatus-list',
    component: FailureStatusListComponent,
  },
  { path: 'update-failurestatus/:failureStatusId', 
  component: NewFailureStatusComponent, 
  },
  {
    path: 'add-failurestatus',
    component: NewFailureStatusComponent,
  },

  {
    path: 'division-list',
    component: DivisionListComponent,
  },
  { path: 'update-division/:divisionId', 
  component: NewDivisionComponent, 
  },
  {
    path: 'add-division',
    component: NewDivisionComponent,
  },



  {
    path: 'caste-list',
    component: CasteListComponent,
  },
  { path: 'update-caste/:casteId', 
  component: NewCasteComponent, 
  },
  {
    path: 'add-caste',
    component: NewCasteComponent,
  },

  {
    path: 'district-list',
    component: DistrictListComponent,
  },
  { path: 'update-district/:districtId', 
  component: NewDistrictComponent, 
  },
  {
    path: 'add-district',
    component: NewDistrictComponent,
  },

  {
    path: 'basename-list',
    component: BaseNameListComponent,
  },
  { path: 'update-basename/:baseNameId', 
  component: NewBaseNameComponent, 
  },
  {
    path: 'add-basename',
    component: NewBaseNameComponent,
  },

  {
    path: 'baseschoolname-list',
    component: BaseSchoolNameListComponent,
  },
  { path: 'update-baseschoolname/:baseSchoolNameId', 
  component: NewBaseSchoolNameComponent, 
  },
  {
    path: 'add-baseschoolname',
    component: NewBaseSchoolNameComponent,
  },

  {
    path: 'subjectclassification-list',
    component: SubjectClassificationListComponent,
  },
  { path: 'update-subjectclassification/:subjectClassificationId', 
  component: NewSubjectClassificationComponent, 
  },
  {
    path: 'add-subjectclassification',
    component: NewSubjectClassificationComponent,
  },

  {
    path: 'adminauthority-list',
    component: AdminAuthorityListComponent,
  },
  { path: 'update-adminauthority/:adminAuthorityId', 
  component: NewAdminAuthorityComponent, 
  },
  {
    path: 'add-adminauthority',
    component: NewAdminAuthorityComponent,
  },

  {
    path: 'forcetype-list',
    component: ForceTypeListComponent,
  },
  { path: 'update-forcetype/:forceTypeId', 
  component: NewForceTypeComponent, 
  },
  {
    path: 'add-forcetype',
    component: NewForceTypeComponent,
  },

  {
    path: 'thana-list',
    component: ThanaListComponent,
  },
  { path: 'update-thana/:thanaId', 
  component: NewThanaComponent, 
  },
  {
    path: 'add-thana',
    component: NewThanaComponent,
  },

  {
    path: 'bnaattendanceremarks-list',
    component: BNAAttendanceRemarksListComponent,
  },
  { path: 'update-bnaattendanceremarks/:bnaAttendanceRemarksId', 
  component: NewBNAAttendanceRemarksComponent, 
  },
  {
    path: 'add-bnaattendanceremarks',
    component: NewBNAAttendanceRemarksComponent,
  },

  {
    path: 'add-coursemodule',
    component: NewCourseModuleComponent,
  },
  { path: 'update-coursemodule/:courseModuleId', 
  component: NewCourseModuleComponent, 
  },
  {
    path: 'add-coursesection',
    component: NewCourseSectionComponent,
  },
  { path: 'update-coursesection/:courseSectionId', 
  component: NewCourseSectionComponent, 
  },
  
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class BasicSetupRoutingModule { }

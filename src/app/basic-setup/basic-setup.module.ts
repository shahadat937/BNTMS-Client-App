import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NationalityListComponent } from './nationality/nationality-list/nationality-list.component';
import { ExamMarkRemarksListComponent } from './exammarkremarks/exammarkremarks-list/exammarkremarks-list.component';
import { NewExamMarkRemarksComponent } from './exammarkremarks/new-exammarkremarks/new-exammarkremarks.component';
import { NewNationalityComponent} from './nationality/new-nationality/new-nationality.component'
import { GameListComponent } from './game/game-list/game-list.component';
import { NewGameComponent } from './game/new-game/new-game.component';
import { BasicSetupRoutingModule } from './basic-setup-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { BranchListComponent } from './branch/branch-list/branch-list.component';
import { NewBranchComponent } from './branch/new-branch/new-branch.component';
import { WeightListComponent } from './weight/weight-list/weight-list.component';
import {NewWeightComponent } from './weight/new-weight/new-weight.component';
import { NewComplexionComponent } from './complexion/new-complexion/new-complexion.component';
import { ComplexionListComponent } from './complexion/complexion-list/complexion-list.component';
import { GenderListComponent } from './gender/gender-list/gender-list.component';
import { NewGenderComponent } from './gender/new-gender/new-gender.component';
import { BNAServiceTypeListComponent } from './bnaservicetype/bnaservicetype-list/bnaservicetype-list.component';
import { NewBNAServiceTypeComponent } from './bnaservicetype/new-bnaervicetype/new-bnaservicetype.component';
import { UTOfficerTypeListComponent } from './utofficertype/utofficertype-list/utofficertype-list.component';
import { NewUTOfficerTypeComponent } from './utofficertype/new-utofficertype/new-utofficertype.component';
import { UTOfficerCategoryListComponent } from './utofficercategory/utofficercategory-list/utofficercategory-list.component';
import { NewUTOfficerCategoryComponent } from './utofficercategory/new-utofficercategory/new-utofficercategory.component';
import { BloodGroupListComponent } from './bloodgroup/bloodgroup-list/bloodgroup-list.component';
import { NewBloodGroupComponent } from './bloodgroup/new-bloodgroup/new-bloodgroup.component';
import { BNACurriculamTypeListComponent } from './bnacurriculamtype/bnacurriculamtype-list/bnacurriculamtype-list.component';
import { NewBNACurriculamTypeComponent} from './bnacurriculamtype/new-bnacurriculamtype/new-bnacurriculamtype.component';
import { HeightListComponent } from './height/height-list/height-list.component';
import { NewHeightComponent } from './height/new-height/new-height.component';
import { BnaAttendancePeriodListComponent } from './bnaattendanceperiod/bnaattendanceperiod-list/bnaattendanceperiod-list.component';
import { NewBnaAttendancePeriodComponent } from './bnaattendanceperiod/new-bnaattendanceperiod/new-bnaattendanceperiod.component';
import { BnaClassTestTypeListComponent } from './bnaclasstesttype/bnaclasstesttype-list/bnaclasstesttype-list.component';
import { NewBnaClassTestTypeComponent } from './bnaclasstesttype/new-bnaclasstesttype/new-bnaclasstesttype.component';
import { AccountTypeListComponent } from './accounttype/accounttype-list/accounttype-list.component';
import { NewAccountTypeComponent } from './accounttype/new-accounttype/new-accounttype.component';
//import { EditBNACurriculamTypeComponent } from './bNACurriculamType/edit-bNACurriculamType/edit-bNACurriculamType.component';
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
import {BNASemesterListComponent} from './bnasemester/bnasemester-list/bnasemester-list.component';
import {NewBNASemesterComponent} from './bnasemester/new-bnasemester/new-bnasemester.component'
import {RankListComponent} from './Rank/Rank-list/Rank-list.component';
import {NewRankComponent} from './Rank/new-Rank/new-Rank.component';
import {ReligionListComponent} from './religion/religion-list/religion-list.component';
import {NewReligionComponent} from './religion/new-religion/new-religion.component';
import {ColorOfEyeListComponent} from './colorOfEye/colorOfEye-list/colorOfEye-list.component';
import {NewColorOfEyeComponent} from './colorOfEye/new-colorOfEye/new-colorOfEye.component';
import {DefenseTypeListComponent} from './defenseType/defenseType-list/defenseType-list.component';
import {NewDefenseTypeComponent} from './defenseType/new-defenseType/new-defenseType.component';
import {OccupationListComponent} from './occupation/occupation-list/occupation-list.component';
import {NewOccupationComponent} from './occupation/new-occupation/new-occupation.component';
import {ExamTypeListComponent} from './examType/examType-list/examType-list.component';
import {NewExamTypeComponent} from './examType/new-examType/new-examType.component';
import {ReasonTypeListComponent} from './reasonType/reasonType-list/reasonType-list.component';
import {NewReasonTypeComponent} from './reasonType/new-reasonType/new-reasonType.component';
import {FavoritesTypeListComponent} from './favoritesType/favoritesType-list/favoritesType-list.component';
import {NewFavoritesTypeComponent} from './favoritesType/new-favoritesType/new-favoritesType.component';
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
import { NewDivisionComponent} from './division/new-division/new-division.component';
import { MembershiptypeListComponent } from './membershiptype/membershiptype-list/membershiptype-list.component';
import { NewMembershiptypeComponent } from './membershiptype/new-membershiptype/new-membershiptype.component';
import { NewElectedComponent } from './elected/new-elected/new-elected.component';
import { ElectedListComponent } from './elected/elected-list/elected-list.component';
import { SocialmediatypeListComponent } from './socialmediatype/socialmediatype-list/socialmediatype-list.component';
import { NewSocialmediatypeComponent } from './socialmediatype/new-socialmediatype/new-socialmediatype.component';
import { BnaclasssectionselectionListComponent } from './bnaclasssectionselection/bnaclasssectionselection-list/bnaclasssectionselection-list.component';
import { NewBnaclasssectionselectiontComponent } from './bnaclasssectionselection/new-bnaclasssectionselectiont/new-bnaclasssectionselectiont.component';
import { LanguageListComponent } from './language/language-list/language-list.component';
import { NewLanguageComponent } from './language/new-language/new-language.component';
import { CodeValueListComponent } from './codevalue/codevalue-list/codevalue-list.component';
import { NewCodeValueComponent } from './codevalue/new-codevalue/new-codevalue.component';
import { CasteListComponent } from './caste/caste-list/caste-list.component';
import { NewCasteComponent } from './caste/new-caste/new-caste.component';
import { DistrictListComponent } from './district/district-list/district-list.component';
import { NewDistrictComponent } from './district/new-district/new-district.component';
import { AdminAuthorityListComponent } from './adminauthority/adminauthority-list/adminauthority-list.component';
import { NewAdminAuthorityComponent } from './adminauthority/new-adminauthority/new-adminauthority.component';
import { SubjectClassificationListComponent } from './subjectclassification/subjectclassification-list/subjectclassification-list.component';
import { NewSubjectClassificationComponent } from './subjectclassification/new-subjectclassification/new-subjectclassification.component';
import { BaseNameListComponent } from './basename/basename-list/basename-list.component';
import { NewBaseNameComponent } from './basename/new-basename/new-basename.component';
import { ForceTypeListComponent } from './forcetype/forcetype-list/forcetype-list.component';
import { NewForceTypeComponent } from './forcetype/new-forcetype/new-forcetype.component';
import { BaseSchoolNameListComponent } from './baseschoolname/baseschoolname-list/baseschoolname-list.component';
import { NewBaseSchoolNameComponent } from './baseschoolname/new-baseschoolname/new-baseschoolname.component';
import { ThanaListComponent } from './thana/thana-list/thana-list.component';
import { NewThanaComponent } from './thana/new-thana/new-thana.component';
import {QuestionTypeListComponent}from './questionType/questionType-list/questionType-list.component';
import {NewQuestionTypeComponent}from './questionType/new-questionType/new-questionType.component';
import {BNABatchListComponent}from './bnabatch/bnabatch-list/bnabatch-list.component';
import {NewBNABatchComponent}from './bnabatch/new-bnabatch/new-bnabatch.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {CountryListComponent} from './country/country-list/country-list.component';
import {NewcountryComponent} from './country/new-country/new-country.component';
import { WithdrawnDocListComponent } from './withdrawndoc/withdrawndoc-list/withdrawndoc-list.component';
import { NewWithdrawnDocComponent } from './withdrawndoc/new-withdrawndoc/new-withdrawndoc.component';
import { ShowRightListComponent } from './showright/showright-list/showright-list.component';
import { NewShowRightComponent } from './showright/new-showright/new-showright.component';
import { DocumentTypeListComponent } from './documenttype/documenttype-list/documenttype-list.component';
import { NewDocumentTypeComponent } from './documenttype/new-documenttype/new-documenttype.component';
import { ResultStatusListComponent } from './resultstatus/resultstatus-list/resultstatus-list.component';
import { NewResultStatusComponent } from './resultstatus/new-resultstatus/new-resultstatus.component';
import { BNAClassScheduleStatusListComponent } from './bnaclassschedulestatus/bnaclassschedulestatus-list/bnaclassschedulestatus-list.component';
import { NewBNAClassScheduleStatusComponent } from './bnaclassschedulestatus/new-bnaclassschedulestatus/new-bnaclassschedulestatus.component';
import { ExamPeriodTypeListComponent } from './examperiodtype/examperiodtype-list/examperiodtype-list.component';
import { NewExamPeriodTypeComponent } from './examperiodtype/new-examperiodtype/new-examperiodtype.component';
import { ClassTypeListComponent } from './classtype/classtype-list/classtype-list.component';
import { NewClassTypeComponent } from './classtype/new-classtype/new-classtype.component';
import { DownloadRightListComponent } from './downloadright/downloadright-list/downloadright-list.component';
import { NewDownloadRightComponent } from './downloadright/new-downloadright/new-downloadright.component';
import { TraineeCourseStatusListComponent } from './traineecoursestatus/traineecoursestatus-list/traineecoursestatus-list.component';
import { NewTraineeCourseStatusComponent } from './traineecoursestatus/new-traineecoursestatus/new-traineecoursestatus.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {CoursetypeListComponent} from './courseType/coursetype-list/coursetype-list.component';
import { NewCoursetypeComponent } from './courseType/new-coursetype/new-coursetype.component';
import { NewBnasubjectcurriculamComponent } from './bnasubjectcurriculam/new-bnasubjectcurriculam/new-bnasubjectcurriculam.component';
import {BNASubjectCurriculamListComponent} from './bnasubjectcurriculam/bnasubjectcurriculam-list/bnasubjectcurriculam-list.component';
import { SubjecttypeListComponent } from './subjecttype/subjecttype-list/subjecttype-list.component';
import { NewSubjectTypeComponent } from './subjecttype/new-subjecttype/new-subjecttype.component';
import {SubjectCategoryListComponent} from './subjectcategory/subjectcategory-list/subjectcategory-list.component';
import { NewSubjectCategoryComponent } from './subjectcategory/new-subjectcategory/new-subjectcategory.component';
import {KindOfSubjectListComponent} from './kindofsubject/kindofsubject-list/kindofsubject-list.component';
import { NewKindOfSubjectComponent } from './kindofsubject/new-kindofsubject/new-kindofsubject.component';
import { BNAAttendanceRemarksListComponent } from './bnaattendanceremarks/bnaattendanceremarks-list/bnaattendanceremarks-list.component';
import { NewBNAAttendanceRemarksComponent } from './bnaattendanceremarks/new-bnaattendanceremarks/new-bnaattendanceremarks.component';
import { CourseModuleListComponent } from './coursemodule/coursemodule-list/coursemodule-list.component';
import { NewCourseModuleComponent } from './coursemodule/new-coursemodule/new-coursemodule.component';
import { CourseSectionListComponent } from './coursesection/coursesection-list/coursesection-list.component';
import { NewCourseSectionComponent } from './coursesection/new-coursesection/new-coursesection.component';
import { HairColorListComponent } from './haircolor/haircolor-list/haircolor-list.component';
import { NewHairColorComponent } from './haircolor/new-haircolor/new-haircolor.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { BudgetTypeListComponent } from './budgettype/budgettype-list/budgettype-list.component';
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


@NgModule({
  declarations: [
    NewWithdrawnTypeComponent,
    WithdrawnTypeListComponent,
    AccountTypeListComponent,
    NewPaymentTypeComponent,
    PaymentTypeListComponent,
    NewBudgetTypeComponent,
    BudgetCodeListComponent,
    NewBudgetCodeComponent,
    BudgetTypeListComponent,
    NewAccountTypeComponent,
    GameListComponent,
    GenderListComponent,
    NewGameComponent,
    BranchListComponent,
    NewBranchComponent,
    WeightListComponent,
    NewWeightComponent,
    NewGenderComponent,
    BNAServiceTypeListComponent,
    NewBNAServiceTypeComponent,
    UTOfficerTypeListComponent,
    NewUTOfficerTypeComponent,
    UTOfficerCategoryListComponent,
    NewUTOfficerCategoryComponent,
    BloodGroupListComponent,
    NewBloodGroupComponent,
    HeightListComponent,
    NewHeightComponent,
    TraineeCourseStatusListComponent,
    NewTraineeCourseStatusComponent,
    WithdrawnDocListComponent,
    NewWithdrawnDocComponent,
    ShowRightListComponent,
    NewShowRightComponent,
    DocumentTypeListComponent,
    NewDocumentTypeComponent,
    ResultStatusListComponent,
    NewResultStatusComponent,
    BNAClassScheduleStatusListComponent,
    NewBNAClassScheduleStatusComponent,
    ExamPeriodTypeListComponent,
    NewExamPeriodTypeComponent,
    ClassTypeListComponent,
    NewClassTypeComponent,
    DownloadRightListComponent,
    NewDownloadRightComponent,
    BNACurriculamTypeListComponent,
    NewBNACurriculamTypeComponent,
    NewComplexionComponent,
    ComplexionListComponent,
    GrandFatherTypeListComponent,
    NewGrandFatherTypeComponent,
    RelationTypeListComponent,
    NewRelationTypeComponent,
    PresentBilletListComponent,
    NewPresentBilletComponent,
    BNAInstructorTypeListComponent,
    NewBNAInstructorTypeComponent,
    MaritalstatusListComponent,
    NewMaritalstatusComponent,
    MarkTypeListComponent,
    NewMarkTypeComponent,
    GroupListComponent,
    NewGroupComponent,
    NewNationalityComponent,
    NationalityListComponent,
    BNASemesterListComponent,
    NewBNASemesterComponent,
    BnaAttendancePeriodListComponent,
    NewBnaAttendancePeriodComponent,
    BnaClassTestTypeListComponent,
    NewBnaClassTestTypeComponent,
    RankListComponent,
    NewRankComponent,
    NewReligionComponent,
    ReligionListComponent,
    ColorOfEyeListComponent,
    NewColorOfEyeComponent,
    DefenseTypeListComponent,
    NewDefenseTypeComponent,
    OccupationListComponent,
    NewOccupationComponent,
    ExamTypeListComponent,
    NewExamTypeComponent,
    ReasonTypeListComponent,
    NewReasonTypeComponent,
    FavoritesTypeListComponent,
    NewFavoritesTypeComponent,
    CourseNameListComponent,
    NewCourseNameComponent,
    CodeValueTypeListComponent,
    NewCodeValueTypeComponent,
    BNAPromotionStatusListComponent,
    NewBNAPromotionStatusComponent,
    StepRelationListComponent,
    NewStepRelationComponent,
    CoCurricularActivityTypeListComponent,
    NewCoCurricularActivityTypeComponent,
    BoardListComponent,
    NewBoardComponent,
    FailureStatusListComponent,
    NewFailureStatusComponent,
    DivisionListComponent,
    NewDivisionComponent,
    MembershiptypeListComponent,
    NewMembershiptypeComponent,
    NewElectedComponent,
    ElectedListComponent,
    SocialmediatypeListComponent,
    NewSocialmediatypeComponent,
    BnaclasssectionselectionListComponent,
    NewBnaclasssectionselectiontComponent,
    LanguageListComponent,
    NewLanguageComponent,
    CodeValueListComponent,
    NewCodeValueComponent,
    CasteListComponent,
    NewCasteComponent,
    DistrictListComponent,
    NewDistrictComponent,
    SubjectClassificationListComponent,
    NewSubjectClassificationComponent,
    AdminAuthorityListComponent,
    NewAdminAuthorityComponent,
    BaseNameListComponent,
    NewBaseNameComponent,
    ForceTypeListComponent,
    NewForceTypeComponent,
    BaseSchoolNameListComponent,
    NewBaseSchoolNameComponent,
    ThanaListComponent,
    NewThanaComponent,
    QuestionTypeListComponent,
    NewQuestionTypeComponent,
    BNABatchListComponent,
    NewBNABatchComponent,
    CountryListComponent,
    NewcountryComponent,
    CoursetypeListComponent,
    NewCoursetypeComponent,
    NewBnasubjectcurriculamComponent,
    BNASubjectCurriculamListComponent,
    SubjecttypeListComponent,
    NewSubjectTypeComponent,
    SubjectCategoryListComponent,
    NewSubjectCategoryComponent,
    KindOfSubjectListComponent,
    NewKindOfSubjectComponent,
    BNAAttendanceRemarksListComponent,
    NewBNAAttendanceRemarksComponent,
    CourseModuleListComponent,
    NewCourseModuleComponent,
    CourseSectionListComponent,
    NewCourseSectionComponent,
    ExamMarkRemarksListComponent,
    NewExamMarkRemarksComponent,
    HairColorListComponent,
    NewHairColorComponent,
    ExamCenterListComponent,
    NewExamCenterComponent,
    ExamAttemptTypeListComponent,
    NewExamAttemptTypeComponent,
    OrganizationNameListComponent,
    NewOrganizationNameComponent,
    CourseGradingEntryListComponent,
    NewCourseGradingEntryComponent,
    WeekNameListComponent,
    NewWeekNameComponent,
    ForeignCourseDocTypeListComponent,
    NewForeignCourseDocTypeComponent,
    SaylorSubBranchListComponent,
    NewSaylorSubBranchComponent,
    SaylorRankListComponent,
    NewSaylorRankComponent,
    SaylorBranchListComponent,
    NewSaylorBranchComponent,


  ],
  imports: [
    CommonModule,
    BasicSetupRoutingModule,
    CommonModule,
    FormsModule,  
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
   MatAutocompleteModule
    
  ]
})
export class BasicSetupModule { }

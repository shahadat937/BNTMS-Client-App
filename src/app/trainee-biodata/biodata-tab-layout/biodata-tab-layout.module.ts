import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TabsRoutingModule } from './biodata-tab-layout-routing.module';
import { MainTabLayoutComponent } from './main-tab-layout/main-tab-layout.component';
import { UpdateTraineeBIODataGeneralInfoComponent } from './trainee-biodata/update-traineebiodatageneralinfo/update-traineebiodatageneralinfo.component';
import { ElectionListComponent } from './election/election-list/election-list.component';
import { NewElectionComponent } from './election/new-election/new-election.component';
import { ViewElectionComponent } from './election/view-election/view-election.component';
import { BasicSetupRoutingModule } from '../../basic-setup/basic-setup-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EducationalQualificationListComponent } from './educational-qualification/educational-qualification-list/educational-qualification-list.component';
import { NewEducationalQualificationComponent } from './educational-qualification/new-educational-qualification/new-educational-qualification.component';
import { ViewEducationalQualificationComponent } from './educational-qualification/view-educational-qualification/view-educational-qualification.component';
import { CoCurricularActivityListComponent } from './co-curricular-activity/co-curricular-activity-list/co-curricular-activity-list.component';
import { NewCoCurricularActivityComponent } from './co-curricular-activity/new-co-curricular-activity/new-co-curricular-activity.component';
import { ViewCoCurricularActivityComponent } from './co-curricular-activity/view-co-curricular-activity/view-co-curricular-activity.component';
import { TraineeMembershipListComponent } from './trainee-membership/trainee-membership-list/trainee-membership-list.component';
import { NewTraineeMembershipComponent } from './trainee-membership/new-trainee-membership/new-trainee-membership.component';
import { ViewTraineeMembershipComponent } from './trainee-membership/view-trainee-membership/view-trainee-membership.component';
import { TraineeVisitedAboardListComponent } from './trainee-visited-abroad/trainee-visited-abroad-list/trainee-visited-abroad-list.component';
import { NewTraineeVisitedAboardComponent } from './trainee-visited-abroad/new-trainee-visited-abroad/new-trainee-visited-abroad.component';
import { ViewTraineeVisitedAboardComponent } from './trainee-visited-abroad/view-trainee-visited-abroad/view-trainee-visited-abroad.component';
import { NewBIODataGeneralInfoComponent } from './biodata-general-info/new-biodata-general-info/new-biodata-general-info.component';
import { BIODataGeneralInfoListComponent } from './biodata-general-info/biodata-general-info-list/biodata-general-info-list.component';
import { GameSportListComponent } from './game-sport/game-sport-list/game-sport-list.component';
import { NewGameSportComponent } from './game-sport/new-game-sport/new-game-sport.component';
import { ViewGameSportComponent } from './game-sport/view-game-sport/view-game-sport.component';
import { GrandFatherListComponent } from './grandfather/grandfather-list/grandfather-list.component';
import { NewGrandFatherComponent } from './grandfather/new-grandfather/new-grandfather.component';
import { ViewGrandFatherComponent } from './grandfather/view-grandfather/view-grandfather.component';
import { EducationalInstitutionListComponent } from './educational-institution/educational-institution-list/educational-institution-list.component';
import { NewEducationalInstitutionComponent } from './educational-institution/new-educational-institution/new-educational-institution.component';
import { ViewEducationalInstitutionComponent } from './educational-institution/view-educational-institution/view-educational-institution.component';
import { ParentRelativeListComponent } from './family-info/family-info-list/family-info-list.component';
import { NewParentRelativeComponent } from './family-info/new-family-info/new-family-info.component';
import { ViewParentRelativeComponent } from './family-info/view-family-info/view-family-info.component';
import { SwimmingDivingListComponent} from './swimming-diving/swimming-diving-list/swimming-diving-list.component';
import { NewSwimmingDivingComponent } from './swimming-diving/new-swimming-diving/new-swimming-diving.component';
import { ViewSwimmingDivingComponent }from './swimming-diving/view-swimming-diving/view-swimming-diving.component';
import { ViewJoiningReasonComponent } from './joining-reason/view-joining-reason/view-joining-reason.component';
import { NewJoiningReasonComponent } from './joining-reason/new-joining-reason/new-joining-reason.component';
import { TraineeLanguageListComponent } from './trainee-language/trainee-language-list/trainee-language-list.component';
import { NewTraineeLanguageComponent } from './trainee-language/new-trainee-language/new-trainee-language.component';
import { ViewTraineeLanguageComponent } from './trainee-language/view-trainee-language/view-trainee-language.component';
import { NewSocialMediaComponent } from './social-media/new-social-media/new-social-media.component';
import { SocialMediaListComponent } from './social-media/social-media-list/social-media-list.component';
import { ViewSocialMediaComponent } from './social-media/view-social-media/view-social-media.component';
import { NewFavoritesComponent } from './favorites/new-favorites/new-favorites.component';
import { FavoritesListComponent } from './favorites/favorites-list/favorites-list.component';
import { ViewFavoritesComponent } from './favorites/view-favorites/view-favorites.component';
import { QuestionListComponent } from './question/question-list/question-list.component';
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { ViewQuestionComponent } from './question/view-question/view-question.component';
import { JoiningReasonListComponent } from './joining-reason/joining-reason-list/joining-reason-list.component';
import { EmploymentBeforeJoinBNAListComponent } from './employment-before-join-bna/employment-before-join-bna-list/employment-before-join-bna-list.component';
import { NewEmploymentBeforeJoinBNAComponent } from './employment-before-join-bna/new-employment-before-join-bna/new-employment-before-join-bna.component';
import { ViewEmploymentBeforeJoinBNAComponent } from './employment-before-join-bna/view-employment-before-join-bna/view-employment-before-join-bna.component';
import { TraineeBIODataOtherListComponent } from './trainee-biodata-other/trainee-biodata-other-list/trainee-biodata-other-list.component';
import { NewTraineeBIODataOtherComponent } from './trainee-biodata-other/new-trainee-biodata-other/new-trainee-biodata-other.component';
import { ViewTraineeBIODataOtherComponent} from './trainee-biodata-other/view-trainee-biodata-other/view-trainee-biodata-other.component';
import { RecordOfServiceListComponent } from './record-of-service/record-of-service-list/record-of-service-list.component';
import { NewRecordOfServiceComponent } from './record-of-service/new-record-of-service/new-record-of-service.component';
import {NewMilitaryTrainingComponent} from './military-training/new-military-training/new-military-training.component';
import {MilitaryTrainingListComponent} from './military-training/military-training-list/military-training-list.component'
import {NewCovidVaccineComponent} from './covid-vaccine/new-covid-vaccine/new-covid-vaccine.component';
import {CovidVaccineListComponent} from './covid-vaccine/covid-vaccine-list/covid-vaccine-list.component';


@NgModule({
  declarations: [
    MainTabLayoutComponent,
    ElectionListComponent, 
    NewElectionComponent,
    ViewElectionComponent,
    UpdateTraineeBIODataGeneralInfoComponent,
    EducationalQualificationListComponent,
    NewEducationalQualificationComponent,
    ViewEducationalQualificationComponent,
    CoCurricularActivityListComponent,
    NewCoCurricularActivityComponent,
    ViewCoCurricularActivityComponent,
    TraineeMembershipListComponent,
    NewTraineeMembershipComponent,
    ViewTraineeMembershipComponent,
    TraineeVisitedAboardListComponent,
    NewTraineeVisitedAboardComponent,
    ViewTraineeVisitedAboardComponent,
    GameSportListComponent,
    NewGameSportComponent,
    ViewGameSportComponent,
    GrandFatherListComponent,
    NewGrandFatherComponent,
    ViewGrandFatherComponent,
    EducationalInstitutionListComponent,
    NewEducationalInstitutionComponent,
    ViewEducationalInstitutionComponent,
    BIODataGeneralInfoListComponent,
    NewBIODataGeneralInfoComponent,
    ParentRelativeListComponent,
    NewParentRelativeComponent,
    ViewParentRelativeComponent,
    SwimmingDivingListComponent,
    NewSwimmingDivingComponent,
    ViewSwimmingDivingComponent,
    ViewJoiningReasonComponent,
    NewJoiningReasonComponent,
    TraineeLanguageListComponent,
    NewTraineeLanguageComponent,
    ViewTraineeLanguageComponent,
    NewSocialMediaComponent,
    SocialMediaListComponent,
    ViewSocialMediaComponent,
    RecordOfServiceListComponent,
    NewRecordOfServiceComponent,
    NewFavoritesComponent,
    FavoritesListComponent,
    ViewFavoritesComponent,
    QuestionListComponent,
    NewQuestionComponent,
    ViewQuestionComponent,
    JoiningReasonListComponent,
    EmploymentBeforeJoinBNAListComponent,
    NewEmploymentBeforeJoinBNAComponent,
    ViewEmploymentBeforeJoinBNAComponent,
    TraineeBIODataOtherListComponent,
    NewTraineeBIODataOtherComponent,
    ViewTraineeBIODataOtherComponent,
    NewMilitaryTrainingComponent,
    MilitaryTrainingListComponent,
    NewCovidVaccineComponent,
    CovidVaccineListComponent
  ],
  imports: [
    CommonModule,
    TabsRoutingModule,
    MatTabsModule,
    MatToolbarModule,
    BasicSetupRoutingModule,
    FormsModule,  
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatCheckboxModule,
  ]
})
export class TabModule { }

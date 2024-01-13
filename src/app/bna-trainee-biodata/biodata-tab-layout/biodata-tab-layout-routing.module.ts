import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTabLayoutComponent } from './main-tab-layout/main-tab-layout.component';
import { ElectionListComponent } from './election/election-list/election-list.component';
import { ViewElectionComponent } from './election/view-election/view-election.component';
import { NewElectionComponent } from './election/new-election/new-election.component';
import { UpdateTraineeBIODataGeneralInfoComponent } from './trainee-biodata/update-traineebiodatageneralinfo/update-traineebiodatageneralinfo.component';
import { EducationalQualificationListComponent } from './educational-qualification/educational-qualification-list/educational-qualification-list.component';
import { NewEducationalQualificationComponent } from './educational-qualification/new-educational-qualification/new-educational-qualification.component';
import { ViewEducationalQualificationComponent } from './educational-qualification/view-educational-qualification/view-educational-qualification.component';
import { GameSportListComponent } from './game-sport/game-sport-list/game-sport-list.component';
import { NewGameSportComponent } from './game-sport/new-game-sport/new-game-sport.component';
import { ViewGameSportComponent } from './game-sport/view-game-sport/view-game-sport.component';
import { GrandFatherListComponent } from './grandfather/grandfather-list/grandfather-list.component';
import { NewGrandFatherComponent } from './grandfather/new-grandfather/new-grandfather.component';
import { ViewGrandFatherComponent } from './grandfather/view-grandfather/view-grandfather.component';

import { CoCurricularActivityListComponent } from './co-curricular-activity/co-curricular-activity-list/co-curricular-activity-list.component';
import { NewCoCurricularActivityComponent } from './co-curricular-activity/new-co-curricular-activity/new-co-curricular-activity.component';
import { ViewCoCurricularActivityComponent } from './co-curricular-activity/view-co-curricular-activity/view-co-curricular-activity.component';

import { TraineeMembershipListComponent } from './trainee-membership/trainee-membership-list/trainee-membership-list.component';
import { NewTraineeMembershipComponent } from './trainee-membership/new-trainee-membership/new-trainee-membership.component';
import { ViewTraineeMembershipComponent } from './trainee-membership/view-trainee-membership/view-trainee-membership.component';

import { TraineeVisitedAboardListComponent } from './trainee-visited-abroad/trainee-visited-abroad-list/trainee-visited-abroad-list.component';
import { NewTraineeVisitedAboardComponent } from './trainee-visited-abroad/new-trainee-visited-abroad/new-trainee-visited-abroad.component';
import { ViewTraineeVisitedAboardComponent } from './trainee-visited-abroad/view-trainee-visited-abroad/view-trainee-visited-abroad.component';

import { EducationalInstitutionListComponent } from './educational-institution/educational-institution-list/educational-institution-list.component';
import { NewEducationalInstitutionComponent } from './educational-institution/new-educational-institution/new-educational-institution.component';
import { ViewEducationalInstitutionComponent } from './educational-institution/view-educational-institution/view-educational-institution.component';
import { ParentRelativeListComponent } from './family-info/family-info-list/family-info-list.component';
import { NewParentRelativeComponent } from './family-info/new-family-info/new-family-info.component';
import { ViewParentRelativeComponent } from './family-info/view-family-info/view-family-info.component';
import { SwimmingDivingListComponent } from './swimming-diving/swimming-diving-list/swimming-diving-list.component';
import { NewSwimmingDivingComponent } from './swimming-diving/new-swimming-diving/new-swimming-diving.component';
import { ViewSwimmingDivingComponent } from './swimming-diving/view-swimming-diving/view-swimming-diving.component';
import { ViewJoiningReasonComponent } from './joining-reason/view-joining-reason/view-joining-reason.component';
import { NewJoiningReasonComponent } from './joining-reason/new-joining-reason/new-joining-reason.component';
import { TraineeLanguageListComponent } from './trainee-language/trainee-language-list/trainee-language-list.component';
import { NewTraineeLanguageComponent } from './trainee-language/new-trainee-language/new-trainee-language.component';
import { ViewTraineeLanguageComponent } from './trainee-language/view-trainee-language/view-trainee-language.component';
import { SocialmediatypeListComponent } from '../../basic-setup/socialmediatype/socialmediatype-list/socialmediatype-list.component';
import { NewSocialMediaComponent } from './social-media/new-social-media/new-social-media.component';
import { ViewSocialMediaComponent } from './social-media/view-social-media/view-social-media.component';
import { SocialMediaListComponent } from './social-media/social-media-list/social-media-list.component';
import { FavoritesListComponent } from './favorites/favorites-list/favorites-list.component';
import { NewFavoritesComponent } from './favorites/new-favorites/new-favorites.component';
import { ViewFavoritesComponent } from './favorites/view-favorites/view-favorites.component';
import { BIODataGeneralInfoListComponent } from './biodata-general-info/biodata-general-info-list/biodata-general-info-list.component';
import { NewBIODataGeneralInfoComponent } from './biodata-general-info/new-biodata-general-info/new-biodata-general-info.component';

import { QuestionListComponent } from './question/question-list/question-list.component';
import { NewQuestionComponent } from './question/new-question/new-question.component';
import { ViewQuestionComponent } from './question/view-question/view-question.component';

import { JoiningReasonListComponent } from './joining-reason/joining-reason-list/joining-reason-list.component';

import { EmploymentBeforeJoinBNAListComponent } from './employment-before-join-bna/employment-before-join-bna-list/employment-before-join-bna-list.component';
import { NewEmploymentBeforeJoinBNAComponent } from './employment-before-join-bna/new-employment-before-join-bna/new-employment-before-join-bna.component';
import { ViewEmploymentBeforeJoinBNAComponent } from './employment-before-join-bna/view-employment-before-join-bna/view-employment-before-join-bna.component';
import { TraineeBIODataOtherListComponent } from './trainee-biodata-other/trainee-biodata-other-list/trainee-biodata-other-list.component';
import { NewTraineeBIODataOtherComponent } from './trainee-biodata-other/new-trainee-biodata-other/new-trainee-biodata-other.component';
import { ViewTraineeBIODataOtherComponent } from './trainee-biodata-other/view-trainee-biodata-other/view-trainee-biodata-other.component';


const routes: Routes = [
   { path: 'main-tab-layout/:traineeId', 
   component: MainTabLayoutComponent, 
   },
  //  {
  //    path: '', 
  //    redirectTo: '/tab-weight', 
  //    pathMatch: 'full'
  //  },
  // { path: 'tab-weight', 
  // component: WeightComponent, 
  // },
  // { path: '/tab-height', 
  // component: HeightComponent, 
  // },
  // {
  //   path: 'Report',
  //   component: AppAdminLayoutComponent,
  //   children: [
  //     { path: 'Member', component: MemberDetailsReportComponent, canActivate: [AdminAuthGuardService]  },
  //     { path: 'Yearwise', component: YearwiseReportComponent , canActivate: [AdminAuthGuardService] },
  //     { path: 'Monthwise', component: MonthwiseReportComponent, canActivate: [AdminAuthGuardService]  },
  //     { path: 'Renewal', component: RenewalReportComponent, canActivate: [AdminAuthGuardService]  }
      
  //   ]
  // },
   {
    path: 'main-tab-layout/main-tab',
    component: MainTabLayoutComponent,
    children: [
      { path: '',redirectTo: 'main-tab-layout',pathMatch: 'full'},
      
      { 
        path: 'election-details/:traineeId', 
        component: ElectionListComponent
      },
      { 
        path: 'add-election-details/:traineeId', 
        component: NewElectionComponent
      },
      { 
        path: 'update-election-details/:traineeId/:electionId', 
        component: NewElectionComponent
      },
      { 
        path: 'view-election-details/:traineeId/:electionId', 
        component: ViewElectionComponent
      },
      { 
        path: 'family-info-details/:traineeId', 
        component: ParentRelativeListComponent
      },
      { 
        path: 'add-family-info-details/:traineeId', 
        component: NewParentRelativeComponent
      },
      { 
        path: 'update-family-info-details/:traineeId/:parentRelativeId', 
        component: NewParentRelativeComponent
      },
      { 
        path: 'view-family-info-details/:traineeId/:parentRelativeId', 
        component: ViewParentRelativeComponent
      },
      { 
        path: 'co-curricular-activity-details/:traineeId', 
        component: CoCurricularActivityListComponent
      },
      { 
        path: 'add-co-curricular-activity-details/:traineeId', 
        component: NewCoCurricularActivityComponent
      },
      { 
        path: 'update-co-curricular-activity-details/:traineeId/:coCurricularActivityId', 
        component: NewCoCurricularActivityComponent
      },
      { 
        path: 'view-co-curricular-activity-details/:traineeId/:coCurricularActivityId', 
        component: ViewCoCurricularActivityComponent
      },
      { 
        path: 'trainee-membership-details/:traineeId', 
        component: TraineeMembershipListComponent
      },
      { 
        path: 'add-trainee-membership-details/:traineeId', 
        component: NewTraineeMembershipComponent
      },
      { 
        path: 'update-trainee-membership-details/:traineeId/:traineeMembershipId', 
        component: NewTraineeMembershipComponent
      },
      { 
        path: 'view-trainee-membership-details/:traineeId/:traineeMembershipId', 
        component: ViewTraineeMembershipComponent
      },

      { 
        path: 'trainee-visited-aboard-details/:traineeId', 
        component: TraineeVisitedAboardListComponent
      },
      { 
        path: 'add-trainee-visited-aboard-details/:traineeId', 
        component: NewTraineeVisitedAboardComponent
      },
      { 
        path: 'update-trainee-visited-aboard-details/:traineeId/:traineeVisitedAboardId', 
        component: NewTraineeVisitedAboardComponent
      },
      { 
        path: 'view-trainee-visited-aboard-details/:traineeId/:traineeVisitedAboardId', 
        component: ViewTraineeVisitedAboardComponent
      },
      { 
        path: 'educational-qualification-details/:traineeId', 
        component: EducationalQualificationListComponent
      },
      { 
        path: 'add-educational-qualification-details/:traineeId', 
        component: NewEducationalQualificationComponent
      },
      { 
        path: 'update-educational-qualification-details/:traineeId/:educationalQualificationId', 
        component: NewEducationalQualificationComponent
      },
      { 
        path: 'view-educational-qualification-details/:traineeId/:educationalQualificationId', 
        component: ViewEducationalQualificationComponent
      },
      { 
        path: 'game-sport-details/:traineeId', 
        component: GameSportListComponent
      },
      { 
        path: 'add-game-sport-details/:traineeId', 
        component: NewGameSportComponent
      },
      { 
        path: 'update-game-sport-details/:traineeId/:gameSportId', 
        component: NewGameSportComponent
      },
      { 
        path: 'view-game-sport-details/:traineeId/:gameSportId', 
        component: ViewGameSportComponent
      },

      { 
        path: 'grandfather-details/:traineeId', 
        component: GrandFatherListComponent
      },
      { 
        path: 'add-grandfather-details/:traineeId', 
        component: NewGrandFatherComponent
      },
      { 
        path: 'update-grandfather-details/:traineeId/:grandFatherId', 
        component: NewGrandFatherComponent
      },
      { 
        path: 'view-grandfather-details/:traineeId/:grandFatherId', 
        component: ViewGrandFatherComponent
      },
  
      { 
        path: 'educational-institution-details/:traineeId', 
        component: EducationalInstitutionListComponent
      },
      { 
        path: 'add-educational-institution-details/:traineeId', 
        component: NewEducationalInstitutionComponent
      },
      { 
        path: 'update-educational-institution-details/:traineeId/:educationalInstitutionId', 
        component: NewEducationalInstitutionComponent
      },
      { 
        path: 'view-educational-institution-details/:traineeId/:educationalInstitutionId', 
        component: ViewEducationalInstitutionComponent
      },

      { 
        path: 'swimming-diving-details/:traineeId', 
        component: SwimmingDivingListComponent
      },
      { 
        path: 'add-swimming-diving-details/:traineeId', 
        component: NewSwimmingDivingComponent
      },
      { 
        path: 'update-swimming-diving-details/:swimmingDivingId', 
        component: NewSwimmingDivingComponent
      },
      { 
        path: 'view-swimming-diving-details/:swimmingDivingId', 
        component: ViewSwimmingDivingComponent
      },
      
      { 
        path: 'update-traineebiodatageneralinfo/:traineeId', 
        component: UpdateTraineeBIODataGeneralInfoComponent 
      },


      { 
        path: 'joining-reason-details/:traineeId', 
        component: JoiningReasonListComponent
      },
      { 
        path: 'add-joining-reason-details/:traineeId', 
        component: NewJoiningReasonComponent
      },
      { 
        path: 'update-joining-reason-details/:traineeId/:joiningReasonId', 
        component: NewJoiningReasonComponent
      },
      { 
        path: 'view-joining-reason/:traineeId/:joiningReasonId',  
        component: ViewJoiningReasonComponent
      },



      { 
        path: 'question-details/:traineeId', 
        component: QuestionListComponent
      },
      { 
        path: 'add-question-details/:traineeId', 
        component: NewQuestionComponent
      },
      { 
        path: 'update-question-details/:traineeId/:questionId', 
        component: NewQuestionComponent
      },
      { 
        path: 'view-question-details/:traineeId/:questionId', 
        component: ViewQuestionComponent
      },


      { 
        path: 'employment-before-join-bna-details/:traineeId', 
        component: EmploymentBeforeJoinBNAListComponent
      },
      { 
        path: 'add-employment-before-join-bna-details/:traineeId', 
        component: NewEmploymentBeforeJoinBNAComponent
      },
      { 
        path: 'update-employment-before-join-bna-details/:traineeId/:employmentBeforeJoinBnaId', 
        component: NewEmploymentBeforeJoinBNAComponent
      },
      { 
        path: 'view-employment-before-join-bna-details/:traineeId/:employmentBeforeJoinBnaId', 
        component: ViewEmploymentBeforeJoinBNAComponent
      },

      { 
        path: 'view-joining-reason/:traineeId',  
        component: ViewJoiningReasonComponent
      },

      { 
        path: 'trainee-language-details/:traineeId',  
        component: TraineeLanguageListComponent
      },
      { 
        path: 'add-trainee-language-details/:traineeId', 
        component: NewTraineeLanguageComponent
      },
      { 
        path: 'update-trainee-language-details/:traineeId/:traineeLanguageId', 
        component: NewTraineeLanguageComponent
      },
      { 
        path: 'view-trainee-language-details/:traineeId/:traineeLanguageId', 
        component: ViewTraineeLanguageComponent
      },

 
      { 
        path: 'social-media-details/:traineeId',  
        component: SocialMediaListComponent
      },
      { 
        path: 'add-social-media-details/:traineeId', 
        component: NewSocialMediaComponent
      },
      { 
        path: 'update-social-media-details/:traineeId/:socialMediaId', 
        component: NewSocialMediaComponent
      },
      { 
        path: 'view-social-media-details/:traineeId/:socialMediaId', 
        component: ViewSocialMediaComponent
      },


      { 
        path: 'favorites-details/:traineeId',  
        component: FavoritesListComponent
      },
      { 
        path: 'add-favorites-details/:traineeId', 
        component: NewFavoritesComponent
      },
      { 
        path: 'update-favorites-details/:traineeId/:favoritesId', 
        component: NewFavoritesComponent
      },
      { 
        path: 'view-favorites-details/:traineeId/:favoritesId', 
        component: ViewFavoritesComponent
      },

      { 
        path: 'trainee-biodata-other-details/:traineeId', 
        component: TraineeBIODataOtherListComponent
      },
      { 
        path: 'add-trainee-biodata-other-details/:traineeId', 
        component: NewTraineeBIODataOtherComponent
      },
      { 
        path: 'update-trainee-biodata-other-details/:traineeId/:traineeBioDataOtherId', 
        component: NewTraineeBIODataOtherComponent
      },
      { 
        path: 'view-trainee-biodata-other-details/:traineeId/:traineeBioDataOtherId', 
        component: ViewTraineeBIODataOtherComponent
      },

    ]
  },
  {
    path: 'biodata-general-Info-list',
    component: BIODataGeneralInfoListComponent,
  },
  {
    path: 'add-biodata-general-Info',
    component: NewBIODataGeneralInfoComponent,
  },
  { path: 'update-biodata-general-Info/:traineeId', 
  component: NewBIODataGeneralInfoComponent 
  },
  
 
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }

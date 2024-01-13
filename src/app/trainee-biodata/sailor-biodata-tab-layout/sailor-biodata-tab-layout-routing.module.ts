import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTabLayoutComponent } from './main-tab-layout/main-tab-layout.component';
import { UpdateTraineeBIODataGeneralInfoComponent } from './trainee-biodata/update-traineebiodatageneralinfo/update-traineebiodatageneralinfo.component';
import { EducationalQualificationListComponent } from './educational-qualification/educational-qualification-list/educational-qualification-list.component';
import { NewEducationalQualificationComponent } from './educational-qualification/new-educational-qualification/new-educational-qualification.component';
import { ViewEducationalQualificationComponent } from './educational-qualification/view-educational-qualification/view-educational-qualification.component';
import { GameSportListComponent } from './game-sport/game-sport-list/game-sport-list.component';
import { NewGameSportComponent } from './game-sport/new-game-sport/new-game-sport.component';
import { ViewGameSportComponent } from './game-sport/view-game-sport/view-game-sport.component';

import { ParentRelativeListComponent } from './family-info/family-info-list/family-info-list.component';
import { NewParentRelativeComponent } from './family-info/new-family-info/new-family-info.component';
import { ViewParentRelativeComponent } from './family-info/view-family-info/view-family-info.component';

import { NewSocialMediaComponent } from './social-media/new-social-media/new-social-media.component';
import { ViewSocialMediaComponent } from './social-media/view-social-media/view-social-media.component';
import { SocialMediaListComponent } from './social-media/social-media-list/social-media-list.component';

import { BIODataGeneralInfoListComponent } from './biodata-general-info/biodata-general-info-list/biodata-general-info-list.component';
import { NewBIODataGeneralInfoComponent } from './biodata-general-info/new-biodata-general-info/new-biodata-general-info.component';



const routes: Routes = [
   { path: 'main-tab-layout/:traineeId', 
   component: MainTabLayoutComponent, 
   },
  
   {
    path: 'main-tab-layout/main-tab',
    component: MainTabLayoutComponent,
    children: [
      { path: '',redirectTo: 'main-tab-layout',pathMatch: 'full'},
      
      
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
        path: 'update-traineebiodatageneralinfo/:traineeId', 
        component: UpdateTraineeBIODataGeneralInfoComponent 
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
export class SailorTabsRoutingModule { }

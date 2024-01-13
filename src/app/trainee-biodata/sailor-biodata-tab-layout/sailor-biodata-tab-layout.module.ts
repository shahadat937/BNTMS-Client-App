import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SailorTabsRoutingModule } from './sailor-biodata-tab-layout-routing.module';
import { MainTabLayoutComponent } from './main-tab-layout/main-tab-layout.component';
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

import { NewBIODataGeneralInfoComponent } from './biodata-general-info/new-biodata-general-info/new-biodata-general-info.component';
import { BIODataGeneralInfoListComponent } from './biodata-general-info/biodata-general-info-list/biodata-general-info-list.component';
import { UpdateTraineeBIODataGeneralInfoComponent } from './trainee-biodata/update-traineebiodatageneralinfo/update-traineebiodatageneralinfo.component';

import { GameSportListComponent } from './game-sport/game-sport-list/game-sport-list.component';
import { NewGameSportComponent } from './game-sport/new-game-sport/new-game-sport.component';
import { ViewGameSportComponent } from './game-sport/view-game-sport/view-game-sport.component';

import { ParentRelativeListComponent } from './family-info/family-info-list/family-info-list.component';
import { NewParentRelativeComponent } from './family-info/new-family-info/new-family-info.component';
import { ViewParentRelativeComponent } from './family-info/view-family-info/view-family-info.component';

import { NewSocialMediaComponent } from './social-media/new-social-media/new-social-media.component';
import { SocialMediaListComponent } from './social-media/social-media-list/social-media-list.component';
import { ViewSocialMediaComponent } from './social-media/view-social-media/view-social-media.component';

@NgModule({
  declarations: [
    MainTabLayoutComponent,
    UpdateTraineeBIODataGeneralInfoComponent,
    EducationalQualificationListComponent,
    NewEducationalQualificationComponent,
    ViewEducationalQualificationComponent,
    GameSportListComponent,
    NewGameSportComponent,
    ViewGameSportComponent,
    BIODataGeneralInfoListComponent,
    NewBIODataGeneralInfoComponent,
    ParentRelativeListComponent,
    NewParentRelativeComponent,
    ViewParentRelativeComponent,
    NewSocialMediaComponent,
    SocialMediaListComponent,
    ViewSocialMediaComponent,
  ],
  imports: [
    CommonModule,
    SailorTabsRoutingModule,
    MatTabsModule,
    MatToolbarModule,
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
    MatCheckboxModule
  ]
})
export class SailorTabModule { }

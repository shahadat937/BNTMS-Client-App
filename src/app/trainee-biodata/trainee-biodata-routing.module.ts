import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForeignBIODataInfoListComponent } from './foreignbiodatainfo/foreignbiodatainfo-list/foreignbiodatainfo-list.component';
import { NewForeignBIODataInfoComponent } from './foreignbiodatainfo/new-foreignbiodatainfo/new-foreignbiodatainfo.component';
import { NewNewEntryEvaluationComponent } from './newentryevaluation/new-newentryevaluation/new-newentryevaluation.component';
import { NewEntryEvaluationListComponent } from './newentryevaluation/newentryevaluation-list/newentryevaluation-list.component';
import {TraineeListComponent} from './trainee-profile-update/trainee-list/trainee-list.component';
import {NewBIODataGeneralInfosComponent} from './trainee-profile-update/new-biodata-general-info/new-biodata-general-infos.component'
import {CivilInstructorBioDataInfoListComponent} from './civil-instructor-biodata/civilinstructorbiodata-list/civilinstructorbiodata-list.component';
import {NewCivilInstructorBioDataInfoComponent} from './civil-instructor-biodata/new-civilinstructorbiodata/new-civilinstructorbiodata.component';
import {NewBiodataGeneralInfoJstiComponent} from './trainee-profile-update/new-biodata-general-info-jsti/new-biodata-general-info-jsti.component'
import { NewBIODataGeneralInfoComponent } from './sailor-biodata-tab-layout/biodata-general-info/new-biodata-general-info/new-biodata-general-info.component';

const routes: Routes = [
  {
    path: 'sailor-biodata-tab',
    loadChildren: () =>
      import('./sailor-biodata-tab-layout/sailor-biodata-tab-layout.module').then(
        (m) => m.SailorTabModule
      ),
  },
  {
    path: 'trainee-biodata-tab',
    loadChildren: () =>
      import('./biodata-tab-layout/biodata-tab-layout.module').then(
        (m) => m.TabModule
      ),
  },
  
  {
    path: 'traineeprofile-update-list',
    component: TraineeListComponent,
  },
  {
    path: 'update-traineebiodata/:traineeId',
    component: NewBIODataGeneralInfoComponent,
  },
  {
    path: 'update-traineebiodatajsti/:traineeId',
    component: NewBiodataGeneralInfoJstiComponent,
  },


  {
    path: 'newentryevaluation-list',
    component: NewEntryEvaluationListComponent,
  },
  { path: 'update-newentryevaluation/:newEntryEvaluationId', 
  component: NewNewEntryEvaluationComponent 
  },
  {
    path: 'add-newentryevaluation',
    component: NewNewEntryEvaluationComponent,
  },

  {
    path: 'foreignbiodatainfo-list',
    component: ForeignBIODataInfoListComponent,
  },
  { path: 'update-foreignbiodatainfo/:traineeId', 
  component: NewForeignBIODataInfoComponent 
  },
  
  {
    path: 'add-civilinstructorbiodata',
    component: NewCivilInstructorBioDataInfoComponent,
  },
  {
    path: 'civilinstructorbiodata-list',
    component: CivilInstructorBioDataInfoListComponent,
  },
  { path: 'update-civilinstructorbiodata/:traineeId', 
  component: NewCivilInstructorBioDataInfoComponent 
  },

  {
    path: 'add-foreignbiodatainfo',
    component: NewForeignBIODataInfoComponent,
  },

];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeBiodataRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraineeAssessmentMarkListComponent } from './traineeassessmentmark/traineeassessmentmark-list/traineeassessmentmark-list.component';
import { NewTraineeAssessmentMarkComponent } from './traineeassessmentmark/new-traineeassessmentmark/new-traineeassessmentmark.component';

import { TraineeAssessmentCreateListComponent } from './traineeassessmentcreate/traineeassessmentcreate-list/traineeassessmentcreate-list.component';
import { NewTraineeAssessmentCreateComponent } from './traineeassessmentcreate/new-traineeassessmentcreate/new-traineeassessmentcreate.component';
import { NewAssessmentGroupComponent } from './new-assessmentgroup/new-assessmentgroup.component';
import { TraineeAssessmentTraineeListComponent } from './traineeassessmentcreate/traineeassessmenttrainee-list/traineeassessmenttrainee-list.component';
import { TraineeAssessmentMarkByTraineeListComponent } from './traineeassessmentcreate/traineeassessmentmarkbytrainee-list/traineeassessmentmarkbytrainee-list.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  

  {
    path: 'traineeassessmentcreate-list',
    component: TraineeAssessmentCreateListComponent,
  },
  { path: 'update-traineeassessmentcreate/:traineeAssessmentCreateId', 
  component: NewTraineeAssessmentCreateComponent 
  },
  {
    path: 'add-traineeassessmentcreate',
    component: NewTraineeAssessmentCreateComponent,
  },
  {
    path: 'add-traineeassessmentgroup',
    component: NewAssessmentGroupComponent,
  },

  {
    path: 'traineeassessmentmark-list',
    component: TraineeAssessmentMarkListComponent,
  },
  { path: 'update-traineeassessmentmark/:traineeAssessmentMarkId', 
  component: NewTraineeAssessmentMarkComponent 
  },
  { path: 'traineeassessmenttrainee-list/:courseDurationId/:traineeAssessmentCreateId', 
  component: TraineeAssessmentTraineeListComponent 
  },
  { path: 'traineeassessmentmarkbytrainee-list/:courseDurationId/:traineeAssessmentCreateId/:assessmentTraineeId', 
  component: TraineeAssessmentMarkByTraineeListComponent 
  },
  {
    path: 'add-traineeassessmentmark',
    component: NewTraineeAssessmentMarkComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeAssessmentRoutingModule { }

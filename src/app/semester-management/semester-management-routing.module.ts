import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Page404Component } from '../authentication/page404/page404.component';

import { BnasemesterdurationListComponent } from './semesterduration/bnasemesterduration-list/bnasemesterduration-list.component';
import { NewBnasemesterdurationComponent } from './semesterduration/new-bnasemesterduration/new-bnasemesterduration.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { NewcoursesubjectsectionasignComponent } from './traineenomination/new-coursesubjectsectionasign/new-coursesubjectsectionasign.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'bnasemesterduration-list',
    component: BnasemesterdurationListComponent,
  },
  { path: 'update-bnasemesterduration/:bnaSemesterDurationId', 
  component: NewBnasemesterdurationComponent 
  },

  {
    path: 'add-bnasemesterduration',
    component: NewBnasemesterdurationComponent,
  },
  {
    path: 'traineenomination-list/:bnaSemesterDurationId', 
    component: TraineeNominationListComponent,
  },
  { path: 'update-traineenomination/:traineeNominationId',  
  component: NewTraineeNominationComponent, 
  },
  { path: 'add-traineenomination/:bnaSemesterDurationId',   
  component: NewTraineeNominationComponent, 
  },
  
  {
    path: 'add-bnacoursesubjectsectionasign/:traineeNominationId',
    component: NewcoursesubjectsectionasignComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SemesterManagementRoutingModule { }


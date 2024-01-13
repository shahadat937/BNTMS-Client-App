import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BnaCurriculumUpdateListComponent } from './bnacurriculumupdate/bnacurriculumupdate-list/bnacurriculumupdate-list.component';
import { NewBnaCurriculumUpdateComponent } from './bnacurriculumupdate/new-bnacurriculumupdate/new-bnacurriculumupdate.component';
import { TraineeSectionSelectionListComponent } from './traineesectionselection/traineesectionselection-list/traineesectionselection-list.component';
import { NewTraineeSectionSelectionComponent } from  './traineesectionselection/new-traineesectionselection/new-traineesectionselection.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'bnacurriculumupdate-list',
    component: BnaCurriculumUpdateListComponent,
  },
  { 
    path: 'update-bnacurriculumupdate/:bnaCurriculumUpdateId', 
    component: NewBnaCurriculumUpdateComponent 
  },
  {
    path: 'add-bnacurriculumupdate',
    component: NewBnaCurriculumUpdateComponent,
  },
  {
    path: 'traineesectionselection-list',
    component: TraineeSectionSelectionListComponent,
  },
  { 
    path: 'update-traineesectionselection/:traineeSectionSelectionId', 
    component: NewTraineeSectionSelectionComponent 
  },
  {
    path: 'add-traineesectionselection',
    component: NewTraineeSectionSelectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraineeManagementRoutingModule { }

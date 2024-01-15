import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NetsListComponent } from './nets/nets-list/nets-list.component';
import { NewNETSComponent } from './nets/new-nets/new-nets.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';






const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  

  {
    path: 'nets-list', 
    component: NetsListComponent,
  },
  { path: 'update-nets/:courseDurationId',  
  component: NewNETSComponent, 
  },
  {
    path: 'add-nets/:courseTypeId',
    component: NewNETSComponent,
  },
  {
    path: 'traineenomination-list/:courseDurationId', 
    component: TraineeNominationListComponent,
  },
  { path: 'update-traineenomination/:traineeNominationId',  
  component: NewTraineeNominationComponent, 
  },
  { path: 'add-traineenomination/:courseDurationId',   
  component: NewTraineeNominationComponent, 
  },

  // {
  //   path: 'bnaclasstest-list', 
  //   component: BnaClassTestListComponent,
  // },
  // { path: 'update-bnaclasstest/:bnaClassTestId',  
  // component: NewBnaClassTestComponent, 
  // },
  // {
  //   path: 'add-bnaclasstest',
  //   component: NewBnaClassTestComponent,
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NETSCourseRoutingModule { }

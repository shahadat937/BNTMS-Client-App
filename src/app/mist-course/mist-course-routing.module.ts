import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MistListComponent } from './mist/mist-list/mist-list.component';
import { NewMistComponent } from './mist/new-mist/new-mist.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';






const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  

  {
    path: 'mist-list', 
    component: MistListComponent,
  },
  { path: 'update-mist/:courseDurationId',  
  component: NewMistComponent, 
  },
  {
    path: 'add-mist/:courseTypeId',
    component: NewMistComponent,
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
export class MISTCourseRoutingModule { }

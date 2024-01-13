import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewGuestSpeakerActionStatusComponent } from './guestspeakeractionstatus/new-guestspeakeractionstatus/new-guestspeakeractionstatus.component';
import { NewGuestSpeakerQuationGroupComponent } from './guestspeakerquationgroup/new-guestspeakerquationgroup/new-guestspeakerquationgroup.component';
import { NewGuestSpeakerQuestionNameComponent } from './guestspeakerquestionname/new-guestspeakerquestionname/new-guestspeakerquestionname.component';
import { GuestSpeakerQuationGroupListComponent } from './guestspeakerquationgroup/guestspeakerquationgroup-list/guestspeakerquationgroup-list.component';
// import { NewTdecActionStatusComponent } from './tdecactionstatus/new-tdecactionstatus/new-tdecactionstatus.component';
// import { TdecActionStatusListComponent } from './tdecactionstatus/tdecactionstatus-list/tdecactionstatus-list.component';
// import { NewTdecQuationGroupComponent } from './tdecquationgroup/new-tdecquationgroup/new-tdecquationgroup.component';
// import { TdecQuationGroupListComponent } from './tdecquationgroup/tdecquationgroup-list/tdecquationgroup-list.component';
// import { NewTdecQuestionNameComponent } from './tdecquestionname/new-tdecquestionname/new-tdecquestionname.component';
// import { TdecQuestionNameListComponent } from './tdecquestionname/tdecquestionname-list/tdecquestionname-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  { path: 'update-guestspeakeractionstatus/:guestSpeakerActionStatusId',  
  component: NewGuestSpeakerActionStatusComponent 
  },
  {
    path: 'add-guestspeakeractionstatus',
    component: NewGuestSpeakerActionStatusComponent,
  },

  { path: 'update-guestspeakerquestionname/:guestSpeakerQuestionNameId',  
  component: NewGuestSpeakerQuestionNameComponent 
  },
  {
    path: 'add-guestspeakerquestionname',
    component: NewGuestSpeakerQuestionNameComponent,
  },


  // {
  //   path: 'tdecactionstatus-list', 
  //   component: TdecActionStatusListComponent,
  // },
  // { path: 'update-tdecactionstatus/:tdecActionStatusId',  
  // component: NewTdecActionStatusComponent, 
  // },
  // {
  //   path: 'add-tdecactionstatus',
  //   component: NewTdecActionStatusComponent,
  // },
  // {
  //   path: 'tdecquestionname-list',
  //   component: TdecQuestionNameListComponent,
  // },
 

  // {
  //   path: 'tdecquationgroup-list',
  //   component: TdecQuationGroupListComponent,
  // },
  // { path: 'update-tdecquationgroup/:tdecQuationGroupId',  
  // component: NewTdecQuationGroupComponent 
  // },
  {
    path: 'add-guestspeakerquationgroup',
    component: NewGuestSpeakerQuationGroupComponent,
  },
  {
    path: 'guestspeakerquationgroup-list',
    component: GuestSpeakerQuationGroupListComponent,
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestSpeakerRoutingModule { }

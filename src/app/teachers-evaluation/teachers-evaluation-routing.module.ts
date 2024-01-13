import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewTdecActionStatusComponent } from './tdecactionstatus/new-tdecactionstatus/new-tdecactionstatus.component';
import { TdecActionStatusListComponent } from './tdecactionstatus/tdecactionstatus-list/tdecactionstatus-list.component';
import { NewTdecQuationGroupComponent } from './tdecquationgroup/new-tdecquationgroup/new-tdecquationgroup.component';
import { TdecQuationGroupListComponent } from './tdecquationgroup/tdecquationgroup-list/tdecquationgroup-list.component';
import { NewTdecQuestionNameComponent } from './tdecquestionname/new-tdecquestionname/new-tdecquestionname.component';
import { TdecQuestionNameListComponent } from './tdecquestionname/tdecquestionname-list/tdecquestionname-list.component';
// import { MistListComponent } from './mist/mist-list/mist-list.component';
// import { NewMistComponent } from './mist/new-mist/new-mist.component';






const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  

  {
    path: 'tdecactionstatus-list', 
    component: TdecActionStatusListComponent,
  },
  { path: 'update-tdecactionstatus/:tdecActionStatusId',  
  component: NewTdecActionStatusComponent, 
  },
  {
    path: 'add-tdecactionstatus',
    component: NewTdecActionStatusComponent,
  },
  {
    path: 'tdecquestionname-list',
    component: TdecQuestionNameListComponent,
  },
  { path: 'update-tdecquestionname/:tdecQuestionNameId',  
  component: NewTdecQuestionNameComponent 
  },
  {
    path: 'add-tdecquestionname',
    component: NewTdecQuestionNameComponent,
  },


  {
    path: 'tdecquationgroup-list',
    component: TdecQuationGroupListComponent,
  },
  { path: 'update-tdecquationgroup/:tdecQuationGroupId',  
  component: NewTdecQuationGroupComponent 
  },
  {
    path: 'add-tdecquationgroup',
    component: NewTdecQuationGroupComponent,
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersEvaluationRoutingModule { }

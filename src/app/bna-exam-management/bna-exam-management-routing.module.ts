import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BNAExamMarkListComponent } from './bnaexammark/bnaexammark-list/bnaexammark-list.component';
import { NewBNAExamMarkComponent } from './bnaexammark/new-bnaexammark/new-bnaexammark.component';

import { BnaClassTestListComponent } from './bnaclasstest/bnaclasstest-list/bnaclasstest-list.component';
import { NewBnaClassTestComponent } from './bnaclasstest/new-bnaclasstest/new-bnaclasstest.component';

import { BNAExamInstructorAssignListComponent } from './bnaexaminstructorassign/bnaexaminstructorassign-list/bnaexaminstructorassign-list.component';
import { NewBNAExamInstructorAssignComponent } from './bnaexaminstructorassign/new-bnaexaminstructorassign/new-bnaexaminstructorassign.component';
import { BNAExamMarkApproveComponent } from './bnaexammark/bnaexammark-approve/bnaexammark-approve.component';
import {NewBnaExammarkinstructor} from './bnaexammark/new-bnaexammarkinstructor/new-bnaexammarkinstructor.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  

  {
    path: 'bnaexammark-list', 
    component: BNAExamMarkListComponent,
  },
  { path: 'update-bnaexammark/:bnaExamMarkId',  
  component: NewBNAExamMarkComponent, 
  },


  {
    path: 'add-bnaexammark',
    component: NewBNAExamMarkComponent,
  },

  {
    path: 'add-bnaexammarkinstructor/:traineeId',
    component: NewBnaExammarkinstructor,
  },

  {
    path: 'approve-bnaexammark',
    component: BNAExamMarkApproveComponent,
  },

  {
    path: 'bnaexaminstructorassign-list',
    component: BNAExamInstructorAssignListComponent,
  },
  { path: 'update-bnaexaminstructorassign/:bnaExamInstructorAssignId', 
  component: NewBNAExamInstructorAssignComponent 
  },
  {
    path: 'add-bnaexaminstructorassign',
    component: NewBNAExamInstructorAssignComponent,
  },

  {
    path: 'bnaclasstest-list', 
    component: BnaClassTestListComponent,
  },
  { path: 'update-bnaclasstest/:bnaClassTestId',  
  component: NewBnaClassTestComponent, 
  },
  {
    path: 'add-bnaclasstest',
    component: NewBnaClassTestComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BNAExamManagementRoutingModule { }

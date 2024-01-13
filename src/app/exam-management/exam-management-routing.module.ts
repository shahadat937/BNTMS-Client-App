import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BNAExamMarkListComponent } from './bnaexammark/bnaexammark-list/bnaexammark-list.component';
import { NewBNAExamMarkComponent } from './bnaexammark/new-bnaexammark/new-bnaexammark.component';
import { BnaClassTestListComponent } from './bnaclasstest/bnaclasstest-list/bnaclasstest-list.component';
import { NewBnaClassTestComponent } from './bnaclasstest/new-bnaclasstest/new-bnaclasstest.component';
import { BNAExamInstructorAssignListComponent } from './bnaexaminstructorassign/bnaexaminstructorassign-list/bnaexaminstructorassign-list.component';
import { NewBNAExamInstructorAssignComponent } from './bnaexaminstructorassign/new-bnaexaminstructorassign/new-bnaexaminstructorassign.component';
import { BNAExamMarkApproveComponent } from './bnaexammark/bnaexammark-approve/bnaexammark-approve.component';
import { NewBnaExammarkinstructor } from './bnaexammark/new-bnaexammarkinstructor/new-bnaexammarkinstructor.component'
import { ExamApproveComponent } from './bnaexammark/examapprove-list/examapprove-list.component';
import {NewReExamMarkComponent} from './bnaexammark/new-reexammark/new-reexammark.component';
import { NewReExamComponent } from './bnaexammark/new-reexam/new-reexam.component';
import {NewAssignmentMarkComponent} from './bnaexammark/new-assignmentmark/new-assignmentmark.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  {
    path: 'add-reexammark',
    component: NewReExamMarkComponent,
  },

  {
    path: 'add-reexam',
    component: NewReExamComponent,
  },

  { 
    path: 'approve-localexammark/:baseSchoolNameId/:courseDurationId/:courseNameId/:courseModuleId/:classRoutineId/:bnaSubjectNameId/:subjectMarkId/:markTypeId/:courseSectionId', 
    component: BNAExamMarkApproveComponent 
  },

  {
    path: 'bnaexammark-list', 
    component: BNAExamMarkListComponent,
  },

  {
    path: 'exammarkapprove-list', 
    component: ExamApproveComponent,
  },

  { path: 'update-bnaexammark/:bnaExamMarkId',  
  component: NewBNAExamMarkComponent, 
  },


  {
    path: 'add-bnaexammark',
    component: NewBNAExamMarkComponent,
  },

  
  {
    path: 'add-assignmentmark',
    component: NewAssignmentMarkComponent,
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
export class ExamManagementRoutingModule { }

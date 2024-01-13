import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BNASubjectNameListComponent } from './bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBNASubjectNameComponent } from './bnasubjectname/new-bnasubjectname/new-bnasubjectname.component';
import { NewSubjectnameComponent } from './subjectname/new-subjectname/new-subjectname.component';
import { SubjectnameListComponent } from './subjectname/subjectname-list/subjectname-list.component';
import { SubjectMarkListComponent } from './subjectmark/subjectmark-list/subjectmark-list.component';
import { NewSubjectMarkComponent } from './subjectmark/new-subjectmark/new-subjectmark.component';
import { CourseInstructorListComponent } from './courseinstructor/courseinstructor-list/courseinstructor-list.component';
import { NewCourseInstructorComponent } from './courseinstructor/new-courseinstructor/new-courseinstructor.component';
import { NewSubjectnameforBnaComponent } from './subjectnameforbna/new-subjectnameforbna/new-subjectnameforbna.component';
import { BnaSubjectMarkListComponent } from './bnasubjectmark/bnasubjectmark-list/bnasubjectmark-list.component';
import { NewBnaSubjectMarkComponent } from './bnasubjectmark/new-bnasubjectmark/new-bnasubjectmark.component';
import { BnaCourseInstructorListComponent } from './bnacourseinstructor/bnacourseinstructor-list/bnacourseinstructor-list.component';
import { NewBnaCourseInstructorComponent } from './bnacourseinstructor/new-bnacourseinstructor/new-bnacourseinstructor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  
  {
    path: 'subjectinstructor-list',
    component: CourseInstructorListComponent,
  },
  { path: 'update-subjectinstructor/:courseInstructorId', 
  component: NewCourseInstructorComponent 
  },
  {
    path: 'add-subjectinstructor',
    component: NewCourseInstructorComponent,
  },

  {
    path: 'bnasubjectname-list',
    component: BNASubjectNameListComponent,
  },
  { path: 'update-bnasubjectname/:bnaSubjectNameId', 
  component: NewBNASubjectNameComponent 
  },
  {
    path: 'add-bnasubjectname', 
    component: NewBNASubjectNameComponent,
  },

 // NewBNASubjectNameComponent
  {
    path: 'subjectmark-list',
    component: SubjectMarkListComponent,
  },
  { path: 'update-subjectmark/:subjectMarkId', 
  component: NewSubjectMarkComponent 
  },
  {
    path: 'add-subjectmark', 
    component: NewSubjectMarkComponent,
  },

  {
    path: 'subjectname-list',
    component: SubjectnameListComponent,
  },
  { path: 'update-subjectname/:bnaSubjectNameId', 
  component: NewSubjectnameComponent 
  },
  
  {
    path: 'add-subjectname', 
    component: NewSubjectnameComponent,
  },

  { path: 'update-subjectnameforbna/:bnaSubjectNameId', 
  component: NewSubjectnameforBnaComponent 
  },
  {
    path: 'add-subjectnameforbna', 
    component: NewSubjectnameforBnaComponent,
  },

  {
    path: 'bnasubjectmark-list',
    component: BnaSubjectMarkListComponent,
  },
  { path: 'update-bnasubjectmark/:subjectMarkId', 
  component: NewBnaSubjectMarkComponent 
  },
  {
    path: 'add-bnasubjectmark', 
    component: NewBnaSubjectMarkComponent,
  },
  {
    path: 'bnasubjectinstructor-list',
    component: BnaCourseInstructorListComponent,
  },
  { path: 'update-bnasubjectinstructor/:courseInstructorId', 
  component: NewBnaCourseInstructorComponent 
  },
  {
    path: 'add-bnasubjectinstructor',
    component: NewBnaCourseInstructorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectManagementRoutingModule { }

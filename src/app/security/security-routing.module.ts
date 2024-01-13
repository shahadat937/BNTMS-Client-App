import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from '../authentication/page404/page404.component';
import { FeatureListComponent } from './feature/feature-list/feature-list.component';
import { NewFeatureComponent } from './feature/new-feature/new-feature.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { NewModuleComponent } from './module/new-module/new-module.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { InstructorListComponent } from './instructor/instructor-list/instructor-list.component';
import { NewInstructorComponent } from './instructor/new-instructor/new-instructor.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { NewRoleComponent } from './role/new-role/new-role.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleFeatureListComponent } from './rolefeature/rolefeature-list/rolefeature-list.component';
import { NewRoleFeatureComponent } from './rolefeature/new-rolefeature/new-rolefeature.component';

import { NewOrganizationComponent } from './baseschoolname/new-organization/new-organization.component';
import { NewCommendingAreaComponent } from './baseschoolname/new-commendingarea/new-commendingarea.component';
import { NewBaseNameComponent } from './baseschoolname/new-basename/new-basename.component';
import { NewSchoolNameComponent } from './baseschoolname/new-schoolname/new-schoolname.component';
import { NewUserListComponent } from './user/new-userlist/new-userlist.component';

const routes:Routes =[
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  {
    path: 'new-organizations',
    component: NewOrganizationComponent,
  },

  {
    path: 'new-userlist',
    component: NewUserListComponent,
  },


  {
    path: 'update-organization/:baseSchoolNameId',
    component: NewOrganizationComponent,
  },

  {
    path: 'new-commandingarea',
    component: NewCommendingAreaComponent,
  },

  {
    path: 'update-commandingarea/:baseSchoolNameId',
    component: NewCommendingAreaComponent,
  },
  
  {
    path: 'new-basename',
    component: NewBaseNameComponent,
  },

  {
    path: 'update-basename/:baseSchoolNameId',
    component: NewBaseNameComponent,
  },
  
  {
    path: 'new-baseschool',
    component: NewSchoolNameComponent,
  },

  {
    path: 'update-baseschool/:baseSchoolNameId',
    component: NewSchoolNameComponent,
  },

  {
    path: 'feature-list',
    component: FeatureListComponent,
  },
  { path: 'update-feature/:featureId', 
  component: NewFeatureComponent 
  },
  {
    path: 'add-feature', 
    component: NewFeatureComponent,
  },

  {
    path: 'rolefeature-list',
    component: RoleFeatureListComponent,
  },
  { path: 'update-rolefeature/:roleId/:featureId', 
  component: NewRoleFeatureComponent 
  },
  {
    path: 'add-rolefeature', 
    component: NewRoleFeatureComponent,
  },

  {
    path: 'module-list',
    component:ModuleListComponent,
  },
  { 
  path: 'update-module/:moduleId', 
  component: NewModuleComponent, 
  },
  {
    path: 'add-module',
    component: NewModuleComponent,
  },

  {
    path: 'role-list',
    component: RoleListComponent,
  },
  { path: 'update-role/:roleId', 
  component: NewRoleComponent 
  },
  {
    path: 'add-role',
    component: NewRoleComponent,
  },

  {
    path: 'user-list',
    component: UserListComponent,
  },
  { path: 'update-user/:userId', 
  component: NewUserComponent,  
  },
  {
    path: 'add-user',
    component: NewUserComponent,
  },

  {
    path: 'instructor-list',
    component: InstructorListComponent,
  },
  {
    path: 'add-instructor',
    component: NewInstructorComponent,
  },
  { path: 'update-instructor/:userId', 
  component: NewInstructorComponent,  
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityRoutingModule { }

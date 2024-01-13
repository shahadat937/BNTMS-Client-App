import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { SecurityRoutingModule } from './security-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { RoleFeatureListComponent } from './rolefeature/rolefeature-list/rolefeature-list.component';
import { NewRoleFeatureComponent } from './rolefeature/new-rolefeature/new-rolefeature.component';

import { FeatureListComponent } from './feature/feature-list/feature-list.component';
import { NewFeatureComponent } from './feature/new-feature/new-feature.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { NewModuleComponent } from './module/new-module/new-module.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { InstructorListComponent } from './instructor/instructor-list/instructor-list.component';
import { NewInstructorComponent } from './instructor/new-instructor/new-instructor.component';
import { UserListComponent } from './user/user-list/user-list.component';
import {NewRoleComponent} from './role/new-role/new-role.component';
import {RoleListComponent} from './role/role-list/role-list.component';
import { NewOrganizationComponent } from './baseschoolname/new-organization/new-organization.component';
import { NewCommendingAreaComponent } from './baseschoolname/new-commendingarea/new-commendingarea.component';
import { NewBaseNameComponent } from './baseschoolname/new-basename/new-basename.component';
import { NewSchoolNameComponent } from './baseschoolname/new-schoolname/new-schoolname.component';
import { NewUserListComponent } from './user/new-userlist/new-userlist.component';

@NgModule({
  declarations: [
    FeatureListComponent,
    NewFeatureComponent,
    ModuleListComponent,
    NewModuleComponent,
    NewUserComponent,
    UserListComponent,
    NewRoleComponent,
    RoleListComponent,
    RoleFeatureListComponent,
    NewRoleFeatureComponent,
    NewOrganizationComponent,
    NewCommendingAreaComponent,
    NewBaseNameComponent,
    NewSchoolNameComponent,
    InstructorListComponent,
    NewInstructorComponent,
    NewUserListComponent
    //  FirstLevelListComponent,
    //  SecondLevelListComponent,
    //  ThirdLevelListComponent,
    //  FourthLevelListComponent,
    //  NewBranchInfoComponent
  ],
  imports: [
    CommonModule,
    CommonModule,
    SecurityRoutingModule,
    CommonModule,
    FormsModule,  
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatAutocompleteModule
  ]
})
export class SecurityModule { }

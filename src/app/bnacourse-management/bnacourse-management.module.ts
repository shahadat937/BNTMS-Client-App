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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { CourseWeekListComponent } from './courseweek/courseweek-list/courseweek-list.component';
import { NewCourseWeekComponent } from './courseweek/new-courseweek/new-courseweek.component';
import { BnaCourseManagementRoutingModule } from './bnacourse-management-routing.module';

import { CourseInstructorBySubjectListComponent } from './localcourse/courseinstructor-list/courseinstructor-list.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';

import { ForeignTraineeNominationListComponent } from './foreigntraineenomination/traineenomination-list/foreigntraineenomination-list.component';
import { NewForeignTraineeNominationComponent } from './foreigntraineenomination/new-traineenomination/new-foreigntraineenomination.component';
import { ViewSubjectListBySchoolAndCourseComponent } from './localcourse/viewsubjectbyschool-list/viewsubjectbyschool-list.component';
import { ViewSubjectMarkListBySubjectComponent } from './localcourse/viewsubjectmarkbysubject-list/viewsubjectmarkbysubject-list.component';
import { ClassRoutineListComponent } from './localcourse/classroutine-list/classroutine-list.component';
import { CourseDurationListComponent } from './courseduration/courseduration-list/courseduration-list.component';
import { NewCourseDurationComponent } from './courseduration/new-courseduration/new-courseduration.component';
import { CourseplanCreateListComponent } from './courseplancreate/courseplancreate-list/courseplancreate-list.component';
import { NewCourseplanCreateComponent } from './courseplancreate/new-courseplancreate/new-courseplancreate.component';
import { LocalcourseListComponent } from './localcourse/localcourse-list/localcourse-list.component';
import { NewLocalcourseComponent } from './localcourse/new-localcourse/new-localcourse.component';
import { InterservicecourseListComponent } from './interservicecourse/interservicecourse-list/interservicecourse-list.component';
import { NewInterservicecourseComponent } from './interservicecourse/new-interservicecourse/new-interservicecourse.component';
import { NewForeigncourseComponent } from './foreigncourse/new-foreigncourse/new-foreigncourse.component';
import { ForeigncourseListComponent } from './foreigncourse/foreigncourse-list/foreigncourse-list.component';
import { MarkListByCourseComponent } from './localcourse/marklistbycourse-list/marklistbycourse-list.component';
import { CourseActivationListComponent } from './coursecompletion/coursecompletion-list/courseactivation-list.component';

@NgModule({
  declarations: [
    CourseDurationListComponent,
    NewCourseDurationComponent,
    CourseplanCreateListComponent,
    NewCourseplanCreateComponent,
    TraineeNominationListComponent,
    NewTraineeNominationComponent,
    ForeignTraineeNominationListComponent,
    NewForeignTraineeNominationComponent,
    ViewSubjectListBySchoolAndCourseComponent,
    ViewSubjectMarkListBySubjectComponent,
    CourseInstructorBySubjectListComponent,
    ClassRoutineListComponent,
    LocalcourseListComponent,
    NewLocalcourseComponent,
    InterservicecourseListComponent,
    NewInterservicecourseComponent,
    NewForeigncourseComponent,
    ForeigncourseListComponent,
    MarkListByCourseComponent,
    CourseActivationListComponent,
    CourseWeekListComponent,
    NewCourseWeekComponent
  ],
  imports: [
    CommonModule,
    BnaCourseManagementRoutingModule,
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
    MatDatepickerModule,
    MaterialFileInputModule,
    MatAutocompleteModule
  ]
})
export class BnaCourseManagementModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { ForeignTraineeNominationListComponent } from './foreigntraineenomination/traineenomination-list/foreigntraineenomination-list.component';
import { NewForeignTraineeNominationComponent } from './foreigntraineenomination/new-traineenomination/new-foreigntraineenomination.component';
import { ViewSubjectListBySchoolAndCourseComponent } from './localcourse/viewsubjectbyschool-list/viewsubjectbyschool-list.component';
import { ViewSubjectMarkListBySubjectComponent } from './localcourse/viewsubjectmarkbysubject-list/viewsubjectmarkbysubject-list.component';
import { CourseDurationListComponent } from './courseduration/courseduration-list/courseduration-list.component';
import { NewCourseDurationComponent } from './courseduration/new-courseduration/new-courseduration.component';
import { CourseplanCreateListComponent } from './courseplancreate/courseplancreate-list/courseplancreate-list.component';
import { NewCourseplanCreateComponent } from './courseplancreate/new-courseplancreate/new-courseplancreate.component';
import { LocalcourseListComponent } from './localcourse/localcourse-list/localcourse-list.component';
import { NewLocalcourseComponent } from './localcourse/new-localcourse/new-localcourse.component';
import { ForeigncourseListComponent } from './foreigncourse/foreigncourse-list/foreigncourse-list.component';
import { InterservicecourseListComponent } from './interservicecourse/interservicecourse-list/interservicecourse-list.component';
import { NewInterservicecourseComponent } from './interservicecourse/new-interservicecourse/new-interservicecourse.component';
import { NewForeigncourseComponent } from './foreigncourse/new-foreigncourse/new-foreigncourse.component';
import { ClassRoutineListComponent } from './localcourse/classroutine-list/classroutine-list.component';
import { CourseInstructorBySubjectListComponent } from './localcourse/courseinstructor-list/courseinstructor-list.component';
import { MarkListByCourseComponent } from './localcourse/marklistbycourse-list/marklistbycourse-list.component';
import {CourseActivationListComponent} from './coursecompletion/coursecompletion-list/courseactivation-list.component'
import { CourseWeekListComponent } from './courseweek/courseweek-list/courseweek-list.component';
import { NewCourseWeekComponent } from './courseweek/new-courseweek/new-courseweek.component';
import { LocalCourseBySchoolListComponent } from './localcourse/localcoursebyschool-list/localcoursebyschool-list.component';
import { TraineeSectionAssignListComponent } from './localcourse/localcoursebyschool-list/traineesectionassign-list/traineesectionassign-list.component';
import { CalendarComponent as EventCalendar } from '../calendar/event-calendar/calendar.component';
import { WeekByCourseListComponent } from './courseweek/weekbycourse-list/weekbycourse-list.component';
import {ReligationListComponent} from './localcourse/religation-list/religation-list.component';
import {TraineeReligationListComponent} from './localcourse/religation-list/traineereligation-list/traineereligation-list.component'
import {NewReligationComponent} from './localcourse/religation-list/new-religation/new-religation.component'
import {CourseCreateNbcdListComponent} from './coursecreatenbcd/coursecreatenbcd-list.component';
import {TraineeNominationListForNbcdComponent} from './traineenominationlistfornbcd/new-traineenomination/traineenomination-listfornbcd.component'
import {NewTraineeNominationNbcdComponent} from './traineenominationnbcd/new-traineenominationnbcd/new-traineenominationnbcd.component'
import { NewBnaLocalcourseComponent } from './bnalocalcourse/new-bnalocalcourse/new-bnalocalcourse.component';
import { BnaLocalcourseListComponent } from './bnalocalcourse/bnalocalcourse-list/bnalocalcourse-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  //course-management/traineereligation-list/14377
  {
    path: 'nbcdcourse-list',
    component: CourseCreateNbcdListComponent,
  },

  // { 
  //   path: 'traineenominationlist-fornbcd/:courseDurationId',   
  //   component: TraineeNominationListForNbcdComponent, 
  // },
  {
    path: 'add-traineenominationnbcd',
    component: NewTraineeNominationNbcdComponent,
  },

  {
    path: 'add-religation/:traineeNominationId',
    component: NewReligationComponent,
  },
  {
    path: 'religation-list',
    component: ReligationListComponent,
  },

  {
    path: 'traineereligation-list/:courseDurationId',
    component: TraineeReligationListComponent,
  },

  {
    path: 'event-calender',
    component: EventCalendar,
  },

  {
    path: 'weekbycourse-list',
    component: WeekByCourseListComponent,
  },
  {
    path: 'courseweek-list/:courseDurationId',
    component: CourseWeekListComponent,
  },
  { path: 'update-courseweek/:courseWeekId', 
  component: NewCourseWeekComponent 
  },
  {
    path: 'add-courseweek', 
    component: NewCourseWeekComponent, 
  },
  
  {
    path: 'courseduration-list',
    component: CourseDurationListComponent,
  },

  
  {
    path: 'schoolcourse-list',
    component: LocalCourseBySchoolListComponent,
  },

  {
    path: 'coursenominee-list/:courseDurationId',
    component: TraineeSectionAssignListComponent,
  },

  {
    path: 'routinebycourse-list/:baseSchoolNameId/:courseNameId/:courseDurationId',
    component: ClassRoutineListComponent,
  },
  { path: 'update-courseduration/:courseDurationId', 
  component: NewCourseDurationComponent 
  },
  {
    path: 'add-courseduration',
    component: NewCourseDurationComponent,
  },

  {
    path: 'localcourse-list',
    component: LocalcourseListComponent,
  },
  { path: 'update-localcourse/:courseDurationId/:courseTypeId', 
  component: NewLocalcourseComponent 
  },
  { path: 'view-subjectbyschoolandcourse/:baseSchoolNameId/:courseNameId/:courseDurationId', 
  component: ViewSubjectListBySchoolAndCourseComponent 
  },
  { path: 'view-subjectmarksbysubject/:baseSchoolNameId/:courseNameId/:courseDurationId/:bnaSubjectNameId', 
  component: ViewSubjectMarkListBySubjectComponent 
  },
  {
    path: 'add-localcourse/:courseTypeId',
    component: NewLocalcourseComponent,
  },
  { 
    path: 'view-courseinstructors/:baseSchoolNameId/:bnaSubjectNameId/:courseModuleId/:courseNameId/:courseDurationId', 
    component: CourseInstructorBySubjectListComponent 
  },

  {
    path: 'foreigncourse-list',
    component: ForeigncourseListComponent,
  },
  { path: 'update-foreigncourse/:courseDurationId', 
  component: NewForeigncourseComponent 
  },
  {
    path: 'add-foreigncourse/:courseTypeId', 
    component: NewForeigncourseComponent, 
  },

  {
    path: 'interservicecourse-list',
    component: InterservicecourseListComponent,
  },
  { path: 'update-interservicecourse/:courseDurationId',  
  component: NewInterservicecourseComponent  
  },
  {
    path: 'add-interservicecourse/:courseTypeId', 
    component: NewInterservicecourseComponent, 
  },

  {
    path: 'courseactivation-list', 
    component: CourseActivationListComponent,
  },

  {
    path: 'courseplancreate-list', 
    component: CourseplanCreateListComponent,
  },
  { path: 'update-courseplancreate/:coursePlanCreateId',  
  component: NewCourseplanCreateComponent, 
  },
  {
    path: 'add-courseplancreate',
    component: NewCourseplanCreateComponent,
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

  { 
    path: 'traineenominationlist-fornbcd/:courseDurationId',   
    component: TraineeNominationListForNbcdComponent, 
  },

  {
    path: 'add-traineenomination',
    component: NewTraineeNominationComponent,
  },

  {
    path: 'foreigntraineenomination-list/:courseDurationId', 
    component: ForeignTraineeNominationListComponent,
  },
  { path: 'update-foreigntraineenomination/:traineeNominationId',  
  component: NewForeignTraineeNominationComponent, 
  },
  { path: 'add-foreigntraineenomination/:courseDurationId/:courseNameId',   
  component: NewForeignTraineeNominationComponent, 
  },
  {
    path: 'add-foreigntraineenomination',
    component: NewForeignTraineeNominationComponent,
  },
  { 
    path: 'marklistbycourse-list/:courseDurationId', 
    component: MarkListByCourseComponent 
  },
  { 
    path: 'marklistbycourse-list/:courseDurationId/:dbType/:courseTypeId', 
    component: MarkListByCourseComponent 
  },
  { 
    path: 'marklistbycourse-list/:courseDurationId/:dbType', 
    component: MarkListByCourseComponent 
  },
  { 
    path: 'marklistbycourse-list/:courseDurationId/:dbType/:dbType1/:dbType2', 
    component: MarkListByCourseComponent 
  },
  { 
    path: 'marklistbycourse-list/:courseDurationId/:dbType/:dbType1/:dbType2', 
    component: CourseCreateNbcdListComponent 
  },

  {
    path: 'add-bnalocalcourse/:courseTypeId',
    component: NewBnaLocalcourseComponent,
  },
  { path: 'update-bnalocalcourse/:courseDurationId/:courseTypeId', 
  component: NewBnaLocalcourseComponent 
  },
  {
    path: 'bnalocalcourse-list',
    component: BnaLocalcourseListComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseManagementRoutingModule { }

import { NgModule } from '@angular/core';
import { NgMarqueeModule } from 'ng-marquee';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './main/main.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FullCalendarModule } from "@fullcalendar/angular";
import { MatMenuModule } from '@angular/material/menu';
import { LocalcourseListComponent } from './localcourse/localcourse-list/localcourse-list.component';
import { ViewSubjectListBySchoolAndCourseComponent } from './viewsubjectbyschool-list/viewsubjectbyschool-list.component';
import { ViewSubjectMarkListBySubjectComponent } from './viewsubjectmarkbysubject-list/viewsubjectmarkbysubject-list.component';
import { TraineeNominationListComponent } from './traineenomination-list/traineenomination-list.component';
import { CourseInstructorListComponent } from './courseinstructor-list/courseinstructor-list.component';
import { ClassRoutineListComponent } from './classroutine-list/classroutine-list.component';
import { SubjectInstructorListComponent } from './subjectinstructor-list/subjectinstructor-list.component';
import { ExamInstructorListComponent } from './examinstructor-list/examinstructor-list.component';
import { CountedOfficersListComponent } from './countedofficers-list/countedofficers-list.component';
import { RunningCourseListComponent } from './runningcourse-list/runningcourse-list.component';
import { ViewRunningCourseComponent } from './view-runningcourse/view-runningcourse.component';
import { UpcomingCourseListComponent } from './upcomingcourse-list/upcomingcourse-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ReadingMateriallistDashboardComponent } from 'src/app/school/readingmateriallistdashboard/readingmateriallistdashboard.component';
import { WeeklyProgramDashboardComponent } from './../../school/weeklyprogramdashboard/weeklyprogramdashboard.component';
import {DailyprogramlistDashboardComponent} from './../../school/dailyprogramlist-dashboard/dailyprogramlist-dashboard.component'
import { AbsentlistDashboardComponent } from './../../school/absentlist-dashboard/absentlist-dashboard.component';
import {CourseInstructorListDashboardComponent} from './../../school/courseinstructorlist-dashboard/courseinstructorlist-dashboard.component'
import{PendingExamEvaluationlistDashboardComponent} from './../../school/pendingexamevaluationlist-dashboard/pendingexamevaluationlist-dashboard.component'
import {ReadingMaterialListTeacherDashboardComponent} from './../../teacher/readingmateriallistteacherdashboard/readingmateriallistteacherdashboard.component'
import {WeeklyRoutineTeacherDashboard} from './../../teacher/weeklyroutineteacherdashboard/weeklyroutineteacherdashboard.component'
import {SyllabusbySubjectListComponent} from './syllabusbysubject-list/syllabusbysubject-list.component';
import {AssignmentListComponent} from '../../teacher/assignment/assignment-list/assignment-list.component'
import {NewInstructorAssignmentComponent} from '../../teacher/assignment/new-instructorassignment/new-instructorassignment.component'
import {NewStudentAssignmentComponent} from '../../student/new-studentassignment/new-studentassignment.component'
import { NewPasswordChangeComponent } from 'src/app/instructor/passwordchange/new-passwordchange.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { CoursebySchoolListComponent } from './coursebyschool-list/coursebyschool-list.component';
import { CourseWeekByDurationListComponent } from './courseweekbyduration-list/courseweekbyduration-list.component';
import { CentralExamCourseListComponent } from './centralexamcourse-list/centralexamcourse-list.component';
import { CentralExamNominatedListComponent } from './centralexamnominated-list/centralexamnominated-list.component';
import { SchoolHistoryComponent } from './school-history/school-history.component';
import { JstiTraineeDetailsComponent } from './jsti-trainee-details/jsti-trainee-details.component';
import { CourseOutlineListComponent } from './courseoutline-list/courseoutline-list.component';
import {ViewObtainMarkListComponent} from './viewobtainmarklist/viewobtainmark-list.component';
import {TraineeAttendanceListComponent} from './traineeattendance-list/traineeattendance-list.component';
import {ViewTraineeCourseProfileListComponent} from './view-traineecourseprofile/view-traineecourseprofile-list.component';
import {UpdateCourseDurationComponent} from './coursedurationnbcd/update-courseduration.component';
import {TraineePerformanceDetailsListComponent} from './trainee-performancedetails/trainee-performancedetails.component';
import {ViewCourseDetailsComponent} from './view-coursedetails/view-coursedetails.component';
import {TraineeCertificateListComponent} from './trainee-certificate/trainee-certificate.component';
import {UpcomingCoursesNbcdListComponent} from './../../school/upcomingcoursesnbcd-list/upcomingcoursesnbcd-list.component'
import {ViewCourseCreateNbcdComponent} from './../dashboard/view-coursecreatenbcd/view-coursecreatenbcd.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {RoutineSoftcopyTraineeComponent} from '../dashboard/routinesoftcopytrainee/routinesoftcopytrainee.component'

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    MainComponent,
    UpdateCourseDurationComponent,
    LocalcourseListComponent,
    ViewSubjectListBySchoolAndCourseComponent,
    ViewSubjectMarkListBySubjectComponent,
    TraineeNominationListComponent,
    CourseInstructorListComponent,
    ClassRoutineListComponent,
    SubjectInstructorListComponent,
    ExamInstructorListComponent,
    CountedOfficersListComponent,
    RunningCourseListComponent,
    ViewRunningCourseComponent,
    UpcomingCourseListComponent,
    ReadingMateriallistDashboardComponent,
    WeeklyProgramDashboardComponent,
    DailyprogramlistDashboardComponent,
    AbsentlistDashboardComponent,
    CourseInstructorListDashboardComponent,
    PendingExamEvaluationlistDashboardComponent,
    ReadingMaterialListTeacherDashboardComponent,
    WeeklyRoutineTeacherDashboard,
    SyllabusbySubjectListComponent,
    AssignmentListComponent,
    NewInstructorAssignmentComponent,
    NewStudentAssignmentComponent,
    SchoolListComponent,
    CoursebySchoolListComponent,
    CourseWeekByDurationListComponent,
    CentralExamCourseListComponent,
    CentralExamNominatedListComponent,
    ViewObtainMarkListComponent,
    TraineeAttendanceListComponent,
    ViewTraineeCourseProfileListComponent,
    TraineePerformanceDetailsListComponent,
    ViewCourseDetailsComponent,
    TraineeCertificateListComponent,
    UpcomingCoursesNbcdListComponent,
    ViewCourseCreateNbcdComponent,
    SchoolHistoryComponent,
    JstiTraineeDetailsComponent,
    CourseOutlineListComponent,
    RoutineSoftcopyTraineeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    NgApexchartsModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule,
    CommonModule,
    FormsModule,
    FullCalendarModule,  
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSnackBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MaterialFileInputModule,
    NgMarqueeModule, 
    MatAutocompleteModule
  ],
})
export class DashboardModule {}

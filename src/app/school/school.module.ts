import { NgModule } from '@angular/core';
import { NgMarqueeModule } from 'ng-marquee';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

import { SchoolRoutingModule } from './school-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TraineeAbsentDetailListComponent } from './traineeabsentdetail-list/traineeabsentdetail-list.component';
import { CountedOfficersListComponent } from './countedofficers-list/countedofficers-list.component';
import { RoutineByCourseListComponent } from './routinebycourse-list/routinebycourse-list.component';
import { MaterialByCourseListComponent } from './materialbycourse-list/materialbycourse-list.component';
import { InstructorByCourseListComponent } from './instructorbycourse-list/instructorbycourse-list.component';
import { AttendanceByCourseListComponent } from './attendancebycourse-list/attendancebycourse-list.component';
import { AttendanceByRoutineListComponent } from './attendancebyroutine-list/attendancebyroutine-list.component';
import { RunningCoursesListComponent } from './runningcourses-list/runningcourses-list.component';
import {UpcomingCoursesListComponent} from './upcomingcourses-list/upcomingcourses-list.component';
import { SchoolNoticeListComponent } from './schoolnotice-list/schoolnotice-list.component';
import { SchoolEventListComponent } from './schoolevent-list/schoolevent-list.component';
import { ExamStatusBySubjectListComponent } from './examstatusbysubject-list/examstatusbysubject-list.component';
import { ViewCourseListBySchoolComponent } from './view-courselistbyschool/view-courselistbyschool.component';
import { CombinedBnaRoutineListComponent } from './combinedbnaroutine-list/combinedbnaroutine-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TraineeAbsentDetailListComponent,
    CountedOfficersListComponent,
    RoutineByCourseListComponent,
    MaterialByCourseListComponent,
    InstructorByCourseListComponent,
    AttendanceByCourseListComponent,
    AttendanceByRoutineListComponent,
    RunningCoursesListComponent,
    UpcomingCoursesListComponent,
    SchoolNoticeListComponent,
    SchoolEventListComponent,
    ExamStatusBySubjectListComponent,
    ViewCourseListBySchoolComponent,
    CombinedBnaRoutineListComponent
  ],
  imports: [
    CommonModule,
    SchoolRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
    NgApexchartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    NgMarqueeModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatSortModule,
    MatCheckboxModule,
    MatTooltipModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
})
export class SchoolModule {}


import { NgModule } from '@angular/core';
import { NgMarqueeModule } from 'ng-marquee';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InterServiceDashboardRoutingModule } from './inter-service-dashboard-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { totaltraineeListComponent } from './totaltrainee-list/totaltrainee-list.component';
import { upcomingcourseListComponent } from './upcomingcourse-list/upcomingcourse-list.component';
import { JcoExamListComponent } from './jcoexam-list/jcoexam-list.component';
import { TraineeNominationListComponent } from './traineenomination-list/traineenomination-list.component';
import { UpdateTraineeNominationComponent } from './update-traineenomination/update-traineenomination.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FullCalendarModule } from "@fullcalendar/angular";
import { MatMenuModule } from '@angular/material/menu';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';

import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    DashboardComponent,
    totaltraineeListComponent,
    upcomingcourseListComponent,
    JcoExamListComponent,
    TraineeNominationListComponent,
    UpdateTraineeNominationComponent
  ],
  imports: [
    CommonModule,
    InterServiceDashboardRoutingModule,
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
    NgMarqueeModule ,
    MatCheckboxModule,
    MatRadioModule
  ],
})
export class InterServiceDashboardModule {}

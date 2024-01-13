import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgMarqueeModule } from 'ng-marquee';
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
import { BnaRoutingModule } from './bna-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AssignedSubjectListComponent } from './assignedsubject-list/assignedsubject-list.component';
import { AssignedSubjectMarkListComponent } from './assignedsubjectmark-list/assignedsubjectmark-list.component';
import { InstructorExamComponent } from './instructorexam-list/instructorexam-list.component';
import { SubmittedAssignmentComponent } from './assignment/submittedassignment-list/submittedassignment-list.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AssignedSubjectListComponent,
    AssignedSubjectMarkListComponent,
    InstructorExamComponent,
    SubmittedAssignmentComponent
  ],
  imports: [
    CommonModule,
    BnaRoutingModule,
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
    NgMarqueeModule
  ],
})
export class BnaModule {}

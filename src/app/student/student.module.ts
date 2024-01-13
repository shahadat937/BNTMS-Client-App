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
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SubjectModuleListComponent } from './subjectmodule-list/subjectmodule-list.component';
import { WeeklyProgramListComponent } from './weeklyprogram-list/weeklyprogram-list.component';
import { ReadingMaterialListComponent } from './readingmaterial-list/readingmaterial-list.component';
import { WeeklyAttendanceListComponent } from './weeklyattendance-list/weeklyattendance-list.component';
import { StudentRoutingModule } from './student-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewSubjectListByModuleComponent } from './viewsubjectbymodule-list/viewsubjectbymodule-list.component';
import { CourseInstructorListComponent } from './courseinstructor-list/courseinstructor-list.component';
import { ViewSubjectMarkListByModuleComponent } from './viewsubjectmarkbymodule-list/viewsubjectmarkbymodule-list.component';
import { ExamRoutineListComponent } from './examroutine-list/examroutine-list.component';
import { TraineeMarkSheetComponent } from './traineemarksheet-list/traineemarksheet-list.component';
import { TeacherEvaluationListComponent } from './teacherevaluation-list/teacherevaluation-list.component';
import { TeacherSubjectEvaluationComponent } from './teachersubjectevaluation-list/teachersubjectevaluation-list.component';
import { AssignmentListComponent } from './assignment-list/assignment-list.component';
import { InstallmentListComponent } from './installment-list/installment-list.component';
import { JcoResultBySubjectListComponent } from './jcoresultbysubject-list/jcoresultbysubject-list.component';
import { ViewReadingMaterialComponent } from './view-readingmaterial/view-readingmaterial.component';
import { NewAssessmentMarkComponent } from './new-assessmentmark/new-assessmentmark.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ViewSubjectListByModuleComponent,
    CourseInstructorListComponent,
    ViewSubjectMarkListByModuleComponent,
    SubjectModuleListComponent,
    WeeklyProgramListComponent,
    ReadingMaterialListComponent,
    WeeklyAttendanceListComponent,
    ExamRoutineListComponent,
    TraineeMarkSheetComponent,
    TeacherEvaluationListComponent,
    TeacherSubjectEvaluationComponent,
    AssignmentListComponent,
    InstallmentListComponent,
    JcoResultBySubjectListComponent,
    ViewReadingMaterialComponent,
    NewAssessmentMarkComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
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
    MatProgressBarModule,
    NgxDatatableModule,
    MatAutocompleteModule
  ],
})
export class StudentModule {}

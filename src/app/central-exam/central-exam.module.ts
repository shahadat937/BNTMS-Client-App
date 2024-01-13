import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
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

import { AttendanceApprovedComponent } from './attendance/attendance-approved/attendance-approved.component';
import { AttendanceInstructorComponent } from './attendance/attendance-instructor/attendance-instructor.component';

import { ExamCenterSelectionListComponent } from './examcenterselection/examcenterselection-list/examcenterselection-list.component';
import { NewExamCenterSelectionComponent } from './examcenterselection/new-examcenterselection/new-examcenterselection.component';

import { CentralExamListComponent } from './centralexam/centralexam-list/centralexam-list.component';
import { NewCentralExamComponent } from './centralexam/new-centralexam/new-centralexam.component';

import { CentralExamRoutingModule } from './central-exam-routing.module';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BNASubjectNameListComponent } from './bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBNASubjectNameComponent } from './bnasubjectname/new-bnasubjectname/new-bnasubjectname.component'
//import {NewQExamMarkComponent} from './qexammark/new-qexammark/new-qexammark.component';
import {NewSubjectMarkComponent} from '../central-exam/subjectmark/new-subjectmark/new-subjectmark.component'
import { ViewSubjectListByQExamComponent } from './centralexam/viewsubjectbyqexam-list/viewsubjectbyqexam-list.component';
import {NewClassRoutineComponent} from './classroutine/new-classroutine/new-classroutine.component';
import {NewAttendanceComponent} from '../central-exam/attendance/new-attendance/new-attendance.component'
import{NewAttendanceTraineeListComponent} from '../central-exam/attendance/new-attendancetraineelist/new-attendancetraineelist.component'
import {NewQExamMarkComponent} from '../central-exam/qexammark/new-qexammark/new-qexammark.component'
import {NewCourseInstructorComponent} from '../central-exam/courseinstructor/new-courseinstructor/new-courseinstructor.component'
import {NewIndexNoComponent} from '../central-exam/indexno/new-indexno/new-indexno.component'

import { EditClassRoutineComponent } from '../central-exam/classroutine/edit-classroutine/edit-classroutine.component';
import { ExamApproveComponent } from '../central-exam/qexammark/examapprove-list/examapprove-list.component';



@NgModule({
  declarations: [
    ExamCenterSelectionListComponent,
    NewExamCenterSelectionComponent,
    CentralExamListComponent,
    EditClassRoutineComponent,
    NewCentralExamComponent,
    TraineeNominationListComponent,
    NewTraineeNominationComponent,
    BNASubjectNameListComponent,
    NewBNASubjectNameComponent,
    NewQExamMarkComponent,
    NewSubjectMarkComponent,
    ViewSubjectListByQExamComponent,
    NewClassRoutineComponent,
    NewAttendanceComponent,
    NewAttendanceTraineeListComponent,
    NewCourseInstructorComponent,
    NewIndexNoComponent,
    ExamApproveComponent,
    AttendanceApprovedComponent,
    AttendanceInstructorComponent
  ],
  imports: [
    CommonModule,
    CentralExamRoutingModule,
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
    MatAutocompleteModule,
    MatCheckboxModule  
  ]
})
export class CentralExamModule { }

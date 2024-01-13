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

import { StaffCollageRoutingModule } from './staff-collage-routing.module';
import { BNASubjectNameListComponent } from './bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBNASubjectNameComponent } from './bnasubjectname/new-bnasubjectname/new-bnasubjectname.component';
import { StaffCollageCourseListComponent } from './staffcollagecourse/staffcollagecourse-list/staffcollagecourse-list.component';
import { NewStaffCollageCourseComponent } from './staffcollagecourse/new-staffcollagecourse/new-staffcollagecourse.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ViewSubjectListByStaffCollageComponent } from './staffcollagecourse/viewsubjectbystaffcollage-list/viewsubjectbystaffcollage-list.component';
import {NewQExamMarkComponent} from './qexammark/new-qexammark/new-qexammark.component'
import {QExamMarkApproveComponent} from './qexammark/qexammark-approve/qexammark-approve.component'
import {NewClassRoutineComponent} from '../staff-collage/classroutine/new-classroutine/new-classroutine.component'
import {NewSubjectMarkComponent} from '../staff-collage/subjectmark/new-subjectmark/new-subjectmark.component'
import {NewAttendanceComponent} from '../staff-collage/attendance/new-attendance/new-attendance.component'
import {NewAttendanceTraineeListComponent} from '../staff-collage/attendance/new-attendancetraineelist/new-attendancetraineelist.component'
import {NewIndexNoComponent} from '../staff-collage/indexno/new-indexno/new-indexno.component'
import {NewCourseInstructorComponent} from '../staff-collage/courseinstructor/new-courseinstructor/new-courseinstructor.component'
import {ExamApproveComponent} from '../staff-collage/qexammark/examapprove-list/examapprove-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    BNASubjectNameListComponent,
    NewBNASubjectNameComponent,
    StaffCollageCourseListComponent,
    NewStaffCollageCourseComponent,
    TraineeNominationListComponent,
    NewTraineeNominationComponent,
    QExamMarkApproveComponent,
    ViewSubjectListByStaffCollageComponent,
    NewQExamMarkComponent,
    NewClassRoutineComponent,
    NewSubjectMarkComponent,
    NewAttendanceComponent,
    NewAttendanceTraineeListComponent,
    NewIndexNoComponent,
    NewCourseInstructorComponent,
    ExamApproveComponent
  ],
  imports: [
    CommonModule,
    StaffCollageRoutingModule,
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
    MatAutocompleteModule,
    MatCheckboxModule  
  ]
})
export class StaffCollageModule { }

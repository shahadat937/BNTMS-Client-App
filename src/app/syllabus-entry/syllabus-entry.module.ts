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

import { SyllabusEntryRoutingModule } from './syllabus-entry-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CourseTaskListComponent } from './coursetask/coursetask-list/coursetask-list.component';
import { NewCourseTaskComponent } from './coursetask/new-coursetask/new-coursetask.component';
import { NewTrainingObjectiveComponent } from './trainingobjective/new-trainingobjective/new-trainingobjective.component';
import { NewTrainingSyllabusComponent } from './trainingsyllabus/new-trainingsyllabus/new-trainingsyllabus.component';

@NgModule({
  declarations: [
      CourseTaskListComponent,
      NewCourseTaskComponent,
      NewTrainingObjectiveComponent,
      NewTrainingSyllabusComponent,
    //  TdecQuationGroupListComponent,
    //  NewTdecQuationGroupComponent,
  ],
  imports: [
    CommonModule,
    SyllabusEntryRoutingModule,
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
export class SyllabusEntryModule { }

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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoutineManagementRoutingModule } from './routine-management-routing.module';
import { ClassRoutineListComponent } from './classroutine/classroutine-list/classroutine-list.component';
import { NewClassRoutineComponent } from './classroutine/new-classroutine/new-classroutine.component';
import { EditClassRoutineComponent } from './classroutine/edit-classroutine/edit-classroutine.component';
import { ClassPeriodListComponent } from './classperiod/classperiod-list/classperiod-list.component';
import { NewClassPeriodComponent } from './classperiod/new-classperiod/new-classperiod.component';
import { NewRoutineNoteComponent } from './routinenote/new-routinenote/new-routinenote.component';
import { BNAExamScheduleListComponent } from './bnaexamschedule/bnaexamschedule-list/bnaexamschedule-list.component';
import { NewBNAExamScheduleComponent } from './bnaexamschedule/new-bnaexamschedule/new-bnaexamschedule.component';
import { BnaClassScheduleListComponent } from './bnaclassschedule/bnaclassschedule-list/bnaclassschedule-list.component';
import { NewBnaClassScheduleComponent } from './bnaclassschedule/new-bnaclassschedule/new-bnaclassschedule.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {NewRoutineSoftcopyUploadComponent} from './routinesoftcopyupload/new-routinesoftcopyupload/new-routinesoftcopyupload.component'
import { MatDialogModule } from '@angular/material/dialog';
import { NewBnaClassRoutineComponent } from './classroutine/new-bnaclassroutine/new-bnaclassroutine.component'
@NgModule({
  declarations: [
    ClassRoutineListComponent,
    NewClassRoutineComponent,
    ClassPeriodListComponent,
    NewClassPeriodComponent,
    BNAExamScheduleListComponent,
    NewBNAExamScheduleComponent,
    BnaClassScheduleListComponent,
    NewBnaClassScheduleComponent,
    EditClassRoutineComponent,
    NewRoutineNoteComponent,
    NewRoutineSoftcopyUploadComponent,
    NewBnaClassRoutineComponent
  ],
  imports: [
    CommonModule,
    FormsModule,  
    ReactiveFormsModule,
    NgxDatatableModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MaterialFileInputModule,
    RoutineManagementRoutingModule,
    MatDialogModule
  ]
})
export class RoutineManagementModule { }

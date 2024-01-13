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
import { TraineeAssessmentRoutingModule } from './trainee-assessment-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TraineeAssessmentMarkListComponent } from './traineeassessmentmark/traineeassessmentmark-list/traineeassessmentmark-list.component';
import { NewTraineeAssessmentMarkComponent } from './traineeassessmentmark/new-traineeassessmentmark/new-traineeassessmentmark.component';

import { TraineeAssessmentCreateListComponent } from './traineeassessmentcreate/traineeassessmentcreate-list/traineeassessmentcreate-list.component';
import { NewTraineeAssessmentCreateComponent } from './traineeassessmentcreate/new-traineeassessmentcreate/new-traineeassessmentcreate.component';
import { NewAssessmentGroupComponent } from './new-assessmentgroup/new-assessmentgroup.component';
import { TraineeAssessmentTraineeListComponent } from './traineeassessmentcreate/traineeassessmenttrainee-list/traineeassessmenttrainee-list.component';
import { TraineeAssessmentMarkByTraineeListComponent } from './traineeassessmentcreate/traineeassessmentmarkbytrainee-list/traineeassessmentmarkbytrainee-list.component';


@NgModule({
  declarations: [
    TraineeAssessmentMarkListComponent,
    NewTraineeAssessmentMarkComponent,
    TraineeAssessmentCreateListComponent,
    NewTraineeAssessmentCreateComponent,
    NewAssessmentGroupComponent,
    TraineeAssessmentTraineeListComponent,
    TraineeAssessmentMarkByTraineeListComponent
  ],
  imports: [
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
    TraineeAssessmentRoutingModule,
    MatAutocompleteModule,
    MatCheckboxModule
  ]
})
export class TraineeAssessmentModule { }

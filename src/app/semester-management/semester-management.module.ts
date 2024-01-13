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
import { SemesterManagementRoutingModule } from './semester-management-routing.module';
import { NewBnasemesterdurationComponent } from './semesterduration/new-bnasemesterduration/new-bnasemesterduration.component';
import { BnasemesterdurationListComponent } from './semesterduration/bnasemesterduration-list/bnasemesterduration-list.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { NewcoursesubjectsectionasignComponent } from './traineenomination/new-coursesubjectsectionasign/new-coursesubjectsectionasign.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    NewBnasemesterdurationComponent,
    BnasemesterdurationListComponent,
    TraineeNominationListComponent,
    NewTraineeNominationComponent,
    NewcoursesubjectsectionasignComponent,
  ],
  imports: [
    CommonModule,
    SemesterManagementRoutingModule,
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
export class SemesterManagementModule { }

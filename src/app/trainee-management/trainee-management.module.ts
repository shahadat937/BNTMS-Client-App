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

import { TraineeManagementRoutingModule } from './trainee-management-routing.module';
import { BnaCurriculumUpdateListComponent } from './bnacurriculumupdate/bnacurriculumupdate-list/bnacurriculumupdate-list.component';
import { NewBnaCurriculumUpdateComponent } from './bnacurriculumupdate/new-bnacurriculumupdate/new-bnacurriculumupdate.component';

import { TraineeSectionSelectionListComponent } from './traineesectionselection/traineesectionselection-list/traineesectionselection-list.component';
import { NewTraineeSectionSelectionComponent } from  './traineesectionselection/new-traineesectionselection/new-traineesectionselection.component';

@NgModule({
  declarations: [
    BnaCurriculumUpdateListComponent,
    NewBnaCurriculumUpdateComponent,
    TraineeSectionSelectionListComponent,
    NewTraineeSectionSelectionComponent
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
    TraineeManagementRoutingModule
  ]
})
export class TraineeManagementModule { }

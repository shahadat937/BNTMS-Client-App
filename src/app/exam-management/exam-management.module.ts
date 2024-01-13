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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ExamManagementRoutingModule } from './exam-management-routing.module';
import { BNAExamMarkListComponent } from './bnaexammark/bnaexammark-list/bnaexammark-list.component';
import { NewBNAExamMarkComponent } from './bnaexammark/new-bnaexammark/new-bnaexammark.component';

import { BnaClassTestListComponent } from './bnaclasstest/bnaclasstest-list/bnaclasstest-list.component';
import { NewBnaClassTestComponent } from './bnaclasstest/new-bnaclasstest/new-bnaclasstest.component';
import { BNAExamMarkApproveComponent } from './bnaexammark/bnaexammark-approve/bnaexammark-approve.component';

import { BNAExamInstructorAssignListComponent } from './bnaexaminstructorassign/bnaexaminstructorassign-list/bnaexaminstructorassign-list.component';
import { NewBNAExamInstructorAssignComponent } from './bnaexaminstructorassign/new-bnaexaminstructorassign/new-bnaexaminstructorassign.component';
import {NewBnaExammarkinstructor} from './bnaexammark/new-bnaexammarkinstructor/new-bnaexammarkinstructor.component'
import { ExamApproveComponent } from './bnaexammark/examapprove-list/examapprove-list.component';
import {NewReExamMarkComponent} from './bnaexammark/new-reexammark/new-reexammark.component';
import { NewReExamComponent } from './bnaexammark/new-reexam/new-reexam.component';
import {NewAssignmentMarkComponent} from './bnaexammark/new-assignmentmark/new-assignmentmark.component';


@NgModule({
  declarations: [
    BNAExamMarkListComponent,
    NewBNAExamMarkComponent,
    BNAExamMarkApproveComponent,
    BnaClassTestListComponent,
    NewBnaClassTestComponent,
    BNAExamInstructorAssignListComponent,
    NewBNAExamInstructorAssignComponent,
    NewBnaExammarkinstructor,
    ExamApproveComponent,
    NewReExamMarkComponent,
    NewReExamComponent,
    NewAssignmentMarkComponent
  ],
  imports: [
    CommonModule,
    ExamManagementRoutingModule,
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
    MaterialFileInputModule  ,
    MatAutocompleteModule
  ]
})
export class ExamManagementModule { }

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

import { TeachersEvaluationRoutingModule } from './teachers-evaluation-routing.module';
import { TdecActionStatusListComponent } from './tdecactionstatus/tdecactionstatus-list/tdecactionstatus-list.component';
import { NewTdecActionStatusComponent } from './tdecactionstatus/new-tdecactionstatus/new-tdecactionstatus.component';
import { TdecQuestionNameListComponent } from './tdecquestionname/tdecquestionname-list/tdecquestionname-list.component';
import { NewTdecQuestionNameComponent } from './tdecquestionname/new-tdecquestionname/new-tdecquestionname.component';
import { TdecQuationGroupListComponent } from './tdecquationgroup/tdecquationgroup-list/tdecquationgroup-list.component';
import { NewTdecQuationGroupComponent } from './tdecquationgroup/new-tdecquationgroup/new-tdecquationgroup.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
     TdecActionStatusListComponent,
     NewTdecActionStatusComponent,
     TdecQuestionNameListComponent,
     NewTdecQuestionNameComponent,
     TdecQuationGroupListComponent,
     NewTdecQuationGroupComponent,
  ],
  imports: [
    CommonModule,
    TeachersEvaluationRoutingModule,
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
export class TeachersEvaluationModule { }

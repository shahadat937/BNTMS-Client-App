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
import { MISTCourseRoutingModule } from './mist-course-routing.module';
import { MistListComponent } from './mist/mist-list/mist-list.component';
import { NewMistComponent } from './mist/new-mist/new-mist.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';

// import { BnaClassTestListComponent } from './bnaclasstest/bnaclasstest-list/bnaclasstest-list.component';
// import { NewBnaClassTestComponent } from './bnaclasstest/new-bnaclasstest/new-bnaclasstest.component';

@NgModule({
  declarations: [
    MistListComponent,
    NewMistComponent,
    TraineeNominationListComponent,
    NewTraineeNominationComponent,
  ],
  imports: [
    CommonModule,
    MISTCourseRoutingModule,
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
export class MISTCourseModule { }

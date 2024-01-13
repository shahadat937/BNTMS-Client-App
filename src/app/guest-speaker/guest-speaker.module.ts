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
import { GuestSpeakerRoutingModule } from './guest-speaker-routing.module';
import { NewGuestSpeakerQuationGroupComponent } from './guestspeakerquationgroup/new-guestspeakerquationgroup/new-guestspeakerquationgroup.component';
import { NewGuestSpeakerActionStatusComponent } from './guestspeakeractionstatus/new-guestspeakeractionstatus/new-guestspeakeractionstatus.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewGuestSpeakerQuestionNameComponent } from './guestspeakerquestionname/new-guestspeakerquestionname/new-guestspeakerquestionname.component';
import { GuestSpeakerQuationGroupListComponent } from './guestspeakerquationgroup/guestspeakerquationgroup-list/guestspeakerquationgroup-list.component';

@NgModule({
  declarations: [
    NewGuestSpeakerQuationGroupComponent,
    NewGuestSpeakerActionStatusComponent,
    NewGuestSpeakerQuestionNameComponent,
    GuestSpeakerQuationGroupListComponent
    //  TdecQuestionNameListComponent,
    //  NewTdecQuestionNameComponent,
    //  TdecQuationGroupListComponent,
    //  NewTdecQuationGroupComponent,
  ],
  imports: [
    CommonModule,
    GuestSpeakerRoutingModule,
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
export class GuestSpeakerModule { }

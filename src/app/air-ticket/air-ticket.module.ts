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
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AirTicketRoutingModule } from './air-ticket-routing.module';
import { ForeignCourseGOInfoListComponent } from './foreigncoursegoinfo/foreigncoursegoinfo-list/foreigncoursegoinfo-list.component';
import { NewForeignCourseGOInfoComponent } from './foreigncoursegoinfo/new-foreigncoursegoinfo/new-foreigncoursegoinfo.component'
import { ForeignCourseOtherDocListComponent } from './foreigncourseotherdoc/foreigncourseotherdoc-list/foreigncourseotherdoc-list.component';
import { NewForeignCourseOtherDocComponent } from './foreigncourseotherdoc/new-foreigncourseotherdoc/new-foreigncourseotherdoc.component';
import {NewForeignCourseOtherDocumentComponent} from './foreigncourseotherdocument/new-foreigncourseotherdocument/new-foreigncourseotherdocument.component'
import {ForeignCourseOtherDocumentComponent} from './foreigncourseotherdocument/foreigncourseotherdocument-list/foreigncourseotherdocument-list.component'
//import {ForeignCourseDocTypeListComponent} from './foreigncoursedoctype/foreigncoursedoctype-list/foreigncoursedoctype-list.component'
//import {NewForeignCourseDocTypeComponent} from './foreigncoursedoctype/new-foreigncoursedoctype/new-foreigncoursedoctype.component'

@NgModule({
  declarations: [
    ForeignCourseGOInfoListComponent,
    NewForeignCourseGOInfoComponent,
    ForeignCourseOtherDocListComponent,
    NewForeignCourseOtherDocComponent,
    NewForeignCourseOtherDocumentComponent,
    ForeignCourseOtherDocumentComponent,
    // ForeignCourseDocTypeListComponent,
    // NewForeignCourseDocTypeComponent
  ],
  imports: [
    CommonModule,
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
    AirTicketRoutingModule,
    MatAutocompleteModule,
    MatCheckboxModule,
  ]
})
export class AirTicketModule { }

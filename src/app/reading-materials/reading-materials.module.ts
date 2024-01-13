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
import { ReadingMaterialsRoutingModule } from './reading-materials-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ReadingMaterialListComponent } from './readingmaterial/readingmaterial-list/readingmaterial-list.component';
import { NewReadingMaterialComponent } from './readingmaterial/new-readingmaterial/new-readingmaterial.component';
import { ReadingmaterialtitleListComponent } from './readingmaterialtitle/readingmaterialtitle-list/readingmaterialtitle-list.component';
import {NewReadingmaterialtitleComponent} from './readingmaterialtitle/new-readingmaterialtitle/new-readingmaterialtitle.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {LoaderComponent} from './readingmaterial/loader/loader.component';

@NgModule({
  declarations: [
    ReadingMaterialListComponent,
    NewReadingMaterialComponent,
    ReadingmaterialtitleListComponent,
    NewReadingmaterialtitleComponent,
    LoaderComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    MatDialogModule,
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
    ReadingMaterialsRoutingModule,
    MatAutocompleteModule
  ]
})
export class ReadingMaterialsModule { }

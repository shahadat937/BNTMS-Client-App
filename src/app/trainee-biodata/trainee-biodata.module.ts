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
import { TraineeBiodataRoutingModule } from './trainee-biodata-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewEntryEvaluationListComponent } from './newentryevaluation/newentryevaluation-list/newentryevaluation-list.component';
import { NewNewEntryEvaluationComponent } from './newentryevaluation/new-newentryevaluation/new-newentryevaluation.component'
import { ForeignBIODataInfoListComponent } from './foreignbiodatainfo/foreignbiodatainfo-list/foreignbiodatainfo-list.component';
import { NewForeignBIODataInfoComponent } from './foreignbiodatainfo/new-foreignbiodatainfo/new-foreignbiodatainfo.component';
import {TraineeListComponent} from './trainee-profile-update/trainee-list/trainee-list.component'
//import {NewTraineeBiodatasComponent} from './trainee-profile-update/new-newtraineebiodata/new-newtraineebiodatas.component'
import {NewBIODataGeneralInfosComponent} from './trainee-profile-update/new-biodata-general-info/new-biodata-general-infos.component'
import {CivilInstructorBioDataInfoListComponent} from './civil-instructor-biodata/civilinstructorbiodata-list/civilinstructorbiodata-list.component';
import {NewCivilInstructorBioDataInfoComponent} from './civil-instructor-biodata/new-civilinstructorbiodata/new-civilinstructorbiodata.component';
import {NewBiodataGeneralInfoJstiComponent} from './trainee-profile-update/new-biodata-general-info-jsti/new-biodata-general-info-jsti.component'


@NgModule({
  declarations: [
    NewEntryEvaluationListComponent,
    NewNewEntryEvaluationComponent,
    ForeignBIODataInfoListComponent,
    NewForeignBIODataInfoComponent,
    TraineeListComponent,
    NewBIODataGeneralInfosComponent,
    CivilInstructorBioDataInfoListComponent,
    NewCivilInstructorBioDataInfoComponent,
    NewBiodataGeneralInfoJstiComponent
    // NewTraineeBiodatasComponent
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
    TraineeBiodataRoutingModule,
    MatAutocompleteModule
  ]
})
export class TraineeBiodataModule { }

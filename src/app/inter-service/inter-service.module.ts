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

 import { InterservicecourseListComponent } from './interservicecourse/interservicecourse-list/interservicecourse-list.component';
 import { NewInterservicecourseComponent } from './interservicecourse/new-interservicecourse/new-interservicecourse.component';

import { DocumentListComponent } from './document/document-list/document-list.component';
import { NewDocumentComponent } from './document/new-document/new-document.component';

import { BnaSubjectNameListComponent } from './bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBnaSubjectNameComponent } from './bnasubjectname/new-bnasubjectname/new-bnasubjectname.component';

import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';

import { InterServiceRoutingModule } from './inter-service-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InterServiceMarkListComponent } from './interservicemark/interservicemark-list/interservicemark-list.component';
import { NewInterServiceMarkComponent } from './interservicemark/new-interservicemark/new-interservicemark.component';
import { OrganizationNameListComponent } from './organizationname/organizationname-list/organizationname-list.component';
import { NewOrganizationNameComponent } from './organizationname/new-organizationname/new-organizationname.component';
import { InterServiceCourseDocTypeListComponent } from './interservicecoursedoctype/interservicecoursedoctype-list/interservicecoursedoctype-list.component';
import { NewInterServiceCourseDocTypeComponent} from './interservicecoursedoctype/new-interservicecoursedoctype/new-interservicecoursedoctype.component';

import { NewInterserviceReportComponent } from './Interservicereport/new-Interservicereport/new-Interservicereport.component';
import { InterserviceReportListComponent } from './Interservicereport/Interservicereport-list/Interservicereport-list.component';

@NgModule({
  declarations: [
    InterservicecourseListComponent,
    NewInterservicecourseComponent,
    DocumentListComponent,
    NewDocumentComponent,
    BnaSubjectNameListComponent,
    NewBnaSubjectNameComponent,
    TraineeNominationListComponent,
    NewTraineeNominationComponent,
    InterServiceMarkListComponent,
    NewInterServiceMarkComponent,
    OrganizationNameListComponent,
    NewOrganizationNameComponent,
    InterServiceCourseDocTypeListComponent,
    NewInterServiceCourseDocTypeComponent,
    NewInterserviceReportComponent,
    InterserviceReportListComponent
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
    InterServiceRoutingModule,
    MatAutocompleteModule
  ]
})
export class InterServiceModule { }

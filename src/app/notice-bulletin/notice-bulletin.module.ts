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
import { MatCheckboxModule } from '@angular/material/checkbox';

import { NoticeBulletinRoutingModule } from './notice-bulletin-routing.module';

import { BulletinListComponent } from './bulletin/bulletin-list/bulletin-list.component';
import { NewBulletinComponent } from './bulletin/new-bulletin/new-bulletin.component';
import {NewNoticeComponent} from './notice/new-notice/new-notice.component';
import {NoticeListComponent} from './notice/notice-list/notice-list.component';
import {IndividualNoticeComponent} from './individualnotice/new-individualnotice/new-individualnotice.component';
import {IndividualBulletinComponent} from './individualbulletin/new-individualbulletin/new-individualbulletin.component';

import { EventListComponent } from './event/event-list/event-list.component';
import { NewEventComponent } from './event/new-event/new-event.component';
import { NewSchoolNoticeComponent } from './school-notice/new-notice/new-school-notice.component';


@NgModule({
  declarations: [
    BulletinListComponent,
    NewBulletinComponent,
    NewNoticeComponent,
    NoticeListComponent,
    IndividualNoticeComponent,
    EventListComponent,
    NewEventComponent,
    IndividualBulletinComponent,
    NewSchoolNoticeComponent
  ],
  imports: [
    CommonModule,
    NoticeBulletinRoutingModule,
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
    MatCheckboxModule
  ]
})
export class NoticeBulletinModule { }

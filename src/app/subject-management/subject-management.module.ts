import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BNASubjectNameListComponent } from './bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBNASubjectNameComponent } from './bnasubjectname/new-bnasubjectname/new-bnasubjectname.component';
import { SubjectManagementRoutingModule } from './subject-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NewSubjectnameComponent } from './subjectname/new-subjectname/new-subjectname.component';
import { SubjectnameListComponent } from './subjectname/subjectname-list/subjectname-list.component';
import { SubjectMarkListComponent } from './subjectmark/subjectmark-list/subjectmark-list.component';
import { NewSubjectMarkComponent } from './subjectmark/new-subjectmark/new-subjectmark.component';
import { CourseInstructorListComponent } from './courseinstructor/courseinstructor-list/courseinstructor-list.component';
import { NewCourseInstructorComponent } from './courseinstructor/new-courseinstructor/new-courseinstructor.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NewSubjectnameforBnaComponent } from './subjectnameforbna/new-subjectnameforbna/new-subjectnameforbna.component';
import { NewBnaSubjectMarkComponent } from './bnasubjectmark/new-bnasubjectmark/new-bnasubjectmark.component';
import { BnaSubjectMarkListComponent } from './bnasubjectmark/bnasubjectmark-list/bnasubjectmark-list.component';
import { BnaCourseInstructorListComponent } from './bnacourseinstructor/bnacourseinstructor-list/bnacourseinstructor-list.component';
import { NewBnaCourseInstructorComponent } from './bnacourseinstructor/new-bnacourseinstructor/new-bnacourseinstructor.component';



@NgModule({
  declarations: [
    BNASubjectNameListComponent,
    NewBNASubjectNameComponent,
    NewSubjectnameComponent,
    SubjectnameListComponent,
    SubjectMarkListComponent,
    NewSubjectMarkComponent,
    CourseInstructorListComponent,
    NewCourseInstructorComponent,
    NewSubjectnameforBnaComponent,
    BnaSubjectMarkListComponent,
    NewBnaSubjectMarkComponent,
    BnaCourseInstructorListComponent,
    NewBnaCourseInstructorComponent
  ],
  imports: [
    CommonModule,
    SubjectManagementRoutingModule,
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
    MatAutocompleteModule,
    MaterialFileInputModule,
    MatCheckboxModule
  ]
})
export class SubjectManagementModule { }

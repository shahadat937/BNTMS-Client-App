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
import {BudgetAllocationListComponent} from './budgetallocation/budgetallocation-list/budgetallocation-list.component';
import {NewCourseBudgetAllocationComponent} from './coursebudgetallocation/new-coursebudgetallocation/new-coursebudgetallocation.component';
import {CourseBudgetAllocationListComponent} from './coursebudgetallocation/coursebudgetallocation-list/coursebudgetallocation-list.component';
import { BudgetManagementRoutingModule } from './budget-management-routing.module';
import {NewBudgetAllocationComponent} from './budgetallocation/new-budgetallocation/new-budgetallocation.component';
import {ScheduleInstallmentListComponent} from './scheduleinstallment/scheduleinstallment-list/scheduleinstallment-list.component';

@NgModule({
  declarations: [
    NewCourseBudgetAllocationComponent,
    CourseBudgetAllocationListComponent,
    NewBudgetAllocationComponent,
    BudgetAllocationListComponent,
    ScheduleInstallmentListComponent
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
    BudgetManagementRoutingModule,
    MatAutocompleteModule,
    MatCheckboxModule,
  ]
})
export class BudgetManagementModule { }

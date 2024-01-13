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

import { AllowanceManagementRoutingModule } from './allowance-management-routing.module';
import { CountryListComponent } from './country/country-list/country-list.component';
import { NewcountryComponent } from './country/new-country/new-country.component';
import { AllowancePercentageListComponent } from './allowancepercentage/allowancepercentage-list/allowancepercentage-list.component';
import { NewAllowancePercentageComponent } from './allowancepercentage/new-allowancepercentage/new-allowancepercentage.component';
import { AllowanceCategoryListComponent } from './allowancecategory/allowancecategory-list/allowancecategory-list.component';
import { NewAllowanceCategoryComponent } from './allowancecategory/new-allowancecategory/new-allowancecategory.component';
import { AllowanceListComponent  } from './allowance/allowance-list/allowance-list.component';
import { NewAllowanceComponent } from './allowance/new-allowance/new-allowance.component';
@NgModule({
  declarations: [
    CountryListComponent,
    NewcountryComponent,
    AllowancePercentageListComponent,
    NewAllowancePercentageComponent,
    AllowanceCategoryListComponent,
    NewAllowanceCategoryComponent,
    AllowanceListComponent,
    NewAllowanceComponent,
  ],
  imports: [
    CommonModule,
    AllowanceManagementRoutingModule,
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
    MaterialFileInputModule  
  ]
})
export class AllowanceManagementModule { }

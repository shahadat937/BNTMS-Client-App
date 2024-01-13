import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryListComponent } from './country/country-list/country-list.component';
import { NewcountryComponent } from './country/new-country/new-country.component';

import { AllowancePercentageListComponent } from './allowancepercentage/allowancepercentage-list/allowancepercentage-list.component';
import { NewAllowancePercentageComponent } from './allowancepercentage/new-allowancepercentage/new-allowancepercentage.component';
import { AllowanceCategoryListComponent } from './allowancecategory/allowancecategory-list/allowancecategory-list.component';
import { NewAllowanceCategoryComponent } from './allowancecategory/new-allowancecategory/new-allowancecategory.component';
import { AllowanceListComponent } from './allowance/allowance-list/allowance-list.component';
import { NewAllowanceComponent } from './allowance/new-allowance/new-allowance.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  

  {
    path: 'country-list', 
    component: CountryListComponent,
  },
  { path: 'update-country/:countryId',  
  component: NewcountryComponent, 
  },
  {
    path: 'add-country',
    component: NewcountryComponent,
  },

  {
    path: 'allowancepercentage-list', 
    component: AllowancePercentageListComponent,
  },
  { path: 'update-allowancepercentage/:allowancePercentageId',  
  component: NewAllowancePercentageComponent, 
  },
  {
    path: 'add-allowancepercentage',
    component: NewAllowancePercentageComponent,
  },

  {
    path: 'allowancecategory-list', 
    component: AllowanceCategoryListComponent,
  },
  { path: 'update-allowancecategory/:allowanceCategoryId',  
  component: NewAllowanceCategoryComponent, 
  },
  {
    path: 'add-allowancecategory',
    component: NewAllowanceCategoryComponent,
  },

  {
    path: 'allowance-list', 
    component: AllowanceListComponent,
  },
  { path: 'update-allowance/:allowanceId',  
  component: NewAllowanceComponent, 
  },
  {
    path: 'add-allowance',
    component: NewAllowanceComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllowanceManagementRoutingModule { }

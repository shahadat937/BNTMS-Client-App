import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'sailor-biodata-tab',
  //   loadChildren: () =>
  //     import('./sailor-biodata-tab-layout/sailor-biodata-tab-layout.module').then(
  //       (m) => m.SailorTabModule
  //     ),
  // },
  {
    path: 'trainee-biodata-tab',
    loadChildren: () =>
      import('./biodata-tab-layout/biodata-tab-layout.module').then(
        (m) => m.TabModule
      ),
  },
  
  // {
  //   path: 'newentryevaluation-list',
  //   component: NewEntryEvaluationListComponent,
  // },
  // { path: 'update-newentryevaluation/:newEntryEvaluationId', 
  // component: NewNewEntryEvaluationComponent 
  // },
  // {
  //   path: 'add-newentryevaluation',
  //   component: NewNewEntryEvaluationComponent,
  // },

];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BNATraineeBiodataRoutingModule { }

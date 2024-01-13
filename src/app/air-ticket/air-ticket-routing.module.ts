import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForeignCourseGOInfoListComponent } from './foreigncoursegoinfo/foreigncoursegoinfo-list/foreigncoursegoinfo-list.component';
import { NewForeignCourseGOInfoComponent } from './foreigncoursegoinfo/new-foreigncoursegoinfo/new-foreigncoursegoinfo.component';
import { ForeignCourseOtherDocListComponent } from './foreigncourseotherdoc/foreigncourseotherdoc-list/foreigncourseotherdoc-list.component';
import { NewForeignCourseOtherDocComponent } from './foreigncourseotherdoc/new-foreigncourseotherdoc/new-foreigncourseotherdoc.component';
import {NewForeignCourseOtherDocumentComponent} from './foreigncourseotherdocument/new-foreigncourseotherdocument/new-foreigncourseotherdocument.component'
import {ForeignCourseOtherDocumentComponent} from './foreigncourseotherdocument/foreigncourseotherdocument-list/foreigncourseotherdocument-list.component'
import { ForeignTrainingCourseReportListComponent } from '../foreign-training/foreigntrainingcoursereport/foreigntrainingcoursereport-list/foreigntrainingcoursereport-list.component';
//import {ForeignCourseDocTypeListComponent} from './foreigncoursedoctype/foreigncoursedoctype-list/foreigncoursedoctype-list.component'
//import {NewForeignCourseDocTypeComponent} from './foreigncoursedoctype/new-foreigncoursedoctype/new-foreigncoursedoctype.component'
const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  // {
  //   path: 'coursebudgetallocation-list', 
  //   component: CourseBudgetAllocationListComponent,
  // },
  // { path: 'update-coursebudgetallocation/:courseBudgetAllocationId',  
  // component: NewCourseBudgetAllocationComponent, 
  // },
  // {air-ticket/foreigncourseotherdocument-list
  //   path: 'add-coursebudgetallocation',
  //   component: NewCourseBudgetAllocationComponent,
  // },
  {
    path: 'foreigncourseotherdocument-list', 
    component: ForeignCourseOtherDocumentComponent,
  },
  { path: 'update-foreigncourseotherdocument/:foreignCourseOthersDocumentId',  
  component: NewForeignCourseOtherDocumentComponent, 
  },
  {
    path: 'add-foreigncourseotherdocument',
    component: NewForeignCourseOtherDocumentComponent,
  }, 
  {
    path: 'foreigntrainingcoursereport-list', 
    component: ForeignTrainingCourseReportListComponent,
  },
  // {
  //   path: 'foreigncoursedoctype-list', 
  //   component: ForeignCourseDocTypeListComponent,
  // },
  // { path: 'update-coursebudgetallocation/:foreignCourseDocTypeId',  
  // component: NewForeignCourseDocTypeComponent, 
  // },
  // {
  //   path: 'add-foreigncoursedoctype',
  //   component: NewForeignCourseDocTypeComponent,
  // },

  {
    path: 'foreigncoursegoinfo-list', 
    component: ForeignCourseGOInfoListComponent,
  },
  { path: 'update-foreigncoursegoinfo/:foreignCourseGOInfoId',  
  component: NewForeignCourseGOInfoComponent, 
  },
  {
    path: 'add-foreigncoursegoinfo',
    component: NewForeignCourseGOInfoComponent,
  }, 

  {
    path: 'foreigncourseotherdoc-list', 
    component: ForeignCourseOtherDocListComponent,
  },
  { path: 'update-foreigncourseotherdoc/:foreignCourseOtherDocId',  
  component: NewForeignCourseOtherDocComponent, 
  },
  {
    path: 'add-foreigncourseotherdoc',
    component: NewForeignCourseOtherDocComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirTicketRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrganizationNameComponent } from '../inter-service/organizationname/new-organizationname/new-organizationname.component';
import { OrganizationNameListComponent } from '../inter-service/organizationname/organizationname-list/organizationname-list.component';
import { BnaSubjectNameListComponent } from '../inter-service/bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBnaSubjectNameComponent } from '../inter-service/bnasubjectname/new-bnasubjectname/new-bnasubjectname.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { NewDocumentComponent } from './document/new-document/new-document.component';
import { InterservicecourseListComponent } from './interservicecourse/interservicecourse-list/interservicecourse-list.component';
import { NewInterservicecourseComponent } from './interservicecourse/new-interservicecourse/new-interservicecourse.component';
import { InterServiceMarkListComponent } from './interservicemark/interservicemark-list/interservicemark-list.component';
import { NewInterServiceMarkComponent } from './interservicemark/new-interservicemark/new-interservicemark.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { InterServiceCourseDocTypeListComponent } from './interservicecoursedoctype/interservicecoursedoctype-list/interservicecoursedoctype-list.component';
import { NewInterServiceCourseDocTypeComponent } from './interservicecoursedoctype/new-interservicecoursedoctype/new-interservicecoursedoctype.component';

import { NewInterserviceReportComponent } from './Interservicereport/new-Interservicereport/new-Interservicereport.component';
import { InterserviceReportListComponent } from './Interservicereport/Interservicereport-list/Interservicereport-list.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  {
    path: 'interservicecourse-list', 
    component: InterservicecourseListComponent,
  },
  { path: 'update-interservicecourse/:courseDurationId',  
  component: NewInterservicecourseComponent, 
  },
  {
    path: 'add-interservicecourse/:courseTypeId',
    component: NewInterservicecourseComponent,
  },

  {
    path: 'interservicecoursereport-list', 
    component: InterserviceReportListComponent,
  },
  
  {
    path: 'view-interservicereportsubmit/:traineeId/:courseNameId/:courseDurationId', 
    component: NewInterserviceReportComponent,
  },
  
  { path: 'update-interservicecoursereport/:interServiceCourseReportid',  
  component: NewInterserviceReportComponent, 
  },
  {
    path: 'add-interservicecoursereport',
    component: NewInterserviceReportComponent,
  },


  {
    path: 'document-list', 
    component: DocumentListComponent,
  },
  { path: 'update-document/:documentId',  
  component: NewDocumentComponent, 
  },
  {
    path: 'add-document',
    component: NewDocumentComponent,
  },

  {
    path: 'bnasubjectname-list', 
    component: BnaSubjectNameListComponent,
  },
  { path: 'update-bnasubjectname/:bnaSubjectNameId',  
  component: NewBnaSubjectNameComponent, 
  },
  {
    path: 'add-bnasubjectname',
    component: NewBnaSubjectNameComponent,
  },

  {
    path: 'traineenomination-list/:courseDurationId', 
    component: TraineeNominationListComponent,
  },
  { path: 'update-traineenomination/:traineeNominationId',  
  component: NewTraineeNominationComponent, 
  },
  { path: 'add-traineenomination/:courseDurationId/:courseNameId',   
  component: NewTraineeNominationComponent, 
  },
  {
    path: 'add-traineenomination',
    component: NewTraineeNominationComponent,
  },

  // {
  //   path: 'interservicemark-list', 
  //   component: InterServiceMarkListComponent,
  // },
  { path: 'update-interservicemark/:interServiceMarkId',  
  component: NewInterServiceMarkComponent, 
  },
  {
    path: 'add-interservicemark',
    component: NewInterServiceMarkComponent,
  },

  {
    path: 'organizationname-list', 
    component: OrganizationNameListComponent,
  },
  { path: 'update-organizationname/:organizationNameId',  
  component: NewOrganizationNameComponent, 
  },
  {
    path: 'add-organizationname',
    component: NewOrganizationNameComponent,
  },

  {
    path: 'interservicecoursedoctype-list', 
    component: InterServiceCourseDocTypeListComponent,
  },
  { path: 'update-interservicecoursedoctype/:interServiceCourseDocTypeId',  
  component: NewInterServiceCourseDocTypeComponent, 
  },
  {
    path: 'add-interservicecoursedoctype',
    component: NewInterServiceCourseDocTypeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterServiceRoutingModule { }

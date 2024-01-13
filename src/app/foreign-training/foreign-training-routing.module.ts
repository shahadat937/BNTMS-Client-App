import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentDetailListComponent } from './paymentdetail/paymentdetail-list/paymentdetail-list.component';
import { NewPaymentDetailComponent } from './paymentdetail/new-paymentdetail/new-paymentdetail.component';
import { MigrationDocumentListComponent } from './migrationdocument/migrationdocument-list/migrationdocument-list.component';
import { NewMigrationDocumentComponent } from './migrationdocument/new-migrationdocument/new-migrationdocument.component';
import { InstallmentPaidDetailListComponent } from './installmentpaiddetail/installmentpaiddetail-list/installmentpaiddetail-list.component';
import { NewInstallmentPaidDetailComponent } from './installmentpaiddetail/new-installmentpaiddetail/new-installmentpaiddetail.component';
import { FamilyNominationListComponent } from './familynomination/familynomination-list/familynomination-list.component';
import { NewFamilyNominationComponent } from './familynomination/new-familynomination/new-familynomination.component';
import { ForeigncourseListComponent } from './foreigncourse/foreigncourse-list/foreigncourse-list.component';
import { NewForeigncourseComponent } from './foreigncourse/new-foreigncourse/new-foreigncourse.component';
import { ForeignTraineeNominationListComponent } from './foreigntraineenomination/traineenomination-list/foreigntraineenomination-list.component';
import { NewForeignTraineeNominationComponent } from './foreigntraineenomination/new-traineenomination/new-foreigntraineenomination.component';
import { FamilyInfoListComponent } from './familyinfo/familyinfo-list/familyinfo-list.component';
import { NewFamilyInfoComponent } from './familyinfo/new-familyinfo/new-familyinfo.component';
import { NewInterServiceMarkComponent } from './interservicemark/new-interservicemark/new-interservicemark.component';
import {NewBudgetAllocationComponent} from './budgetallocation/new-budgetallocation/new-budgetallocation.component';
import {BudgetAllocationListComponent} from './budgetallocation/budgetallocation-list/budgetallocation-list.component';
import {NewCourseBudgetAllocationComponent} from './coursebudgetallocation/new-coursebudgetallocation/new-coursebudgetallocation.component';
import {CourseBudgetAllocationListComponent} from './coursebudgetallocation/coursebudgetallocation-list/coursebudgetallocation-list.component';
import { ForeignTrainingCourseReportListComponent } from './foreigntrainingcoursereport/foreigntrainingcoursereport-list/foreigntrainingcoursereport-list.component';
import { RunningCoursForeignRraineecountListComponent } from './runningcoursforeigntraineecount/runningcoursforeigntraineecount-list.component';
import { RunningCoursForeignRraineecountDetailsListComponent } from './runningcoursforeigntraineecountdetails/runningcoursforeigntraineecountdetails-list.component';
import { RunningCourseForeignRraineeUpcomingListComponent } from './runningcourseforeigntraineeupcoming/runningcourseforeigntraineeupcoming-list.component';
// import {ForeignCourseDocTypeListComponent} from './foreigncoursedoctype/foreigncoursedoctype-list/foreigncoursedoctype-list.component'
// import {NewForeignCourseDocTypeComponent} from './foreigncoursedoctype/new-foreigncoursedoctype/new-foreigncoursedoctype.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },



  
  {
    path: 'coursebudgetallocation-list', 
    component: CourseBudgetAllocationListComponent,
  },
  { path: 'update-coursebudgetallocation/:courseBudgetAllocationId',  
  component: NewCourseBudgetAllocationComponent, 
  },
  {
    path: 'add-coursebudgetallocation',
    component: NewCourseBudgetAllocationComponent,
  },

  // {
  //   path: 'foreigntraineenomination-list/:courseTypeid',
  //   component: NewCourseBudgetAllocationComponent,
  // },

  {
    path: 'budgetallocation-list', 
    component: BudgetAllocationListComponent,
  },
  { path: 'update-budgetallocation/:budgetAllocationId',  
  component: NewBudgetAllocationComponent, 
  },
  {
    path: 'add-budgetallocation',
    component: NewBudgetAllocationComponent,
  },


  {
    path: 'familynomination-list', 
    component: FamilyNominationListComponent,
  },
  { path: 'update-familynomination/:familyNominationId',  
  component: NewFamilyNominationComponent, 
  },
  {
    path: 'add-familynomination/:courseDurationId/:traineeId',
    component: NewFamilyNominationComponent,
  },

  {
    path: 'paymentdetail-list', 
    component: PaymentDetailListComponent,
  },
  { path: 'update-paymentdetail/:paymentDetailId',  
  component: NewPaymentDetailComponent, 
  },
  {
    path: 'add-paymentdetail',
    component: NewPaymentDetailComponent,
  },

  {
    path: 'installmentpaiddetail-list/:courseDurationId/:traineeId', 
    component: InstallmentPaidDetailListComponent,
  },
  { path: 'update-installmentpaiddetail/:installmentPaidDetailId',  
  component: NewInstallmentPaidDetailComponent, 
  },
  {
    path: 'add-installmentpaiddetail/:courseDurationId/:traineeId',
    component: NewInstallmentPaidDetailComponent,
  },

  {
    path: 'migrationdocument-list', 
    component: MigrationDocumentListComponent,
  },
  { path: 'update-migrationdocument/:migrationDocumentId',  
  component: NewMigrationDocumentComponent, 
  },
  {
    path: 'add-migrationdocument',
    component: NewMigrationDocumentComponent,
  },
  {
    path: 'foreigncourse-list',
    component: ForeigncourseListComponent,
  },
  { path: 'update-foreigncourse/:courseDurationId', 
  component: NewForeigncourseComponent 
  },
  {
    path: 'add-foreigncourse/:courseTypeId', 
    component: NewForeigncourseComponent, 
  },
  {
    path: 'foreigntraineenomination-list/:courseDurationId', 
    component: ForeignTraineeNominationListComponent,
  },
  { path: 'update-foreigntraineenomination/:traineeNominationId',  
  component: NewForeignTraineeNominationComponent, 
  },
  { path: 'add-foreigntraineenomination/:courseDurationId/:courseNameId',   
  component: NewForeignTraineeNominationComponent, 
  },
  {
    path: 'add-foreigntraineenomination/:courseDurationId',
    component: NewForeignTraineeNominationComponent,
  },

  {
    path: 'familyinfo-list',
    component: FamilyInfoListComponent,
  },
  { path: 'update-familyinfo/:familyInfoId', 
  component: NewFamilyInfoComponent
  },
  {
    path: 'add-familyinfo',
    component: NewFamilyInfoComponent,
  },
  { path: 'update-interservicemark/:interServiceMarkId',  
  component: NewInterServiceMarkComponent, 
  },
  {
    path: 'add-interservicemark',
    component: NewInterServiceMarkComponent,
  },

  {
    path: 'foreigntrainingcoursereport-list', 
    component: ForeignTrainingCourseReportListComponent,
  },
  // {
  //   path: 'runningcoursforeigntraineecount-list',
  //   component: RunningCoursForeignRraineecountListComponent,
  // },
  // {
  //   path: 'runningcoursforeigntraineedetails-list',
  //   component: RunningCoursForeignRraineecountDetailsListComponent,
  // },
  // {
  //   path: 'runningcourseforeigntraineeupcoming-list',
  //   component: RunningCourseForeignRraineeUpcomingListComponent,
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForeignTrainingRoutingModule { }

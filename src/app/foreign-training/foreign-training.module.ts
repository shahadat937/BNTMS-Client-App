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
import { PaymentDetailListComponent } from './paymentdetail/paymentdetail-list/paymentdetail-list.component';
import { NewPaymentDetailComponent } from './paymentdetail/new-paymentdetail/new-paymentdetail.component';
import { MigrationDocumentListComponent } from './migrationdocument/migrationdocument-list/migrationdocument-list.component';
import { NewMigrationDocumentComponent } from './migrationdocument/new-migrationdocument/new-migrationdocument.component';
import { InstallmentPaidDetailListComponent } from './installmentpaiddetail/installmentpaiddetail-list/installmentpaiddetail-list.component';
import { NewInstallmentPaidDetailComponent } from './installmentpaiddetail/new-installmentpaiddetail/new-installmentpaiddetail.component';
import { FamilyNominationListComponent } from './familynomination/familynomination-list/familynomination-list.component';
import { NewFamilyNominationComponent } from './familynomination/new-familynomination/new-familynomination.component';
import { ForeignTrainingRoutingModule } from './foreign-training-routing.module';
import { ForeigncourseListComponent } from './foreigncourse/foreigncourse-list/foreigncourse-list.component';
import { NewForeigncourseComponent } from './foreigncourse/new-foreigncourse/new-foreigncourse.component';
import { ForeignTraineeNominationListComponent } from './foreigntraineenomination/traineenomination-list/foreigntraineenomination-list.component';
import { NewForeignTraineeNominationComponent } from './foreigntraineenomination/new-traineenomination/new-foreigntraineenomination.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FamilyInfoListComponent } from './familyinfo/familyinfo-list/familyinfo-list.component';
import { NewFamilyInfoComponent } from './familyinfo/new-familyinfo/new-familyinfo.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { InterServiceMarkListComponent} from './interservicemark/interservicemark-list/interservicemark-list.component';
import { NewInterServiceMarkComponent } from './interservicemark/new-interservicemark/new-interservicemark.component';
import {NewBudgetAllocationComponent} from './budgetallocation/new-budgetallocation/new-budgetallocation.component';
import {BudgetAllocationListComponent} from './budgetallocation/budgetallocation-list/budgetallocation-list.component';
import {NewCourseBudgetAllocationComponent} from './coursebudgetallocation/new-coursebudgetallocation/new-coursebudgetallocation.component';
import {CourseBudgetAllocationListComponent} from './coursebudgetallocation/coursebudgetallocation-list/coursebudgetallocation-list.component';
import { NewForeignTrainingCourseReportComponent } from './foreigntrainingcoursereport/new-foreigntrainingcoursereport/new-foreigntrainingcoursereport.component';
import { ForeignTrainingCourseReportListComponent } from './foreigntrainingcoursereport/foreigntrainingcoursereport-list/foreigntrainingcoursereport-list.component';
import { RunningCoursForeignRraineecountListComponent } from './runningcoursforeigntraineecount/runningcoursforeigntraineecount-list.component';
import { RunningCoursForeignRraineecountDetailsListComponent } from './runningcoursforeigntraineecountdetails/runningcoursforeigntraineecountdetails-list.component';
import { RunningCourseForeignRraineeUpcomingListComponent } from './runningcourseforeigntraineeupcoming/runningcourseforeigntraineeupcoming-list.component';

@NgModule({
  declarations: [
    PaymentDetailListComponent,
    NewCourseBudgetAllocationComponent,
    CourseBudgetAllocationListComponent,
    NewPaymentDetailComponent,
    MigrationDocumentListComponent,
    NewMigrationDocumentComponent,
    InstallmentPaidDetailListComponent,
    NewInstallmentPaidDetailComponent,
    FamilyNominationListComponent,
    NewFamilyNominationComponent,
    ForeigncourseListComponent,
    NewForeigncourseComponent,
    ForeignTraineeNominationListComponent,
    NewForeignTraineeNominationComponent,
    FamilyInfoListComponent,
    NewFamilyInfoComponent,
    InterServiceMarkListComponent,
    NewInterServiceMarkComponent,
    NewBudgetAllocationComponent,
    BudgetAllocationListComponent,
    NewForeignTrainingCourseReportComponent,
    ForeignTrainingCourseReportListComponent,
    RunningCoursForeignRraineecountListComponent,
    RunningCoursForeignRraineecountDetailsListComponent,
    RunningCourseForeignRraineeUpcomingListComponent
    // ForeignCourseDocTypeListComponent,
    // NewForeignCourseDocTypeComponent
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
    ForeignTrainingRoutingModule,
    MatAutocompleteModule,
    MatCheckboxModule,
  ]
})
export class ForeignTrainingModule { }

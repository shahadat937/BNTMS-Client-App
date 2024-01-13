import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassRoutineListComponent } from './classroutine/classroutine-list/classroutine-list.component';
import { NewClassRoutineComponent } from './classroutine/new-classroutine/new-classroutine.component';
import { ClassPeriodListComponent } from './classperiod/classperiod-list/classperiod-list.component';
import { NewClassPeriodComponent } from './classperiod/new-classperiod/new-classperiod.component';

import { EditClassRoutineComponent } from './classroutine/edit-classroutine/edit-classroutine.component';

import { BNAExamScheduleListComponent } from './bnaexamschedule/bnaexamschedule-list/bnaexamschedule-list.component';
import { NewBNAExamScheduleComponent } from './bnaexamschedule/new-bnaexamschedule/new-bnaexamschedule.component';
import { BnaClassScheduleListComponent } from './bnaclassschedule/bnaclassschedule-list/bnaclassschedule-list.component';
import { NewBnaClassScheduleComponent } from './bnaclassschedule/new-bnaclassschedule/new-bnaclassschedule.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
 
  { path: 'edit-weeklyroutine/:baseSchoolNameId/:courseDurationId/:courseNameId/:courseWeekId', 
  component: EditClassRoutineComponent, 
  },

  {
    path: 'classroutine-list',
    component: ClassRoutineListComponent,
  },
  { path: 'update-classroutine/:classRoutineId', 
  component: NewClassRoutineComponent, 
  },
  {
    path: 'add-bnaclassroutine',
    component: NewClassRoutineComponent,
  },

  {
    path: 'classperiod-list',
    component: ClassPeriodListComponent,
  },
  { path: 'update-bnaclassperiod/:classPeriodId', 
  component: NewClassPeriodComponent 
  },
  {
    path: 'add-bnaclassperiod',
    component: NewClassPeriodComponent,
  },

  {
    path: 'bnaclassschedule-list',
    component: BnaClassScheduleListComponent,
  },
  { path: 'update-bnaclassschedule/:bnaClassScheduleId', 
  component: NewBnaClassScheduleComponent, 
  },
  {
    path: 'add-bnaclassschedule',
    component: NewBnaClassScheduleComponent,
  },

  {
    path: 'bnaexamschedule-list',
    component: BNAExamScheduleListComponent,
  },
  { path: 'update-bnaexamschedule/:bnaExamScheduleId', 
  component: NewBNAExamScheduleComponent, 
  },
  {
    path: 'add-bnaexamschedule',
    component: NewBNAExamScheduleComponent,
  },

  // { path: 'update-bnaexamschedule/:bnaExamScheduleId', 
  // component: NewBNAExamScheduleComponent, 
  // },
  // {
  //   path: 'add-bnaexamschedule',
  //   component: NewBNAExamScheduleComponent,
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BnaRoutineManagementRoutingModule { }

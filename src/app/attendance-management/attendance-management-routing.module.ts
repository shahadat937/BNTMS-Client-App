import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceApprovedComponent } from './attendance/attendance-approved/attendance-approved.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { NewAttendanceComponent } from './attendance/new-attendance/new-attendance.component';

import { BNAExamAttendanceListComponent } from './bnaexamattendance/bnaexamattendance-list/bnaexamattendance-list.component';
import { NewBNAExamAttendanceComponent } from './bnaexamattendance/new-bnaexamattendance/new-bnaexamattendance.component';
import {AttendanceInstructorComponent} from './attendance/attendance-instructor/attendance-instructor.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  

  {
    path: 'attendance-approved', 
    component: AttendanceApprovedComponent,
  },

  {
    path: 'bnaexamattendance-list', 
    component: BNAExamAttendanceListComponent,
  },
  { path: 'update-bnaexamattendance/:bnaExamAttendanceId',  
  component: NewBNAExamAttendanceComponent, 
  },
  {
    path: 'add-bnaexamattendance',
    component: NewBNAExamAttendanceComponent,
  },

  
  {
    path: 'attendance-list', 
    component: AttendanceListComponent,
  },
  {
    path: 'attendance-instructor/:traineeId', 
    component: AttendanceInstructorComponent,
  },
  { path: 'update-attendance/:attendanceId',  
  component: NewAttendanceComponent, 
  },
  {
    path: 'add-attendance',
    component: NewAttendanceComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceManagementRoutingModule { }

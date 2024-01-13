import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BNASubjectNameListComponent } from './bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBNASubjectNameComponent } from './bnasubjectname/new-bnasubjectname/new-bnasubjectname.component';
import { NewStaffCollageCourseComponent } from './staffcollagecourse/new-staffcollagecourse/new-staffcollagecourse.component';
import { StaffCollageCourseListComponent } from './staffcollagecourse/staffcollagecourse-list/staffcollagecourse-list.component';
import { ViewSubjectListByStaffCollageComponent } from './staffcollagecourse/viewsubjectbystaffcollage-list/viewsubjectbystaffcollage-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import {NewQExamMarkComponent} from './qexammark/new-qexammark/new-qexammark.component'
import {NewClassRoutineComponent} from '../staff-collage/classroutine/new-classroutine/new-classroutine.component'
import {NewSubjectMarkComponent} from '../staff-collage/subjectmark/new-subjectmark/new-subjectmark.component'
import {NewAttendanceComponent} from '../staff-collage/attendance/new-attendance/new-attendance.component'
import {NewAttendanceTraineeListComponent} from '../staff-collage/attendance/new-attendancetraineelist/new-attendancetraineelist.component'
import {NewIndexNoComponent} from '../staff-collage/indexno/new-indexno/new-indexno.component'
import {NewCourseInstructorComponent} from '../staff-collage/courseinstructor/new-courseinstructor/new-courseinstructor.component'
import {QExamMarkApproveComponent} from '../staff-collage/qexammark/qexammark-approve/qexammark-approve.component';
import {ExamApproveComponent} from '../staff-collage/qexammark/examapprove-list/examapprove-list.component';
import { MarkListByCourseComponent } from '../course-management/localcourse/marklistbycourse-list/marklistbycourse-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  // add-staffcollegeattendance NewAttendanceTraineeListComponent 
  {
    path: 'add-staffcollegeexammark',
    component: NewQExamMarkComponent,
  },
  
  {
    path: 'staffcollegeexamapprove-list',
    component: ExamApproveComponent,
  },
  
  {
    path: 'approve-staffcollegemark/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:bnaSubjectNameId',
    component: QExamMarkApproveComponent,
  },

  {
    path: 'add-subjectinstructor',
    component: NewCourseInstructorComponent,
  },
  {
    path: 'update-subjectinstructor/:courseInstructorId',
    component: NewCourseInstructorComponent,
  },
  // staff-collage/add-subjectinstructor

  {
    path: 'add-staffcollegetraineeattendance/:courseDurationId/:date/:courseNameId/:classRoutineId/:bnaSubjectNameId',
    component: NewAttendanceTraineeListComponent,
  },
  
  {
    path: 'add-staffcollegeattendance',
    component: NewAttendanceComponent,
  },

  {
    path: 'view-staffcollegemarksheet/:courseDurationId/:courseNameId',
    component: MarkListByCourseComponent,
  },

  // {
  //   path: 'update-staffcollegeattendance',
  //   component: NewAttendanceComponent,
  // },

  {
    path: 'update-staffcollageroutine/:classRoutineId',
    component: NewClassRoutineComponent,
  },

  {
    path: 'add-staffcollageroutinecreate',
    component: NewClassRoutineComponent,
  },

  {
    path: 'add-staffcollagesubjectmark',
    component: NewSubjectMarkComponent,
  },
  {
    path: 'update-staffcollagesubjectmark/:subjectMarkId',
    component: NewSubjectMarkComponent,
  },

  {
    path: 'bnasubjectname-list',
    component: BNASubjectNameListComponent,
  },
  { path: 'update-bnasubjectname/:bnaSubjectNameId', 
  component: NewBNASubjectNameComponent 
  },
  {
    path: 'add-bnasubjectname', 
    component: NewBNASubjectNameComponent,
  },

  {
    path: 'staffcollagecourse-list', 
    component: StaffCollageCourseListComponent,
  },
  { path: 'update-staffcollagecourse/:courseDurationId',  
  component: NewStaffCollageCourseComponent, 
  },
  {
    path: 'add-staffcollagecourse',
    component: NewStaffCollageCourseComponent,
  },
  {
    path: 'add-nominationindex',
    component: NewIndexNoComponent,
  },
  // NewIndexNoComponent
  { path: 'view-viewsubjectbystaffcollage', 
  component: ViewSubjectListByStaffCollageComponent
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

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffCollageRoutingModule { }

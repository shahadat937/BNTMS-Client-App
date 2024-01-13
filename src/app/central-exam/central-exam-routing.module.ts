import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamCenterSelectionListComponent } from './examcenterselection/examcenterselection-list/examcenterselection-list.component';
import { NewExamCenterSelectionComponent } from './examcenterselection/new-examcenterselection/new-examcenterselection.component';

import { CentralExamListComponent } from './centralexam/centralexam-list/centralexam-list.component';
import { NewCentralExamComponent } from './centralexam/new-centralexam/new-centralexam.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { BNASubjectNameListComponent } from './bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBNASubjectNameComponent } from './bnasubjectname/new-bnasubjectname/new-bnasubjectname.component';
// import {NewQExamMarkComponent} from './qexammark/new-qexammark/new-qexammark.component';
import {NewSubjectMarkComponent} from '../central-exam/subjectmark/new-subjectmark/new-subjectmark.component'
import { ViewSubjectListByQExamComponent } from './centralexam/viewsubjectbyqexam-list/viewsubjectbyqexam-list.component';
import {NewClassRoutineComponent} from './classroutine/new-classroutine/new-classroutine.component';
import {NewAttendanceComponent} from '../central-exam/attendance/new-attendance/new-attendance.component'
import{NewAttendanceTraineeListComponent} from '../central-exam/attendance/new-attendancetraineelist/new-attendancetraineelist.component'
import {NewQExamMarkComponent} from '../central-exam/qexammark/new-qexammark/new-qexammark.component'
import {NewCourseInstructorComponent} from '../central-exam/courseinstructor/new-courseinstructor/new-courseinstructor.component'
import {NewIndexNoComponent} from '../central-exam/indexno/new-indexno/new-indexno.component'
import { EditClassRoutineComponent } from '../central-exam/classroutine/edit-classroutine/edit-classroutine.component';
import { ExamApproveComponent } from '../central-exam/qexammark/examapprove-list/examapprove-list.component';
import { QExamMarkApproveComponent } from '../staff-collage/qexammark/qexammark-approve/qexammark-approve.component';
import { MarkListByCourseComponent } from '../course-management/localcourse/marklistbycourse-list/marklistbycourse-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  {
    path: 'examcenterselection-list', 
    component: ExamCenterSelectionListComponent,
  },
  { path: 'update-examcenterselection/:examCenterSelectionId',  
  component: NewExamCenterSelectionComponent, 
  },

  {
    path: 'add-subjectinstructor',
    component: NewCourseInstructorComponent,
  },
  {
    path: 'update-subjectinstructor/:courseInstructorId',
    component: NewCourseInstructorComponent,
  },

  {
    path: 'add-nominationindex',
    component: NewIndexNoComponent,
  },

  
  {
    path: 'view-qexammarksheet/:courseDurationId/:courseNameId',
    component: MarkListByCourseComponent,
  },

  {
    path: 'add-examcenterselection',
    component: NewExamCenterSelectionComponent,
  },

  // add-qexamattendance
  {
    path: 'add-qexamattendance',
    component: NewAttendanceComponent,
  },
  {
    path: 'add-qexamroutine',
    component: NewClassRoutineComponent,
  },

  {
    path: 'update-qexamroutine/:courseDurationId/:courseNameId',
    component: EditClassRoutineComponent,
  },

  { path: 'update-subjectmark/:subjectMarkId',  
  component: NewSubjectMarkComponent, 
  },
  {
    path: 'add-qexamsubjectmark',
    component: NewSubjectMarkComponent,
  },

  // 
  {
    path: 'centralexam-list', 
    component: CentralExamListComponent,
  },
  { path: 'update-centralexam/:courseDurationId',  
  component: NewCentralExamComponent, 
  },
  {
    path: 'add-centralexam',
    component: NewCentralExamComponent,
  },
  { path: 'view-viewsubjectbyqexam', 
  component: ViewSubjectListByQExamComponent
  },

  {
    path: 'add-qexammark',
    component: NewQExamMarkComponent,
  },

  {
    path: 'qexamapprove-list',
    component: ExamApproveComponent,
  },

  {
    path: 'approve-qexamemark/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:branchId/:bnaSubjectNameId',
    component: QExamMarkApproveComponent,
  },

  {
    path: 'add-centralexamtraineeattendance/:courseDurationId/:date/:courseNameId/:classRoutineId/:bnaSubjectNameId',
    component: NewAttendanceTraineeListComponent,
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
    path: 'add-traineenomination/:courseDurationId',
    component: NewTraineeNominationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralExamRoutingModule { }

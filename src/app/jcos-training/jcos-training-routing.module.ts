import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAttendanceComponent } from './attendance/new-attendance/new-attendance.component';
import { NewAttendanceTraineeListComponent } from './attendance/new-attendancetraineelist/new-attendancetraineelist.component';
import { BNASubjectNameListComponent } from './bnasubjectname/bnasubjectname-list/bnasubjectname-list.component';
import { NewBNASubjectNameComponent } from './bnasubjectname/new-bnasubjectname/new-bnasubjectname.component';
import { NewClassRoutineComponent } from './classroutine/new-classroutine/new-classroutine.component';
import { NewCourseInstructorComponent } from './courseinstructor/new-courseinstructor/new-courseinstructor.component';
import { NewIndexNoComponent } from './indexno/new-indexno/new-indexno.component';
import { JCOsTrainingListComponent } from './jcostraining/jcostraining-list/jcostraining-list.component';
import { NewJCOsTrainingComponent } from './jcostraining/new-jcostraining/new-jcostraining.component';
import { ViewSubjectListByJCOsComponent } from './jcostraining/viewsubjectbyjcos-list/viewsubjectbyjcos-list.component';
import { NewJCOsTrainingMarkComponent } from './jcostrainingmark/new-jcostrainingmark/new-jcostrainingmark.component';
import { NewSubjectMarkComponent } from './subjectmark/new-subjectmark/new-subjectmark.component';
import { NewTraineeNominationComponent } from './traineenomination/new-traineenomination/new-traineenomination.component';
import { TraineeNominationListComponent } from './traineenomination/traineenomination-list/traineenomination-list.component';
import { ExamApproveListComponent } from './jcoexammark/examapprove-list/examapprove-list.component';
import { QExamMarkApproveComponent as JcoExamApprove } from '../staff-collage/qexammark/qexammark-approve/qexammark-approve.component';






const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  

  {
    path: 'jcostraining-list', 
    component: JCOsTrainingListComponent,
  },
  
  {
    path: 'jcosexamapprove-list', 
    component: ExamApproveListComponent,
  },
  
  {
    path: 'approve-jcoexamemark/:courseDurationId/:courseNameId/:courseTypeId/:classRoutineId/:bnaSubjectNameId',
    component: JcoExamApprove,
  },

  { path: 'update-jcostraining/:courseDurationId',  
  component: NewJCOsTrainingComponent, 
  },
  {
    path: 'add-jcostraining',
    component: NewJCOsTrainingComponent,
  },
  { path: 'view-viewsubjectbyjcos/:courseDurationId', 
  component: ViewSubjectListByJCOsComponent
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
    path: 'add-jcostrainingmark',
    component: NewJCOsTrainingMarkComponent,
  },

  { path: 'update-subjectmark/:subjectMarkId', 
  component: NewSubjectMarkComponent 
  },
  {
    path: 'add-jcostrainingubjectmark',
    component: NewSubjectMarkComponent,
  },

  { path: 'update-classroutine/:classRoutineId', 
  component: NewClassRoutineComponent 
  },
  {
    path: 'add-qexamroutine',
    component: NewClassRoutineComponent,
  },

  {
    path: 'add-jcosattendance',
    component: NewAttendanceComponent,
  },
  {
    path: 'add-jcostraineeattendance/:courseDurationId/:date/:courseNameId/:classRoutineId/:bnaSubjectNameId',
    component: NewAttendanceTraineeListComponent,
  },

  { path: 'update-courseinstructor/:courseInstructorId', 
  component: NewCourseInstructorComponent 
  },
  {
    path: 'add-courseinstructor',
    component: NewCourseInstructorComponent,
  },

  {
    path: 'add-nominationindex',
    component: NewIndexNoComponent,
  },

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JCOsTrainingRoutingModule { }

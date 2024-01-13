import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseTaskListComponent } from './coursetask/coursetask-list/coursetask-list.component';
import { NewCourseTaskComponent } from './coursetask/new-coursetask/new-coursetask.component';
import { NewTrainingObjectiveComponent } from './trainingobjective/new-trainingobjective/new-trainingobjective.component';
import { NewTrainingSyllabusComponent } from './trainingsyllabus/new-trainingsyllabus/new-trainingsyllabus.component';






const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },

  

  // {
  //   path: 'coursetask-list', 
  //   component: CourseTaskListComponent,
  // },
  { path: 'update-coursetask/:courseTaskId',  
  component: NewCourseTaskComponent, 
  },
  {
    path: 'add-coursetask',
    component: NewCourseTaskComponent,
  },
  
  { path: 'update-trainingobjective/:trainingObjectiveId',  
  component: NewTrainingObjectiveComponent, 
  },
  {
    path: 'add-trainingobjective',
    component: NewTrainingObjectiveComponent,
  },
  { path: 'update-trainingsyllabus/:trainingSyllabusId',  
  component: NewTrainingSyllabusComponent, 
  },
  {
    path: 'add-trainingsyllabus',
    component: NewTrainingSyllabusComponent,
  },
  
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyllabusEntryRoutingModule { }

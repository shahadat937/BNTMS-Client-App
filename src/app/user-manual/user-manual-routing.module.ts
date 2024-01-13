import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewUserManualComponent } from './usermanual/new-usermanual/new-usermanual.component';
import { UserManualListComponent } from './usermanual/usermanual-list/usermanual-list.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  

  {
    path: 'usermanual-list',
    component: UserManualListComponent,
  },
  { path: 'update-usermanual/:userManualId', 
  component: NewUserManualComponent 
  },
  {
    path: 'add-usermanual',
    component: NewUserManualComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManualRoutingModule { }

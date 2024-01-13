import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulletinListComponent } from './bulletin/bulletin-list/bulletin-list.component';
import { NewBulletinComponent } from './bulletin/new-bulletin/new-bulletin.component';
import {NewNoticeComponent} from './notice/new-notice/new-notice.component';
import {NoticeListComponent} from './notice/notice-list/notice-list.component';
import {IndividualNoticeComponent} from './individualnotice/new-individualnotice/new-individualnotice.component'
import {IndividualBulletinComponent} from './individualbulletin/new-individualbulletin/new-individualbulletin.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { NewEventComponent } from './event/new-event/new-event.component';
import { NewSchoolNoticeComponent } from './school-notice/new-notice/new-school-notice.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },


  // {
  //   path: 'notice-list', 
  //   component: NoticeListComponent,
  // },

  // { path: 'update-notice/:noticeId',  
  // component: NewNoticeComponent, 
  // },

  {
    path: 'add-individualnotice',
    component: IndividualNoticeComponent,
  },

  {
    path: 'add-individualbulletin',
    component: IndividualBulletinComponent,
  },

  {
    path: 'add-schoolnotice',
    component: NewSchoolNoticeComponent,
  },


  {
    path: 'bulletin-list', 
    component: BulletinListComponent,
  },
  { path: 'update-bulletin/:bulletinId',  
  component: NewBulletinComponent, 
  },
  {
    path: 'add-bulletin',
    component: NewBulletinComponent,
  },

  {
    path: 'event-list', 
    component: EventListComponent,
  },
  { path: 'update-event/:eventId',  
  component: NewEventComponent, 
  },
  {
    path: 'add-event',
    component: NewEventComponent,
  },

  {
    path: 'notice-list', 
    component: NoticeListComponent,
  },
  { path: 'update-notice/:noticeId',  
  component: NewNoticeComponent, 
  },
  {
    path: 'add-notice',
    component: NewNoticeComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticeBulletinRoutingModule { }

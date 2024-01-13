import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReadingMaterialListComponent } from './readingmaterial/readingmaterial-list/readingmaterial-list.component';
import { NewReadingMaterialComponent } from './readingmaterial/new-readingmaterial/new-readingmaterial.component';
import { ReadingmaterialtitleListComponent } from './readingmaterialtitle/readingmaterialtitle-list/readingmaterialtitle-list.component';
import { NewReadingmaterialtitleComponent } from './readingmaterialtitle/new-readingmaterialtitle/new-readingmaterialtitle.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'readingmaterial-list',
    component: ReadingMaterialListComponent,
  },
  { path: 'update-readingmaterial/:readingMaterialId', 
  component: NewReadingMaterialComponent 
  },
  {
    path: 'add-readingmaterial',
    component: NewReadingMaterialComponent,
  },

  {
    path: 'add-readingmaterial/:traineeId/:baseSchoolNameId',
    component: NewReadingMaterialComponent,
  },

  {
    path: 'readingmaterialtitle-list',
    component: ReadingmaterialtitleListComponent,
  },
  { path: 'update-readingmaterialtitle/:readingMaterialTitleId', 
  component: NewReadingmaterialtitleComponent 
  },
  {
    path: 'add-readingmaterialtitle',
    component: NewReadingmaterialtitleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingMaterialsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cupon1Page } from './cupon-1.page';

const routes: Routes = [
  {
    path: '',
    component: Cupon1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cupon1PageRoutingModule {}

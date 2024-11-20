import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cupon4Page } from './cupon-4.page';

const routes: Routes = [
  {
    path: '',
    component: Cupon4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cupon4PageRoutingModule {}

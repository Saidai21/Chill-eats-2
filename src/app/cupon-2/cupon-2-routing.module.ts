import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cupon2Page } from './cupon-2.page';

const routes: Routes = [
  {
    path: '',
    component: Cupon2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cupon2PageRoutingModule {}

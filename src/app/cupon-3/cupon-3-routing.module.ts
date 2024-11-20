import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cupon3Page } from './cupon-3.page';

const routes: Routes = [
  {
    path: '',
    component: Cupon3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cupon3PageRoutingModule {}

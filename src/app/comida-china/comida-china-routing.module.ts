import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComidaChinaPage } from './comida-china.page';

const routes: Routes = [
  {
    path: '',
    component: ComidaChinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComidaChinaPageRoutingModule {}

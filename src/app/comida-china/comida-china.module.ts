import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComidaChinaPageRoutingModule } from './comida-china-routing.module';

import { ComidaChinaPage } from './comida-china.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComidaChinaPageRoutingModule
  ],
  declarations: [ComidaChinaPage]
})
export class ComidaChinaPageModule {}

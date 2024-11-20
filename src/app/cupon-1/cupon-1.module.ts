import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cupon1PageRoutingModule } from './cupon-1-routing.module';

import { Cupon1Page } from './cupon-1.page';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Cupon1PageRoutingModule
  ],
  declarations: [Cupon1Page]
})
export class Cupon1PageModule {}

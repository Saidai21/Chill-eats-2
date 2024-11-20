import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cupon4PageRoutingModule } from './cupon-4-routing.module';

import { Cupon4Page } from './cupon-4.page';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Cupon4PageRoutingModule
  ],
  declarations: [Cupon4Page]
})
export class Cupon4PageModule {}

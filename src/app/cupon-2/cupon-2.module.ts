import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cupon2PageRoutingModule } from './cupon-2-routing.module';

import { Cupon2Page } from './cupon-2.page';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Cupon2PageRoutingModule
  ],
  declarations: [Cupon2Page]
})
export class Cupon2PageModule {}

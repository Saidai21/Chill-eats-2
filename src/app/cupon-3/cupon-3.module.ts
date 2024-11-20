import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cupon3PageRoutingModule } from './cupon-3-routing.module';

import { Cupon3Page } from './cupon-3.page';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    Cupon3PageRoutingModule
  ],
  declarations: [Cupon3Page]
})
export class Cupon3PageModule {}

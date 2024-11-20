import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cupon-1',
  templateUrl: './cupon-1.page.html',
  styleUrls: ['./cupon-1.page.scss'],
})
export class Cupon1Page implements OnInit {
  constructor() { }
  public text: string = 'Cupon 25% de descueno';  // Agregar esta línea
  texto: any;
  numeroAleatorio!: number;
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  generarNumeroAleatorio() {
    const min = 1000000000; // Mínimo número de 10 dígitos
    const max = 9999999999; // Máximo número de 10 dígitos

    this.numeroAleatorio = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(this.numeroAleatorio); // Esto imprimirá el número aleatorio en la consola
  }

  ngOnInit() {
    this.generarNumeroAleatorio();
  }

  ngAfterViewInit(){
  }

  ejecutar(){
  }
}
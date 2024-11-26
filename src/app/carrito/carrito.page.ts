import { Component, OnInit } from '@angular/core';
import { AlertController, AnimationController, Animation } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  private animation!: Animation;
  comida: any[] = []; // Almacena los datos del carrito agrupados
  total: number = 0; // Almacena el total del carrito

  constructor(
    private alertController: AlertController,
    private animationController: AnimationController,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.carritoService.cargarCarrito().subscribe({
      next: (carrito) => {
        // Agrupar los elementos por nombre
        const agrupado = carrito.reduce((acc: any, item: any) => {
          const existing = acc.find((prod: any) => prod.nombre === item.nombre);
          if (existing) {
            existing.cantidad += 1;
            existing.valorTotal += item.valor;
          } else {
            acc.push({ ...item, cantidad: 1, valorTotal: item.valor });
          }
          return acc;
        }, []);
        
        // Actualizar el carrito y calcular el total
        this.comida = agrupado;
        this.total = agrupado.reduce((sum: number, item: any) => sum + item.valorTotal, 0);
      },
      error: (error) => {
        console.error('Error al cargar el carrito:', error);
        this.comida = [];
        this.total = 0;
      },
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: 'Su pedido ha sido comprado con éxito',
      buttons: ['Salir'],
    });

    await alert.present();
  }

  ngAfterViewInit() {
    const moveAnimation = this.animationController.create()
      .addElement(document.querySelector('.moto') as HTMLElement)
      .duration(2200)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(-300px)', 'translateX(600px)');

    const opacityAnimation = this.animationController.create()
      .addElement(document.querySelector('.texto') as HTMLElement)
      .duration(900)
      .iterations(Infinity)
      .fromTo('opacity', '1', '0.5');

    this.animation = this.animationController.create().addAnimation([
      moveAnimation,
      opacityAnimation,
    ]);
  }

  ejecutar() {
    this.animation.play();
  }

  async eliminarCarrito(){
    await this.carritoService.eliminarCarrito();
    this.comida = [];
    this.total = 0;
  }
}

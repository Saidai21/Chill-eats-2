import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ComidaService } from '../services/comida.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comida-china',
  templateUrl: './comida-china.page.html',
  styleUrls: ['./comida-china.page.scss'],
})
export class ComidaChinaPage implements OnInit {
  comidas!: Observable<any[]>; // Lista de comidas chinas
  tieneProductosEnCarrito: boolean = false; // Controla la visibilidad del botón "Pagar Carrito"

  constructor(
    private router: Router,
    private comidaService: ComidaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.cargarComidas(); // Cargar las comidas chinas disponibles
    this.monitorearCarrito(); // Monitorear el carrito en tiempo real
  }

  cargarComidas() {
    this.comidas = this.comidaService.obtenerChina();
    this.comidas.subscribe(
      (data) => {
        console.log('Datos de comidas recibidos:', data);
      },
      (error) => {
        console.error('Error al cargar comidas:', error);
      }
    );
  }

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    const productoConRestaurante = {
      ...producto,
      ['restaurantes']: 'Comida-China', // Especificar el restaurante
    };

    try {
      await this.carritoService.agregarProducto(productoConRestaurante);
    } catch (error) {
      console.error(error);
      alert('Error: Solo puedes agregar productos del mismo restaurante al carrito.');
    }
  }

  monitorearCarrito() {
    this.carritoService.cargarCarrito().subscribe(
      (productosEnCarrito) => {
        // Verificar si hay productos en el carrito
        this.tieneProductosEnCarrito = productosEnCarrito.length > 0;
      },
      (error) => {
        console.error('Error al monitorear el carrito:', error);
        this.tieneProductosEnCarrito = false;
      }
    );
  }

  goToMainPage() {
    this.router.navigate(['/home']); // Navegar a la página principa
  }
}

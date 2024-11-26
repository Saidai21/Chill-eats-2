import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ComidaService } from '../services/comida.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hamburguesa',
  templateUrl: 'hamburguesa.page.html',
  styleUrls: ['hamburguesa.page.scss'],
})
export class HamburguesaPage implements OnInit {
  hamburguesas!: Observable<any[]>; // Lista de hamburguesas
  tieneProductosEnCarrito: boolean = false; // Controla la visibilidad del botón "Pagar Carrito"

  constructor(
    private router: Router,
    private comidaService: ComidaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.cargarHamburguesas(); // Cargar las hamburguesas disponibles
    this.monitorearCarrito(); // Monitorear el carrito en tiempo real
  }

  cargarHamburguesas() {
    this.hamburguesas = this.comidaService.obtenerHamburguesas();
    this.hamburguesas.subscribe(
      (data) => {
        console.log('Datos de hamburguesas recibidos:', data);
      },
      (error) => {
        console.error('Error al cargar hamburguesas:', error);
      }
    );
  }

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    const productoConRestaurante = {
      ...producto,
      ['restaurantes']: 'Hamburguesa', // Especificar el restaurante
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
    this.router.navigate(['/home']); // Navegar a la página principal
  }
}

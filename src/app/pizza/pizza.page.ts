import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service';
import { ComidaService } from '../services/comida.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.page.html',
  styleUrls: ['./pizza.page.scss'],
})
export class PizzaPage implements OnInit {
  pizzas!: Observable<any[]>; // Lista de pizzas disponibles
  tieneProductosEnCarrito: boolean = false; // Controla la visibilidad del botón "Pagar Carrito"

  constructor(
    private router: Router,
    private comidaService: ComidaService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.cargarPizzas(); // Cargar las pizzas disponibles
    this.monitorearCarrito(); // Monitorear el carrito en tiempo real
  }

  cargarPizzas() {
    this.pizzas = this.comidaService.obtenerPizzas();
    this.pizzas.subscribe(
      (data) => {
        console.log('Datos de pizzas recibidos:', data);
      },
      (error) => {
        console.error('Error al cargar pizzas:', error);
      }
    );
  }

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    const productoConRestaurante = {
      ...producto,
      ['restaurantes']: 'Pizza', // Especificar el restaurante
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

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
  pizzas!: Observable<any[]>;

  // Inyección de servicios
  constructor(private router: Router, private comidaService: ComidaService, private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarPizzas();
  }

  cargarPizzas() {
    this.pizzas = this.comidaService.obtenerPizzas();
    this.pizzas.subscribe(data => {
      console.log('Datos de pizzas recibidos:', data);
    }, error => {
      console.error('Error al cargar pizzas:', error);
    });
  }

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    await this.carritoService.agregarProducto(producto);
  }

  goToMainPage() {
    this.router.navigate(['/home']);
  }
}

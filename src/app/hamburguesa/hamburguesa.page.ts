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
  hamburguesas!: Observable<any[]>;

  constructor(private router: Router, private comidaService: ComidaService, private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarHamburguesas();
  }

  cargarHamburguesas() {
    // Se obtiene la lista de hamburguesas desde el servicio de comida
    this.hamburguesas = this.comidaService.obtenerHamburguesas(); // Si es necesario, filtra las hamburguesas en el backend o aquí.
    this.hamburguesas.subscribe(data => {
      console.log('Datos de hamburguesas recibidos:', data);
    }, error => {
      console.error('Error al cargar hamburguesas:', error);
    });
  }

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    await this.carritoService.agregarProducto(producto);
  }

  goToMainPage() {
    this.router.navigate(['/home']);
  }
}

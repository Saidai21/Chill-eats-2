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
  comidas!: Observable<any[]>;
  
  // Inyección del CarritoService
  constructor(private router: Router, private comidaService: ComidaService, private carritoService: CarritoService) {}

  ngOnInit() {
    this.cargarComidas();
  }

  cargarComidas() {
    this.comidas = this.comidaService.obtenerChina();  
    this.comidas.subscribe(data => {
      console.log('Datos de comidas recibidos:', data);  
    }, error => {
      console.error('Error al cargar comidas:', error);
    });
  }

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    await this.carritoService.agregarProducto(producto);
  }

  goToMainPage() {
    this.router.navigate(['/home']);
  }
}

import { Component, OnInit } from '@angular/core';
import { DireccionService } from '../services/direccion.service'; 
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  direcciones: any[] = [];
  nuevaDireccion: string = '';
  direccionIngresada: string = ''; // Dirección ingresada por el usuario
  mapa!: L.Map;
  marker!: L.Marker; 

  constructor(private direccionService: DireccionService) {
    this.cargarDirecciones();
  }

  ngOnInit() {
    this.cargarDirecciones();
  }

  // Inicializar el mapa
  iniciarMapa() {
    this.mapa = L.map('mapa', {
      center: [-33.4489, -70.6693], // Coordenadas de Santiago
      zoom: 12, // Nivel de zoom inicial
      doubleClickZoom: false, 
      boxZoom: false,
      touchZoom: false, 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    setTimeout(() => {
      this.mapa.invalidateSize();
    }, 0);

    this.marker = L.marker([-33.4489, -70.6693]).addTo(this.mapa);
  }

  // Buscar dirección en OpenStreetMap
  async buscarDireccion() {
    if (!this.direccionIngresada) {
      alert('Por favor, ingresa una dirección.');
      return;
    }
  
    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.direccionIngresada)}`;
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const coords: L.LatLngTuple = [parseFloat(lat), parseFloat(lon)];
  
        this.mapa.setView(coords, 20);
        this.marker.setLatLng(coords).bindPopup(this.direccionIngresada).openPopup();
      } else {
        alert('No se encontró la dirección. Por favor, intenta con otra.');
      }
    } catch (error) {
      console.error('Error al buscar la dirección:', error);
      alert('Ocurrió un error al buscar la dirección.');
    }
  }

  // Cargar las direcciones desde Firestore
  cargarDirecciones() {
    this.direccionService.cargarDirecciones().subscribe((direcciones) => {
      this.direcciones = direcciones;
      console.log('Direcciones cargadas:', this.direcciones);
    }, (error) => {
      console.error('Error al cargar direcciones:', error);
    });
  }

  // Agregar una nueva dirección
  async agregarDireccion() {
    try {
      if (this.direccionIngresada && this.direccionIngresada.trim() !== '') {
        await this.direccionService.agregarDireccion(this.direccionIngresada);
        alert("Dirección agregada");
        this.direccionIngresada = ''; // Limpiar el campo de dirección
      } else {
        alert("Ingrese una dirección válida");
      }
    } catch (error) {
      console.error('Error al agregar dirección:', error);
      alert('Ocurrió un error al agregar la dirección.');
    }
  }

  // Método canDismiss (usualmente para control de modales o vistas)
  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';  // Ejemplo de lógica que puedes ajustar según tus necesidades
  }
}

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage  {

  map!: L.Map;
  direccionOrigen: string = '';  // Dirección de origen
  direccionDestino: string = ''; // Dirección de destino

  constructor(private navCtrl: NavController) { }

  ionViewWillEnter() {
    this.loadMap();
  }

  loadMap() {
    // Inicializar el mapa
    this.map = L.map('mapId').setView([51.505, -0.09], 13);

    // Añadir la capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  }

  // Función para calcular la ruta
  async calcularRuta() {
    const coordsOrigen = await this.getCoordenadas(this.direccionOrigen);
    const coordsDestino = await this.getCoordenadas(this.direccionDestino);
  
    if (coordsOrigen && coordsDestino) {
      const routingControl = (L as any).Routing.control({
        waypoints: [
          L.latLng(coordsOrigen.lat, coordsOrigen.lon),
          L.latLng(coordsDestino.lat, coordsDestino.lon)
        ],
        routeWhileDragging: true,
        show: false,
      }).addTo(this.map);
  
      // Forzar la ocultación del contenedor del panel de instrucciones
      (routingControl as any)._container.style.display = 'none';
    }
  }
  

  // Función para obtener las coordenadas de una dirección con Nominatim
  async getCoordenadas(direccion: string): Promise<any> {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    } else {
      alert('No se encontraron coordenadas para la dirección proporcionada');
      return null;
    }
  }

  goToMainPage() {
    this.navCtrl.navigateBack('/home');
  }
}

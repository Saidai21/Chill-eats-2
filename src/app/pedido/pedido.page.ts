import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { DireccionService } from '../services/direccion.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage  {
  map!: L.Map;
  direccionOrigen: string = 'Gran Av. José Miguel Carrera 6150';  // Dirección de origen predeterminada
  direccionDestino: string = ''; // Dirección de destino (vacía hasta que el usuario seleccione una)
  direcciones: any[] = []; // Lista de direcciones del servicio
  direccionSeleccionada: string = ''; // Nombre de la dirección seleccionada por el usuario

  constructor(private navCtrl: NavController, private direccionService: DireccionService) { }

  ionViewWillEnter() {
    this.cargarDirecciones();
    this.loadMap();
  }

  // Inicializa el mapa
  loadMap() {
    this.map = L.map('mapId').setView([51.505, -0.09], 13);

    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  // Función para calcular la ruta entre el origen y el destino
  async calcularRuta() {
    // Obtener coordenadas de la dirección de origen y destino
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

  // Función para navegar a la página principal
  goToMainPage() {
    this.navCtrl.navigateBack('/home');
  }

  // Cargar direcciones desde el servicio
  cargarDirecciones() {
    this.direccionService.cargarDirecciones().subscribe((direcciones) => {
      this.direcciones = direcciones;
      console.log('Direcciones cargadas:', this.direcciones); // Verifica que las direcciones se carguen correctamente
    }, (error) => {
      console.error('Error al cargar direcciones:', error);
    });
  }

  // Detectar cambio de dirección seleccionada y recalcular la ruta
  onDireccionSeleccionada() {
    console.log('Direccion seleccionada:', this.direccionSeleccionada); // Verifica el nombre de la dirección seleccionada
    this.direccionDestino = this.direccionSeleccionada; // Asignar la dirección seleccionada
    this.calcularRuta();  // Calcular la ruta después de seleccionar la dirección
  }
}

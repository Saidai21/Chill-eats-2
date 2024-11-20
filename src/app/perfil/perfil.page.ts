import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { DireccionService } from '../services/direccion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  userData: any;
  Name: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  direcciones: any[] = [];
  user$!: Observable<any>
  constructor(private aService:AuthService,private router:Router,private alertController:AlertController,private firestore: AngularFirestore,private direccionService: DireccionService) {}

async ngOnInit() {
  this.cargarDirecciones();
  this.user$ = this.aService.obtenerUser();
  this.user$.subscribe(user => {
    console.log(user); 
  });

}



  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  logout(){
    this.aService.logout();
    localStorage.removeItem('fullName');
    localStorage.removeItem('email');
    this.presentAlert("Sesion Cerrada","Su sesion ha sido cerrada correctamente")
    this.router.navigate(["/iniciar-sesion"]);
  }

  cargarDirecciones() {
    this.direccionService.cargarDirecciones().subscribe((direcciones) => {
      this.direcciones = direcciones;
      console.log('Direcciones cargadas:', this.direcciones);
    }, (error) => {
      console.error('Error al cargar direcciones:', error);
    });
  }
}

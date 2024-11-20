import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage {
  email: string = '';
  password: string = '';

  registerName: string = '';
  registerEmail: string = '';
  registerPassword: string = '';
  registerConfirmPassword: string = '';
  
  segment: string = 'login';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService, 
    private alertController: AlertController, 
    private router: Router  
  ) {}

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      if (params['loggedOut']) {
        this.email = ''; // Limpiar el input de email
        this.password = ''; // Limpiar el input de contraseña
      }
    });
  }

  // Método para iniciar sesión
  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.presentAlert('Inicio de sesión exitoso', 'Has iniciado sesión correctamente.');
      localStorage.setItem('fullName', this.registerName); // Asegúrate de que `registerName` tenga el valor correcto
      localStorage.setItem('email', this.email);
      this.router.navigate(['/home']);
    } catch (error) {
      const errorMessage = (error as any).message || 'Hubo un problema con el inicio de sesión.';
      this.presentAlert('Error', errorMessage);
    }
    console.log('Login realizado');
  }
  
  // Método para registrarse
  async register() {
    if (this.registerPassword !== this.registerConfirmPassword) {
      this.presentAlert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await this.authService.register(this.registerEmail, this.registerPassword, this.registerName);
      this.presentAlert('Registro exitoso', 'Tu cuenta ha sido creada.');
      this.segment = 'login'; // Cambia al segmento de inicio de sesión después del registro
    } catch (error) {
      const errorMessage = (error as any).message || 'Hubo un problema con el registro.';
      this.presentAlert('Error', errorMessage);
    }
  }

  switchToRegister(event: Event) {
    event.preventDefault();
    this.segment = 'register';
  }

  switchToLogin(event: Event) {
    event.preventDefault();
    this.segment = 'login';
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}

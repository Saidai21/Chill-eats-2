import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DireccionService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Agregar una nueva dirección a Firestore
  async agregarDireccion(nuevaDireccion: string) {
    const user = await this.afAuth.currentUser;  // Espera a que se resuelva la promesa

    if (user) {
      const direccionesRef = this.firestore.collection('users').doc(user.uid).collection('direcciones');
      await direccionesRef.add({ label: nuevaDireccion });
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  // Cargar direcciones de Firestore de forma reactiva
  cargarDirecciones(): Observable<any[]> {
    return new Observable(observer => {
      this.afAuth.currentUser.then(user => {
        if (user) {
          const direccionesRef = this.firestore.collection('users').doc(user.uid).collection('direcciones');
          direccionesRef.valueChanges().subscribe(direcciones => {
            observer.next(direcciones);
          });
        } else {
          observer.error('Usuario no autenticado');
        }
      }).catch(error => observer.error(error));
    });
  }
}

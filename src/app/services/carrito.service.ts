import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async agregarProducto(producto: { id: string; nombre: string; precio: number }) {
    const user = await this.afAuth.currentUser; 

    if (user) {
      const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
      await carritoRef.add(producto);
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  cargarCarrito(): Observable<any[]> {
    return new Observable(observer => {
      this.afAuth.currentUser.then(user => {
        if (user) {
          const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
          carritoRef.valueChanges().subscribe(carrito => {
            observer.next(carrito); // Emite los datos del carrito
          });
        } else {
          observer.error('Usuario no autenticado'); // Notifica si el usuario no está autenticado
        }
      }).catch(error => observer.error(error)); // Captura errores de autenticación
    });
  }
  
  

  async eliminarProducto(productoId: string) {
    const user = await this.afAuth.currentUser;

    if (user) {
      const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito').doc(productoId);
      await carritoRef.delete();
    } else {
      throw new Error('Usuario no autenticado');
    }
  }
}

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

  async agregarProducto(producto: { id: string; nombre: string; precio: number; [key: string]: any }) {
    const user = await this.afAuth.currentUser;
  
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
  
    const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
  
    // Verifica los productos existentes en el carrito
    const carritoSnapshot = await carritoRef.get().toPromise();
    const productosEnCarrito = carritoSnapshot?.docs.map(doc => doc.data()) || [];
  
    if (productosEnCarrito.length > 0) {
      const restauranteActual = productosEnCarrito[0]['restaurantes']; // Acceso con corchetes
  
      // Verifica si el restaurante coincide
      if (restauranteActual && restauranteActual !== producto['restaurantes']) {
        throw new Error('Solo puedes agregar productos del mismo restaurante al carrito.');
      }
    }
  
    // Agrega el producto al carrito
    await carritoRef.add(producto);
  }
  

  cargarCarrito(): Observable<any[]> {
    return new Observable((observer) => {
      this.afAuth.currentUser.then((user) => {
        if (user) {
          const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
          carritoRef.valueChanges().subscribe(
            (carrito) => {
              observer.next(carrito || []); // Emitir un arreglo vacío si no hay productos
            },
            (error) => {
              console.error('Error al cargar el carrito:', error);
              observer.next([]); // Emitir un arreglo vacío en caso de error
            }
          );
        } else {
          observer.next([]); // Emitir un arreglo vacío si no hay usuario autenticado
        }
      }).catch((error) => {
        console.error('Error al verificar el usuario:', error);
        observer.next([]); // Emitir un arreglo vacío en caso de error
      });
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

  async eliminarCarrito() {
    const user = await this.afAuth.currentUser;
  
    if (user) {
      const carritoRef = this.firestore.collection('users').doc(user.uid).collection('carrito');
  
      
      const carritoSnapshot = await carritoRef.get().toPromise();
  
      
      const batch = this.firestore.firestore.batch();
      carritoSnapshot?.forEach(doc => {
        batch.delete(doc.ref);
      });
  
      
      await batch.commit();
    } else {
      throw new Error('Usuario no autenticado');
    }
  }

  
  


}

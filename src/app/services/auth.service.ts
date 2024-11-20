import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userDoc: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  async login(email: string, password: string) {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        return user;
      } else {
        throw new Error('No se pudo obtener el usuario');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Error desconocido al iniciar sesión');
    }
  }

  async register(email: string, password: string, name: string) {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        await this.firestore.collection('users').doc(user.uid).set({
          uid: user.uid,
          email: email,
          name: name,
        });

        await this.firestore
          .collection('users')
          .doc(user.uid)
          .collection('direcciones')
          .add({
            address: null, // Puedes ajustar esto según sea necesario
          });

        return user;
      } else {
        throw new Error('No se pudo crear el usuario');
      }
    } catch (error: any) {
      throw new Error(error.message || 'Error desconocido al registrar');
    }
  }

  // Método para cerrar sesión
  async logout() {
    await this.afAuth.signOut();
  }

  obtenerUser(): Observable<any> {  
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return new Observable();
        }
      })
    );
  }
}

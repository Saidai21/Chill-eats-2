import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComidaService {
  constructor(private firestore: AngularFirestore) {}

  // Método para obtener los platos desde la subcolección "Carta"
  obtenerChina(): Observable<any[]> {
    return this.firestore
      .collection('Restaurantes')
      .doc('China')
      .collection('Carta')
      .valueChanges();  // Devuelve un Observable con los datos de la subcolección "Carta"
  }

  obtenerPizzas(): Observable<any[]> {
    return this.firestore
      .collection('Restaurantes')
      .doc('Pizza')
      .collection('Carta1')
      .valueChanges(); // Devuelve un Observable con los datos de la subcolección "Carta"
  }

  obtenerHamburguesas(): Observable<any[]> {
    return this.firestore
      .collection('Restaurantes')
      .doc('Hamburguesas')
      .collection('Carta1')
      .valueChanges(); // Devuelve un Observable con los datos de la subcolección "Carta"
  }
}


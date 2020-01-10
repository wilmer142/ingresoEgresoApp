import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { map } from 'rxjs/operators';

import * as firebase from 'firebase';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore) { }

  crearUsuario(nombre, email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(resp => {

      const user: User = {
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      };

      this.afDB.doc(`${user.uid}/usuario`)
        .set(user)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch(error => {
          Swal.fire('Error', error.message, 'error');
        });
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error', error.message, 'error');
    })
  }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(resp => {
      this.router.navigate(['/']);
    })
    .catch(error => {
      console.log(error);
      Swal.fire('Error', error.message, 'error');
    })
  }

  logout(){
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => {

    });
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {
        if(fbUser === null) {
          this.router.navigate(['/login'])
          return false;
        }

        return true;
      })
    );
  }
}

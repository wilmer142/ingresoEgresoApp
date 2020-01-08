import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  crearUsuario(nombre, email, password) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(resp => {
      this.router.navigate(['/']);
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
}

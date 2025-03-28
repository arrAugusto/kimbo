import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'], // Asegúrate de usar `styleUrls` (con una 's' al final)
})
export class NavBarComponent {

  constructor(private router: Router) {}

  // Función para cerrar sesión eliminando datos de localStorage
  logout() {
    // Elimina el objeto userData del localStorage
    localStorage.removeItem('userData');

    // Opcional: confirma si el objeto fue eliminado
    console.log('Sesión eliminada del localStorage.');

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/auth_login']); // Cambia '/auth_login' por tu ruta de login
  }
}

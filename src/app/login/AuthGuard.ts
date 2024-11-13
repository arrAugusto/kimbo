import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

// AuthGuard: Protege rutas privadas
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('userData'); // Obtén el objeto completo
    if (userData) {
      try {
        const parsedData = JSON.parse(userData); // Parseamos el JSON almacenado
        const jwt = parsedData.jwt; // Extraemos el JWT del objeto

        if (jwt) {
          const decodedToken: any = jwt_decode(jwt);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp && decodedToken.exp > currentTime) {
            return true; // Token válido
          }
        }
      } catch (error) {
        console.error('Error al procesar el token:', error);
      }
    }

    this.router.navigate(['/auth_login']);
    return false; // Redirige al login si no hay token válido
  }
}

// NoAuthGuard: Bloquea acceso al login si ya hay un token válido
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userData = localStorage.getItem('userData'); // Obtén el objeto completo
    if (userData) {
      try {
        const parsedData = JSON.parse(userData); // Parseamos el JSON almacenado
        const jwt = parsedData.jwt; // Extraemos el JWT del objeto

        if (jwt) {
          const decodedToken: any = jwt_decode(jwt);
          const currentTime = Math.floor(Date.now() / 1000);

          if (decodedToken.exp && decodedToken.exp > currentTime) {
            this.router.navigate(['/dashboard']);
            return false; // Redirige al dashboard si el token es válido
          }
        }
      } catch (error) {
        console.error('Error al procesar el token:', error);
      }
    }

    return true; // Permite acceso al login si no hay token válido
  }
}

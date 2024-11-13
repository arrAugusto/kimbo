import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var M: any; // Materialize library

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicializar el sidenav de Materialize
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems, {});
    });
  }

  // Verifica si está en la ruta de login
  isLoginRoute(): boolean {
    return this.router.url === '/auth_login';
  }
}

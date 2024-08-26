import { Component, OnInit } from '@angular/core';

declare var M: any; // Importar la biblioteca Materialize

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // Inicializar el sidenav de Materialize
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.sidenav');
      M.Sidenav.init(elems, {});
    });
  }
}

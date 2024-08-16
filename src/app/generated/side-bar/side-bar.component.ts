import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SideBarService } from '../../services/view_kimbo/SideBarService';
import { Router } from '@angular/router';
import { SidebarModel } from '../../models/View_kimbo/SideBarModels';

declare var M: any;  // Declara M para que TypeScript reconozca Materialize

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],  // Asegúrate de usar styleUrls en lugar de styleUrl
})
export class SideBarComponent implements OnInit, AfterViewInit {
  items: SidebarModel[] = [];

  constructor(private sideBarService: SideBarService, private router: Router) { }

  ngOnInit() {
    this.items = [];
    this.sideBarService.getSideBar().subscribe(
      (data) => {
        this.items = data;
        // Manejar los datos de los formularios aquí
        console.log('Datos de formularios:', data);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener los formularios:', error);
      }
    );
  }

  ngAfterViewInit() {
    // Inicializa el sidenav después de que la vista esté completamente cargada
    var elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  }

  onClick(id: string) {
    this.router.navigate(['menu', id]);
  }
}

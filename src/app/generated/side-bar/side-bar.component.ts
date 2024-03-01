import { Component, OnInit } from '@angular/core';
import { SideBarService } from '../../services/sidebar/SideBarService';
import { Router } from '@angular/router';
import { SidebarModel } from '../../models/SideBar/SideBarModels';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent implements OnInit {
  items: SidebarModel[] = [];
  constructor(private sideBarService: SideBarService, private router: Router) {}

  ngOnInit() {
    this.items = [];
    this.sideBarService.getSideBar().subscribe(
      (data) => {
        this.items = data;

        console.log(this.items[1].nombre);

        // Manejar los datos de los formularios aquí
        console.log('Datos de formularios:', data);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener los formularios:', error);
      }
    );
  }
  onClick(id: string){
    this.router.navigate(['/menu', id]);
    location.reload(); // Recargar la página completa
  }
}

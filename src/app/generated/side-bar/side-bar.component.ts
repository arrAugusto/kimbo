import { Component, OnInit } from '@angular/core';
import { SideBarService } from '../../services/view_kimbo/SideBarService';
import { Router } from '@angular/router';
import { SidebarModel } from '../../models/View_kimbo/SideBarModels';

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
        // Manejar los datos de los formularios aquí
        console.log('Datos de formularios:', data);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener los formularios:', error);
      }
    );
  }
  onClick(id: string) {
    this.router.navigate(['menu', id]);
  }
}

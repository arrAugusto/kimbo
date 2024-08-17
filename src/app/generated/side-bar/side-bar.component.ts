import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
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
  public showSidebar = true;

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
    this.checkScreenSize();    
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    this.showSidebar = !(width >= 993 && width <= 1900);
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

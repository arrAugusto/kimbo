import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardsService } from '../../services/view_kimbo/CardsService';
import { FormsCards } from '../../models/View_kimbo/GetCards';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { constConfig } from '../../env/constantsConfig';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit, OnDestroy {
  forms: FormsCards[] = [];
  id: string = '';

  private routeSub: Subscription = new Subscription();

  constructor(
    private cardsService: CardsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Obtener el parámetro 'id' de la URL inicialmente
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.loadForms();
    });
  }

  ngOnDestroy() {
    // Asegúrate de cancelar la suscripción para evitar posibles fugas de memoria
    this.routeSub.unsubscribe();
  }

  loadForms() {
    // Lógica para cargar los formularios
    this.cardsService.getForms(this.id).subscribe(
      (data) => {
        // Limpiar la variable forms antes de asignarle los nuevos datos
        this.forms = [];
        this.forms = data;

        console.log(this.forms);

        // Manejar los datos de los formularios aquí
        console.log('Datos de formularios:', data);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener los formularios:', error);
      }
    );
  }

  onButtonClick(formulario: string, sub_form_two: string, name_form: string) {
    // Crear NavigationExtras para pasar el estado
    const navigationExtras: NavigationExtras = {
      state: { name_form: name_form }
    };

    switch (formulario) {
      case constConfig.URL_TIME_LINE_PENDDING_INCOME: // Ingresos pendientes component personalizado
      case constConfig.UR_PENDDING_LOCATION62: // Ingresos pendientes component personalizado      
        // Pasa `navigationExtras` como segundo parámetro, no dentro del array de la URL.
        this.router.navigate(['menu', this.id, 'list_pending', formulario, 'sub_form', sub_form_two], navigationExtras).then((e) => {
          if (e) {
            console.log('Navigation is successful!');
          } else {
            console.log('Navigation has failed!');
          }
        });
        break;

      default:
        // Navegación con estado
        this.router.navigate(['menu', this.id, 'forms', formulario], navigationExtras).then((e) => {
          if (e) {
            console.log('Navigation is successful!');
          } else {
            console.log('Navigation has failed!');
          }
        });
        break;
    }
  }

}

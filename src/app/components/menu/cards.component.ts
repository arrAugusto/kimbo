import { Component, OnInit, OnDestroy } from '@angular/core';
import { CardsService } from '../../services/view_kimbo/CardsService';
import { FormsCards } from '../../models/View_kimbo/GetCards';
import { ActivatedRoute, Router } from '@angular/router';
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

  onButtonClick(formulario: string, sub_form_two: string) {
    console.log(sub_form_two);
    
    switch (formulario) {
      case constConfig.URL_TIME_LINE_PENDDING_INCOME://Ingresos pendientes component personalizado
        this.router.navigate(['menu', this.id, 'ing_pendientes', formulario, 'sub_form', sub_form_two]).then((e) => {
          if (e) {
            console.log('Navigation is successful!');
          } else {
            console.log('Navigation has failed!');
          }
        });

        break;

      default:
        this.router.navigate(['menu', this.id, 'forms', formulario]).then((e) => {
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

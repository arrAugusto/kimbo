import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';
import { PenddingIncome } from '../../models/Ingresos/Pendding_income';
import { ThreeJsAnimationComponent } from '../threejs-animation/threejs-animation.component';
import { constConfig } from '../../env/constantsConfig';

@Component({
  selector: 'app-list-pending',
  templateUrl: './list-pending.component.html',
  styleUrls: ['./list-pending.css']
})
export class IngresosPendientesComponent implements OnInit, AfterViewInit {
  @ViewChild(ThreeJsAnimationComponent) triggerLoading!: ThreeJsAnimationComponent;

  id: string = '';
  redirectForm: string = '';
  sub_form_two: string = '';
  nameForm?: string = '';

  penddingIncomes: PenddingIncome[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ingresosServices: IngresosServices,
  ) {
  }
  private routeSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.isLoading = true;
    // Lógica para cargar los formularios
    this.ingresosServices.getPendingIncome().subscribe(
      (data) => {
        console.log(data.data);
        if (data.codeResponse === "00") {
          this.penddingIncomes = data.data;
          this.isLoading = false;
        }
      }
    );

    // Obtener el estado de navegación directamente desde history.state
    const state = history.state;
    if (state) {
      console.log('Received name_form from history.state:', state['name_form']);
      this.nameForm = state['name_form'];
    }

    // Obtener el parámetro 'id' de la URL inicialmente
    this.routeSub = this.route.params.subscribe((params) => {
      console.log(params);

      this.id = params['id'];
      this.redirectForm = params['form'];
      this.sub_form_two = params['sub_form'];

    });


  }
  ngOnDestroy() {
    // Asegúrate de cancelar la suscripción para evitar posibles fugas de memoria
    this.routeSub.unsubscribe();
  }
  ngAfterViewInit() {

  }
  onButtonClick(id_transaction_param: string, total_bultos: number) {
    console.log(this.sub_form_two);

    // Crear NavigationExtras combinando state y queryParams
    const navigationExtras: NavigationExtras = {
      state: { name_form: this.nameForm }, // Estado de navegación
      queryParams: { id_transaction: id_transaction_param, total_bultos_transaction: total_bultos } // Parámetros de consulta
    };

    // Navegar utilizando `navigationExtras` con `queryParams` y `state`
    this.router.navigate(['menu', this.id, 'forms', this.sub_form_two], navigationExtras).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';
import { PenddingIncome } from '../../models/Ingresos/Pendding_income';
import { ThreeJsAnimationComponent } from '../threejs-animation/threejs-animation.component';
import { constConfig } from '../../env/constantsConfig';

@Component({
  selector: 'app-ingresos-pendientes',
  templateUrl: './ingresos-pendientes.component.html',
  styleUrls: ['./ingresos-pendientes.component.css']
})
export class IngresosPendientesComponent implements OnInit, AfterViewInit {
  @ViewChild(ThreeJsAnimationComponent) triggerLoading!: ThreeJsAnimationComponent;

  id: string = '';
  redirectForm: string = '';
  sub_form_two: string = '';

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
    

    this.router.navigate(['menu', this.id, 'forms', this.sub_form_two],{ queryParams: { id_transaction: id_transaction_param, total_bultos_transaction: total_bultos } }).then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
    });


    ;
  }
}

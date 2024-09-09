import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';
import { PenddingIncome } from '../../models/Ingresos/Pendding_income';
import { ThreeJsAnimationComponent } from '../threejs-animation/threejs-animation.component';

@Component({
  selector: 'app-ingresos-pendientes',
  templateUrl: './ingresos-pendientes.component.html',
  styleUrls: ['./ingresos-pendientes.component.css']
})
export class IngresosPendientesComponent implements OnInit, AfterViewInit {
  @ViewChild(ThreeJsAnimationComponent) triggerLoading!: ThreeJsAnimationComponent;

  id: string = '';

  penddingIncomes: PenddingIncome[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ingresosServices: IngresosServices,
  ) { }
  private routeSub: Subscription = new Subscription();

  ngOnInit(): void {
    this.isLoading = true;
    // Lógica para cargar los formularios
    this.ingresosServices.getPendingIncome().subscribe(
      (data) => {
        console.log(data.data);
        if (data.codeResponse === "00") {
          this.penddingIncomes = data.data;

          this.loadingTimeOut(1500);
          
        }
      }
    );
  }
  ngAfterViewInit() {

  }

  loadingTimeOut(time: number) {
    // Espera 900 milisegundos (0.9 segundos) y luego activa la animación
    setTimeout(() => {
      this.triggerLoading.triggerAnimation(true);

      // Dentro del primer setTimeout, espera 1500 milisegundos (1.5 segundos) adicionales
      // para ejecutar el siguiente setTimeout. Esto ocurre después de los 900 ms iniciales.
      setTimeout(() => {
        this.isLoading = false; // Este código se ejecuta 1500 ms después de que el primer setTimeout ha terminado
      }, 1800); // 1500 milisegundos = 1.5 segundos (este es el último en ejecutarse)

    }, 500); // 900 milisegundos = 0.9 segundos (este es el primero en ejecutarse)


  }
  onButtonClick() {
    // Implementa la lógica para el clic del botón
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';
import { PenddingIncome } from '../../models/Ingresos/Pendding_income';
import { CommonModule } from '@angular/common'; // Importa CommonModule para ngFor

@Component({
  selector: 'app-ingresos-pendientes',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './ingresos-pendientes.component.html',
  styleUrls: ['./ingresos-pendientes.component.css'] // Corrige el nombre del campo a styleUrls
})
export class IngresosPendientesComponent implements OnInit {
  id: string = '';

  penddingIncomes: PenddingIncome[] = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ingresosServices: IngresosServices,
  ) { }
  private routeSub: Subscription = new Subscription();

  ngOnInit(): void {
    // Lógica para cargar los formularios
    this.ingresosServices.getPendingIncome().subscribe(
      (data) => {
          console.log(data.data);
          this.penddingIncomes = data.data;
      }
    );
  }

  onButtonClick() {
    // Implementa la lógica para el clic del botón
  }
}

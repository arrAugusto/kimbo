import { Component, OnInit } from '@angular/core';
import { PenddingIncome } from '../../models/Ingresos/Pendding_income';
import { ActivatedRoute, Router } from '@angular/router';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';

@Component({
  selector: 'app-firmas-docs',
  templateUrl: './firmas-docs.component.html',
  styleUrls: ['./firmas-docs.component.css']
})
export class FirmasDocsComponent implements OnInit {
  isLoading: boolean = true;
  id: string = '';
  redirectForm: string = '';
  sub_form_two: string = '';
  nameForm?: string = '';

  penddingIncomes: PenddingIncome[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ingresosServices: IngresosServices,
  ) { }

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
  }

}

import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/servicesCards/CardsService';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {

  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    this.cardsService.getForms().subscribe(
      (data) => {
        // Manejar los datos de los formularios aquí
        console.log('Datos de formularios:', data);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener los formularios:', error);
      }
    );
  }

  menus = [
    { title: 'Ingresos', description: 'Realiza ingresos.', link: '/ingresos' },
    { title: 'Gastos', description: 'Registra gastos.', link: '/gastos' },
    { title: 'Balance', description: 'Ver balance financiero.', link: '/balance' },
  ];

}

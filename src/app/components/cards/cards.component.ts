import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {

  menus = [
    { title: 'Ingresos', description: 'Realiza ingresos.', link: '/ingresos' },
    { title: 'Gastos', description: 'Registra gastos.', link: '/gastos' },
    { title: 'Balance', description: 'Ver balance financiero.', link: '/balance' }
  ];

}

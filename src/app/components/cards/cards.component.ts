import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/servicesCards/CardsService';
import { FormsCards } from '../models/Cards/GetCards';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  forms: FormsCards[] = [];
  constructor(private cardsService: CardsService, private router: Router) {
  }

  ngOnInit() {
    this.cardsService.getForms().subscribe(
      (data) => {
        this.forms = data;
        
        console.log(this.forms[0].ayuda);
        
        // Manejar los datos de los formularios aquí
        console.log('Datos de formularios:', data);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener los formularios:', error);
      }
    );
  }
  //
  onButtonClick(id: string) {
    this.router.navigate(['/forms', id]);
  }
  
}

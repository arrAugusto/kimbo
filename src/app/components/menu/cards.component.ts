import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/servicesCards/CardsService';
import { FormsCards } from '../../models/Cards/GetCards';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  forms: FormsCards[] = [];
  id: string = "";

  constructor(private cardsService: CardsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.forms = [];
    // Obtener el parámetro 'id' de la URL
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      // Aquí puedes utilizar el valor de 'id' como necesites
    });
    this.cardsService.getForms(this.id).subscribe(
      (data) => {
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
  //
  onButtonClick(id: string) {
    this.router.navigate(['/forms', id]);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../env/environment';
import { FormsCards } from '../../models/Cards/GetCards'; // Importa el modelo FormsCards

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  getForms(): Observable<FormsCards[]> { // Cambia el tipo de retorno aquí
      console.log(environment.apiUrl + "forms/getForms");

    return this.http.post<[]>(environment.apiUrl + "forms/getForms", {}); // Cambia el tipo de retorno aquí
  }
}

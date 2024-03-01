import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { FormsCards } from '../../models/Cards/GetCards'; // Importa el modelo FormsCards

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  constructor(private http: HttpClient) {}

  getForms(id: string): Observable<FormsCards[]> {
    // Pasar el 'id' como parámetro en la solicitud HTTP
    return this.http.get<FormsCards[]>(`${environment.apiUrl}forms/getForms/${id}`);
  }
}

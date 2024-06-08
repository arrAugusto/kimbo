import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InputKimbo } from '../../models/View_kimbo/InputKimbo';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class ViewFormKimbo {
  constructor(private http: HttpClient) {}

  getInputs(id: string): Observable<InputKimbo[]> {
    // Pasar el 'id' como parámetro en la solicitud HTTP
    return this.http.get<InputKimbo[]>(
      `${environment.apiUrl}forms/getFormulario/${id}`
    );
    

  }
}

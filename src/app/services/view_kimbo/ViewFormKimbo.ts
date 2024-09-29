import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InputKimbo } from '../../models/View_kimbo/InputKimbo';
import { environment } from '../../env/environment';

@Injectable({
  providedIn: 'root',
})
export class ViewFormKimbo {
  constructor(private http: HttpClient) { }

  getInputs(id: string, id_transaction_optional: string | null): Observable<InputKimbo[]> {
    // Construcción dinámica de la URL
    let url = `${environment.apiUrl}forms/getFormulario/${id}`;

    // Si el id_transaction_optional no es nulo, agregarlo como parámetro a la URL
    if (id_transaction_optional) {
      url += `?id_transaction=${id_transaction_optional}`;
    }

    // Hacer la solicitud HTTP GET con la URL resultante
    return this.http.get<InputKimbo[]>(url);
  }

}

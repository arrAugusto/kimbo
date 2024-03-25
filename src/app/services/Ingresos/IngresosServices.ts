import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { FormsCards } from '../../models/Cards/GetCards'; // Importa el modelo FormsCards
import { IngresoBodega } from '../../models/Ingresos/IngresoBodega';

@Injectable({
  providedIn: 'root',
})
export class IngresosServices {
  constructor(private http: HttpClient) {}

  newIngreso(ingresoBodega: IngresoBodega): Observable<FormsCards[]> {
    // Pasar el 'id' como parámetro en la solicitud HTTP
    return this.http.post<FormsCards[]>(
      `${environment.apiUrl}ingresos/crearte_ingreso`,
      ingresoBodega
    );
  }
}

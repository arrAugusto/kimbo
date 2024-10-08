import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { FormsCards } from '../../models/View_kimbo/GetCards'; // Importa el modelo FormsCards
import { IngresoBodega } from '../../models/Ingresos/IngresoBodega';
import { Cliente } from '../../models/Clientes/Cliente';
import { ResponseTransaction } from '../../models/View_kimbo/ResponseTransaction';
import { ResponsePenddingIncome } from '../../models/Ingresos/ResponsePenddingIncome';

@Injectable({
  providedIn: 'root',
})
export class IngresosServices {
  constructor(private http: HttpClient) {}

  newIngreso(ingresoBodega: IngresoBodega): Observable<ResponseTransaction> {
    // Pasar el 'id' como parámetro en la solicitud HTTP
    return this.http.post<ResponseTransaction>(`${environment.apiUrl}actions_store/income_withdrawal`, ingresoBodega);
  }

  getClient(nit: string, tipo_documento: string): Observable<Cliente> {
    // Pass the 'nit' as a parameter in the HTTP request
    return this.http.get<Cliente>(`${environment.apiUrl}clientes/get_nit_validar/${nit}/${tipo_documento}`);
  }  

  getPendingIncome(): Observable<ResponsePenddingIncome> {
    // Pass the 'nit' as a parameter in the HTTP request
    return this.http.get<ResponsePenddingIncome>(`${environment.apiUrl}actions_store/get_pendding_income/`);
  }  

}

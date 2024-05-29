import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/environment';
import { SidebarModel } from '../../models/SideBar/SideBarModels';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  constructor(private http: HttpClient) {}

  getSideBar(): Observable<SidebarModel[]> {
    // Cambia el tipo de retorno aquí
    return this.http.get<[]>(environment.apiUrl + 'forms/getSideNav', {}); // Cambia el tipo de retorno aquí
  }
}

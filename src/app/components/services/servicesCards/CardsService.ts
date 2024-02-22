import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {

  constructor(private http: HttpClient) {}

  getForms(): Observable<any> {
    return this.http.post<any>("http://localhost:8340/fenix_service/api/forms/getForms", {});
  }
}

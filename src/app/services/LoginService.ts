import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  startSession(session: any): Observable<any> {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    
    const url = `${environment.apiUrl}/usuarios/session`;
    console.log(url);
    
    return this.http.post<any>(url, session);
  }
}

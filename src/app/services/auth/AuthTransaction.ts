import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ResponseAuth } from "../../models/Auth/ResponseAuth";
import { Observable } from "rxjs";
import { environment } from "../../env/environment";
import { RequestAuth } from "../../models/Auth/RequestAuth";

@Injectable({
    providedIn: 'root',
})
export class AuthTransaction {
    constructor(private http: HttpClient) { }

    postAuthTransaction(requestAuth: RequestAuth): Observable<ResponseAuth> {
        // Envía requestAuth como el cuerpo de la solicitud POST
        return this.http.post<ResponseAuth>(`${environment.apiUrl}auth_transaction/auth_firma`, requestAuth);
    }
}

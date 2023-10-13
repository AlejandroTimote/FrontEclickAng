import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tipoDoc } from 'src/models/tipoDoc';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocService {

  private url = environment.apiUrl + tipoDoc.name;
  private token = environment.apiKey;

  constructor(private http:HttpClient) { }

  getAll(parameter:string):Observable<tipoDoc[]>{
    const requestBody = {parameter};
    return this.http.post<tipoDoc[]>(this.url + "/getAll", requestBody, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
    })
    );
  }
}

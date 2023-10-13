import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { pais } from 'src/models/pais';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url = environment.apiUrl + "manejoListas/pais";
  private token = environment.apiKey;

  constructor(private http:HttpClient) { }

  getAll(parameter: string):Observable<pais[]>{
    const requestBody = {parameter};
    return this.http.post<pais[]>(this.url + "/getAll", requestBody,{
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
    })
    );
  }
}

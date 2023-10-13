import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { departamento } from 'src/models/departamento';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private url = environment.apiUrl + "manejoListas/departamento";
  private token = environment.apiKey;

  constructor(private http:HttpClient) { }

  getAll(parameter: string):Observable<departamento[]>{
    const requestBody = {parameter};
    return this.http.post<departamento[]>(this.url + "/getAll", requestBody, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
    })
    );
  }
}

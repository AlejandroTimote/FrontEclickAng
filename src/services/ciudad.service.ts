import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { ciudad } from 'src/models/ciudad';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  respuesta: any;
  private url = environment.apiUrl + "manejoListas/ciudad/";
  private token = environment.apiKey;

  ciudadDto : ciudad = new ciudad();
  listCiudadDto : ciudad[];

  constructor(private http:HttpClient) { }

  // getXCodDepto(codDepto: string):Observable<ciudad[]>{
  //   return this.http.get<ciudad[]>(this.url + codDepto, { headers: { 'Authorization': `Bearer ${this.token}` } });
  // }

  getXCodDepto(codDepto: string): Observable<ciudad[]> {
    const requestBody = {codDepto}; // Convertir en objeto JSON
    return this.http.post<ciudad[]>(this.url + 'ciudadXCodDepto', requestBody, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
    })
    );
  }
}

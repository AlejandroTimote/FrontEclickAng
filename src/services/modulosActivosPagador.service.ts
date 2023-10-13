import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { proveedor } from 'src/models/proveedor';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { modulosActivosPagador } from 'src/models/modulosActivosPagador';

@Injectable({
  providedIn: 'root'
})
export class ModulosActivosPagadorService {

  respuesta: any;
  private url = environment.apiUrl + modulosActivosPagador.name;
  private token = environment.apiKey;

  constructor(private http:HttpClient) { }
  
  // getAll(nit: string, token):Observable<proveedor>{
  //   return this.http.get<proveedor>(this.url + "/getAll");
  // }

  getAll(): Observable<proveedor[]>{
    return this.http.post<proveedor[]>(this.url + '/getAll', {headers: { 'Authorization': `Bearer ${this.token}` }});
  }
  getModulosActivosPagador(codModulo: String): Observable<any> {
    const requestBody = {codModulo}; // Convertir en objeto JSON
    return this.http.post<any>(this.url + '/consModulXPag', requestBody, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
      })
      );
  }
}

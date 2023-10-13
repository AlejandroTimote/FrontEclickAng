import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { pagador } from 'src/models/pagador';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagadorService {

  // private url:string="http://localhost:8080/eClick-web/eClick/pagador/";
  respuesta: any;
  private url = environment.apiUrl + pagador.name;
  private token = environment.apiKey;

  constructor(private http:HttpClient) { }

  getAll():Observable<pagador[]>{
    return this.http.get<pagador[]>(this.url + "getAll");
  }

  getPagadorXCodEmpresa(codEmpresa: number): Observable<any> {
    const requestBody = {codEmpresa}; // Convertir en objeto JSON
    return this.http.post<any>(this.url + '/consPagxCod', requestBody, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
      })
    );
  }
}

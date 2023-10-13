import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { proveedor } from 'src/models/proveedor';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  respuesta: any;
  private url = environment.apiUrl + proveedor.name;
  private token = environment.apiKey;

  constructor(private http:HttpClient) { }
  
  // getAll(nit: string, token):Observable<proveedor>{
  //   return this.http.get<proveedor>(this.url + "/getAll");
  // }

  getAll(): Observable<proveedor[]>{
    return this.http.post<proveedor[]>(this.url + '/getAll', {headers: { 'Authorization': `Bearer ${this.token}` }});
  }
  
  // getProveedorXNit(nit: string):Observable<proveedor>{
  //   console.log(this.url);
  //   return this.http.get<proveedor>(this.url + "/consProvXNit/" + nit, { headers: { 'Authorization': `Bearer ${this.token}` } });
  // }
  // getProveedorXNit(nit: string): Observable<proveedor> {
  //   const requestBody = {nit}; // Convertir en objeto JSON
  //   return this.http.post<proveedor>(this.url + '/consProvXNit', requestBody, {
  //     headers: { 'Authorization': `Bearer ${this.token}` }
  //   });
  // }
  getProveedorXNit(nit: string): Observable<any> {
    const requestBody = {nit}; // Convertir en objeto JSON
    return this.http.post<any>(this.url + '/consProvXNit', requestBody, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
      })
      );
  }
  
  insertProveedores(provDto: proveedor): void{
    this.http.post<proveedor>(this.url, provDto).subscribe(
      Response =>{
        console.log("OK" + Response);
      }
    );
  }
  
  errorProv(): Observable<any>{
    return this.http.get<proveedor>(this.url + "/errores"
    );
  }
}

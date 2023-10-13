import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { usuario } from 'src/models/usuario';
import { solicitudUsuario } from 'src/models/solicitudUsuario';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  respuesta: any;
  private url = environment.apiUrl + usuario.name;
  private token = environment.apiKey;

  constructor(private http:HttpClient) { }

  getUsers(nit: string):Observable<any>{
    const requestBody = {nit};
    return this.http.post<usuario>(this.url, requestBody, {
      headers: { 'Authorization': `Bearer ${this.token}`}
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
      })
    );
  }
  insertSolicitud(solicitudUserDto: solicitudUsuario): Observable<solicitudUsuario>{
    return this.http.post<solicitudUsuario>(this.url + "/insertSoliUsuario", solicitudUserDto,{
      headers: { 'Authorization': `Bearer ${this.token}`}
    })
  }
  insertUsuario(usuarioDto: usuario): Observable<usuario>{
    return this.http.post<usuario>(this.url + "/insert", usuarioDto,{
      headers: { 'Authorization': `Bearer ${this.token}`}
    });
  }
  generaCodigo(usuarioDto: usuario): Observable<any>{
    return this.http.post<usuario>(this.url + "/generaCodigo", usuarioDto,{
      headers: { 'Authorization': `Bearer ${this.token}`}
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
      })
    );
  }
  correoContacto(usuarioDto: usuario): Observable<usuario>{
    return this.http.post<usuario>(this.url + "/correoContacto", usuarioDto,{
      headers: { 'Authorization': `Bearer ${this.token}`}
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error); // Devuelve el mensaje de error del cuerpo de la respuesta
      })
    );
  }
}

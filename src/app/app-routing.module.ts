import { NgModule } from '@angular/core';
import { PagadoresComponent } from './components/WEB/pagadores/pagadores.component';
import { HomeComponent } from './components/home/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { EquipoComponent } from './components/home/equipo/equipo.component';
import { ClientesComponent } from './components/home/clientes/clientes.component';
import { ContactoComponent } from './components/home/contacto/contacto.component';
import { RadianComponent } from './components/home/radian/radian.component';
import { ConfirmingComponent } from './components/home/confirming/confirming.component';
import { FactoringComponent } from './components/home/factoring/factoring.component';
import { EDigitalComponent } from './components/home/e-digital/e-digital.component';
import { ComunidadComponent } from './components/home/comunidad/comunidad.component';
import { FactelectronicaComponent } from './components/home/factelectronica/factelectronica.component';
import { Error404Component } from './components/paginaserrores/error404/error404.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordDialogComponentComponent } from './components/forgot-password-dialog-component/forgot-password-dialog-component.component';
import { ForgotUsernameDialogComponentComponent } from './components/forgot-username-dialog-component/forgot-username-dialog-component.component';

const routes: Routes = [
  {path: '' , component: HomeComponent},
  {path: 'home' , component: HomeComponent},
  {path: 'pagadores' , component: PagadoresComponent},
  {path: 'register' , component: RegisterComponent},
  {path: 'equipo' , component: EquipoComponent},
  {path: 'clientes' , component: ClientesComponent},
  {path: 'contacto' , component: ContactoComponent},
  {path: 'radian' , component: RadianComponent},
  {path: 'confirming' , component: ConfirmingComponent},
  {path: 'factoring' , component: FactoringComponent},
  {path: 'edigital' , component: EDigitalComponent},
  {path: 'comunidad' , component: ComunidadComponent},
  {path: 'factelectronica' , component: FactelectronicaComponent},
  {path: 'error404' , component: Error404Component},
  {path: 'login' , component: LoginComponent},
  {path: 'forgotPasswordDialogComponentComponent' , component: ForgotPasswordDialogComponentComponent},
  {path: 'forgotUsernameDialogComponentComponent' , component: ForgotUsernameDialogComponentComponent},
  {path: '**' , pathMatch: 'full', redirectTo: 'error404'},
];

const routerOptions: ExtraOptions = {
  anchorScrolling: "enabled",
  scrollPositionRestoration: 'enabled'
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

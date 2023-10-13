import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatDialogModule } from '@angular/material/dialog';

//Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagadoresComponent } from './components/WEB/pagadores/pagadores.component';
import { HomeComponent } from './components/home/home/home.component';
import { RegisterComponent } from './components/home/register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ModalModule } from 'ngx-bootstrap/modal'; // Importa el módulo Toastr
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
import {
  IPublicClientApplication,
  PublicClientApplication,
  BrowserCacheLocation,
  LogLevel,
  InteractionType,
} from '@azure/msal-browser';
import {
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalInterceptorConfiguration,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
  MsalBroadcastService,
  MsalService,
  MsalGuard,
  MsalRedirectComponent,
  MsalModule,
  MsalInterceptor,
} from '@azure/msal-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordDialogComponentComponent } from './components/forgot-password-dialog-component/forgot-password-dialog-component.component';
import { ForgotUsernameDialogComponentComponent } from './components/forgot-username-dialog-component/forgot-username-dialog-component.component';

const GRAPH_ENDPOINT = 'https://eclick.com.co/';
const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: 'f33f0c61-f677-4ffe-a71f-0f3bd552dcfc',
      redirectUri: 'https://eclick.com.co/'
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(GRAPH_ENDPOINT, ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}  

export function configureHttp(http: HttpClient) {
  return () => {
    http.get('http://18.223.67.46:8080/eClick-web/eClick/', { responseType: 'text' }).subscribe(() => {
      // La solicitud se completó con éxito, no hagas nada.
    }, () => {
      // La solicitud falló, es probable que sea una solicitud mixta.
      // Aquí puedes tomar medidas adecuadas, como mostrar un mensaje de advertencia.
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PagadoresComponent,
    HomeComponent,
    RegisterComponent,
    EquipoComponent,
    ClientesComponent,
    ContactoComponent,
    RadianComponent,
    ConfirmingComponent,
    FactoringComponent,
    EDigitalComponent,
    ComunidadComponent,
    FactelectronicaComponent,
    Error404Component,
    LoginComponent,
    ForgotPasswordDialogComponentComponent,
    ForgotUsernameDialogComponentComponent,
  ],
  imports: [
    BrowserModule,
    ScrollingModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    MsalModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: configureHttp,
      deps: [HttpClient],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent,MsalRedirectComponent,]
})
export class AppModule { }

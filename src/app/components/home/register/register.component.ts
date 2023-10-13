import { Component } from '@angular/core';
import { tipoDoc } from 'src/models/tipoDoc';
import { TipoDocService } from 'src/services/tipoDoc.service';
import { proveedor } from 'src/models/proveedor';
import { ProveedorService } from 'src/services/proveedor.service';
import { PaisService } from 'src/services/pais.service';
import { pais } from 'src/models/pais';
import { DepartamentoService } from 'src/services/departamento.service';
import { departamento } from 'src/models/departamento';
import { CiudadService } from 'src/services/ciudad.service';
import { ciudad } from 'src/models/ciudad';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { solicitudUsuario } from 'src/models/solicitudUsuario';
import { UsuarioService } from 'src/services/usuario.service';
import { usuario } from 'src/models/usuario';
import { AutorizadoXUsuario } from 'src/models/autorizadoXUsuario';
import { AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PagadorService } from 'src/services/pagador.service';
import { ModulosActivosPagadorService } from 'src/services/modulosActivosPagador.service';
import { modulosActivosPagador } from 'src/models/modulosActivosPagador';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  tipoDoc: tipoDoc[];
  pais: pais[];
  departamento: departamento[];
  ciudad: ciudad[];
  modulActivo: modulosActivosPagador[];
  // prov: Proveedor;
  // nit: string;
  nitProv="";
  codDepto = "Departamento";
  txt = "hola";

  
  activoCertificacion: Boolean;
  activoFE: Boolean;
  activoPP: Boolean;

  activeTab = 1;

  formRegister: FormGroup;
  
  estiloCE: Boolean;
  estiloFE: Boolean;
  estiloPP: Boolean;
  
  codigo: string;
  regAfectados : string;
  regAfectados1 : string;
  requestBody : string;
  
  continuaRegistro = 0;
  tipoRegistro = 0;
  registrarUsuario = 0;
  errorModal = 0;
  numeros: number[];

  tituloModal = "";

  errorMessage: string;
  showError: Boolean;
  validForm = false;
  muestraLabels = false;

  user: usuario = new usuario();
  prov: proveedor = new proveedor();
  solUser: solicitudUsuario = new solicitudUsuario();
  autorizados: AutorizadoXUsuario = new AutorizadoXUsuario();

  @ViewChild('myTabs', { static: false }) myTabs: ElementRef;
  @ViewChild('factElectronica', { static: false }) factElec: ElementRef;
  @ViewChild('CertTributarios', { static: false }) CertTribu: ElementRef;
  @ViewChild('seccion1') seccion1: ElementRef;
  
  constructor(private tipoDocService: TipoDocService,
    private proveedorService: ProveedorService,
    private pagadorService: PagadorService,
    private modulosActivosPagadorService: ModulosActivosPagadorService,
    private paisService: PaisService,
    private departamentoService: DepartamentoService,
    private ciudadService: CiudadService,
    private usuarioService: UsuarioService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private toastr: ToastrService
    ){}
    
  public secciones: Array<string> = ['primera', 'segunda', 'tercera', 'cuarta', 'quinta'];
    
  ngOnInit(): void {
    this.activoCertificacion = false;
    this.activoFE = true;
    this.estiloFE = false;
    this.estiloCE = true;
    this.estiloPP = true;

    console.log("A ver el tipo de registro " + this.tipoRegistro);

    this.prov.nombre = "Razón social";
    this.formRegister = new FormGroup({
      TipoDoc: new FormControl('Tipo documento', Validators.required),
      NumDoc: new FormControl(''),
      NitProv: new FormControl('', Validators.required),
      RazonSocial: new FormControl(''),
      Nombre: new FormControl('', Validators.required),
      Pais: new FormControl('País', Validators.required),
      CodDepto: new FormControl('Departamento', Validators.required),
      CodigoDane: new FormControl('Ciudad', Validators.required),
      Direccion: new FormControl('', Validators.required),
      Telefono: new FormControl('', Validators.required),
      Celular: new FormControl('', Validators.required),
      CodPagador: new FormControl('Pagador', Validators.required),
      Cargo: new FormControl('', Validators.required),
      Email: new FormControl('', Validators.required),
      ConfirmaEmail: new FormControl(''),
      Codigo: new FormControl(''),
    });
    
    this.paisService.getAll(this.requestBody).subscribe(
      e => this.pais=e,
      Response =>{
        this.regAfectados1 = Response.type;
        Swal.fire('Error!', Response.Descripcion, 'warning');
        if (this.regAfectados1.match("error")) {
          console.log("Response type", Response.type);
          Swal.fire('Error!', "No se pudo conectar al servidor", 'error');
        }
      },
    );
    this.tipoDocService.getAll(this.requestBody).subscribe(
      e => this.tipoDoc=e,
      Response =>{
        this.regAfectados1 = Response.type;
        Swal.fire('Error!', Response.Descripcion, 'warning');
        if (this.regAfectados1.match("error")) {
          Swal.fire('Error!', "No se pudo conectar al servidor", 'error');
        }
      },
    );
    this.departamentoService.getAll(this.requestBody).subscribe(
      e => this.departamento=e,
      Response =>{
        this.regAfectados1 = Response.type;
        Swal.fire('Error!', Response.Descripcion, 'warning');
        if (this.regAfectados1.match("error")) {
          Swal.fire('Error!', "No se pudo conectar al servidor", 'error');
        }
      },
    );
  }
  
  getProvXNit(nit: string){
    // console.log("lista " + this.tipoDoc);
    console.log("A ver el nit " + nit);
    this.proveedorService.getProveedorXNit(nit).subscribe(
      (e: any) => this.prov=e,
      Response =>{
        this.regAfectados1 = Response.Descripcion;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          // timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: Response.Descripcion
        })
      },
    );
  }
  getModulosActivosXCodModulo(codModulo: String){
    // console.log("lista " + this.tipoDoc);
    // this.numeros = new Array<number>(38,40,60);
    console.log("arreglo de numeros ", codModulo);
    this.modulosActivosPagadorService.getModulosActivosPagador(codModulo).subscribe(
      (e: any) => this.modulActivo=e,
      Response =>{
        this.regAfectados1 = Response.Descripcion;
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          // timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'error',
          title: Response.Descripcion
        })
      },
    );
  }
    
  getCiudadXCodDepto(codDepto: string){
    console.log("Entro al metodo " + codDepto);
    this.ciudadService.getXCodDepto(codDepto).subscribe(
      (e: any) => this.ciudad=e,
      Response =>{
        this.regAfectados1 = Response.Descripcion;
        Swal.fire('Error!', this.regAfectados1, 'warning');
      },
      );
    }
  
  cambiaTipoRegistro(){
    
    if (this.tipoRegistro == 0) {
      console.log("tipo factElec")
      this.user.roleId = 2
      this.tituloModal = "Registro para Facturación Electrónica";
    } else {
      console.log("tipo certificado")
      this.solUser.roleId = 19
      this.tituloModal = "Registro para Certificados Tributarios";
    }
  }
    
  generaCodigo(){

    if (this.formRegister.valid) {
      // this.user.nombre = this.prov.nombre;
      this.user.nombre = this.formRegister.value.Nombre;
      this.user.listAutorizados.push(this.autorizados);
      this.user.email = this.formRegister.value.Email;
      // this.user.confirmaEmail = this.formRegister.value.ConfirmaEmail;
    }

    if (this.formRegister.value.Email != this.formRegister.value.ConfirmaEmail) {
      console.log("Los email son diferentes ");
      // Para mostrar un toast
      // var toastContainer = document.getElementById('toastContainer');
      // var toast = new bootstrap.Toast(this.seccion1); // Puedes ajustar las opciones aquí
      // toast.show();


      // this.errorMessage = '¡Se produjo un error!';
      this.showError = true;
      this.toastr.success('Este es un mensaje de éxito.', 'Éxito', {
        timeOut: 3000, // Duración del mensaje en milisegundos
        progressBar: true
      });
    } else{
      this.usuarioService.generaCodigo(this.user).subscribe(
        Response =>{
          this.codigo = Response;
          console.log("OK genera: " + this.codigo);
        },
        error => {
          console.error('Error: ', error);
          // Maneja el error de alguna manera en tu aplicación
        });
    }
    console.log("A ver el codigo1: " + this.codigo);
  }

  muestraLabel(){
    console.log("Esta escribiendo en nit proveedor")
    this.muestraLabels = true;
  }

  onSubmit(){
    console.log("codempresa: " + this.prov.codEmpresa);
    this.autorizados.codEmpresa = this.prov.codEmpresa;
    this.autorizados.tipoUsuario = 2;
    // console.log("Entro al metodo submit " + this.formRegister.value);
    // console.log(this.formRegister.value);

    if (this.formRegister.valid) {
      // Llena los datos del usuario
      this.user.login = this.formRegister.value.Email;
      this.user.tipoEmpresa = 2;
      this.user.tipodoc = this.formRegister.value.TipoDoc;
      this.user.numdoc = this.formRegister.value.NitProv;
      this.user.nombre = this.formRegister.value.Nombre;
      this.user.pais = "CO";
      this.user.listAutorizados.push(this.autorizados);
      this.user.codDepto = this.formRegister.value.CodDepto;
      this.user.codigoDane = this.formRegister.value.CodigoDane;
      this.user.direccion = this.formRegister.value.Direccion;
      this.user.cargo = this.formRegister.value.Cargo;
      this.user.telefono = this.formRegister.value.Telefono;
      this.user.celular = this.formRegister.value.Celular;
      this.user.email = this.formRegister.value.Email;
      this.user.cambioAlInicio = 1;
      this.user.datosActualizados = 1;
      this.user.roleId = 2

      //Llena los datos de la solicitud de usuario
      this.solUser.login = this.formRegister.value.Email;
      this.solUser.tipoEmpresa = 2;
      this.solUser.tipodoc = this.formRegister.value.TipoDoc;
      this.solUser.numdoc = this.formRegister.value.NitProv;
      this.solUser.nombre = this.formRegister.value.Nombre;
      this.solUser.pais = "CO";
      this.solUser.depto = this.formRegister.value.CodDepto;
      this.solUser.municipio = this.formRegister.value.CodigoDane;
      this.solUser.direccion = this.formRegister.value.Direccion;
      this.solUser.cargo = this.formRegister.value.Cargo;
      this.solUser.telefono = this.formRegister.value.Telefono;
      this.solUser.celular = this.formRegister.value.Celular;
      this.solUser.email = this.formRegister.value.Email;
      this.solUser.roleId = 19
      this.solUser.tipoSolicitud = "impuestos";
      this.solUser.estadoSolicitud = 1;
      this.solUser.fechaSolicitud = new Date();
      this.solUser.codEmpAprueba = this.formRegister.value.CodPagador;
      this.solUser.tipoEmpAprueba = 1;
      this.solUser.codEmpUsuario = this.prov.codEmpresa;

      // if (this.formRegister.value.Email != this.formRegister.value.ConfirmaEmail) {
      //   console.log("Los correos no concuerdan");
      //   this.errorMessage = '¡Se produjo un error!';
      //   this.showError = true;
      // }
      console.log(this.formRegister.value);
    } else{
      // Swal.fire('Error!', 'Debe diligenciar el formulario completo.', 'error');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          // timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'warning',
          title: 'Debe diligenciar el formulario completo'
        });
    }

    console.log("A ver el codigo: " + this.codigo);
    
    
    if (this.tipoRegistro == 0) {
      this.usuarioService.insertUsuario(this.user).subscribe(
        Response =>{
          // this.regAfectados = Response;
          
          console.log("OK genera: " + Response);
        },
        error => {
          console.error('Error: ', error);
          // Maneja el error de alguna manera en tu aplicación
        }
        );
        Swal.fire('¡Éxito!', 'La operación se completó exitosamente.', 'success');
    } else{
      console.log(this.solUser);
      this.usuarioService.insertSolicitud(this.solUser).subscribe(
        Response =>{
          // this.regAfectados = Response;
          console.log("OK genera: " + Response);
          if (Response) {
            
          }
        },
        error => {
          console.error('Error: ', error);
          // Maneja el error de alguna manera en tu aplicación
        }
        );
        Swal.fire('¡Éxito!', 'La operación se completó exitosamente.', 'success');
        
    }
    
    // Reinicia el formulario
    this.prov.nombre = "Razón social";
    const emailControl: FormControl = this.formRegister.get('Email') as FormControl;
    const nitProvControl: FormControl = this.formRegister.get('NitProv') as FormControl;
    const nombreControl: FormControl = this.formRegister.get('Nombre') as FormControl;
    const numDocControl: FormControl = this.formRegister.get('NumDoc') as FormControl;
    const tipoDocControl: FormControl = this.formRegister.get('TipoDoc') as FormControl;
    const paisControl: FormControl = this.formRegister.get('Pais') as FormControl;
    const CodigoDaneControl: FormControl = this.formRegister.get('CodDepto') as FormControl;
    const codDaneControl: FormControl = this.formRegister.get('CodigoDane') as FormControl;
    const direccionControl: FormControl = this.formRegister.get('Direccion') as FormControl;
    const cargoControl: FormControl = this.formRegister.get('Cargo') as FormControl;
    const telefonoControl: FormControl = this.formRegister.get('Telefono') as FormControl;
    const celularControl: FormControl = this.formRegister.get('Celular') as FormControl;
    emailControl.reset();
    nitProvControl.reset();
    nombreControl.reset();
    numDocControl.reset();
    tipoDocControl.setValue('Tipo documento');
    paisControl.setValue('País');
    CodigoDaneControl.setValue('Departamento');
    codDaneControl.setValue('Ciudad');
    direccionControl.reset();
    cargoControl.reset();
    telefonoControl.reset();
    celularControl.reset();

    if (this.formRegister.value.Codigo != this.codigo) {
      console.log("El codigo es incorrecto, revise nuevamente");
    }

  }
  
  mostrarError(){
    //Valida los campos de la primera parte del registro
    if (this.formRegister.value.TipoDoc != undefined && this.formRegister.value.TipoDoc != ""
      && this.formRegister.value.NitProv != undefined && this.formRegister.value.NitProv != ""
      && this.formRegister.value.Nombre != undefined && this.formRegister.value.Nombre != ""
      && this.formRegister.value.CodDepto != undefined && this.formRegister.value.CodDepto != ""
      && this.formRegister.value.CodigoDane != undefined && this.formRegister.value.CodigoDane != ""
      && this.formRegister.value.Direccion != undefined && this.formRegister.value.Direccion != ""
      && this.formRegister.value.Cargo != undefined && this.formRegister.value.Cargo != ""
      && this.formRegister.value.Telefono != undefined && this.formRegister.value.Telefono != ""
      && this.formRegister.value.Celular != undefined && this.formRegister.value.Celular != ""
      && this.formRegister.value.NumDoc != undefined && this.formRegister.value.NumDoc != ""
      && this.formRegister.value.CodPagador != undefined && this.formRegister.value.CodPagador != ""
      ) {
      this.continuaRegistro = 1;
      this.errorModal = 0;
    }else{
      this.errorModal = 1;
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        // timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'warning',
        title: 'Debe diligenciar el formulario completo'
      })
      // Swal.fire('Error!', 'Todos los campos son requeridos.', 'error');
    }
  }
  
  muestraCertificado(){
    this.activoCertificacion = true;
    this.activoFE = false;
    this.activoPP = false;
    // this.estiloCertificado= {
      //   'background-color': '#3b7bc9'
      // }
      console.log("certificado: " + this.activoCertificacion + " FEE: " + this.activoFE);
    }
  muestraFE(){
    // this.activoFE = true;
    // this.activoPP = false;
    // this.activoCertificacion = false;

    console.log( "FE: " + this.activoFE + " CER: " + this.activoCertificacion);
  }
  
  muestraPP(){
    this.activoPP = true;
    this.activoFE = false;
    this.activoCertificacion = false;

    console.log( "FE: " + this.activoFE + " CER: " + this.activoCertificacion);
  }

  // ngAfterViewInit() {
  //   $(this.myTabs.nativeElement).find('.nav-link').on('click', (event) => {
  //     event.preventDefault();
  //     $.fn.tab.call($(event.target), 'show');
  //   });
  // }

}

import { Component,ElementRef, Renderer2,ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { usuario } from 'src/models/usuario';
import { UsuarioService } from 'src/services/usuario.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  activeTab = 1;
  constructor(private elementRef: ElementRef,
    private usuarioService: UsuarioService,) {}

  user: usuario = new usuario();

  formRegister: FormGroup;

  @ViewChild('negocios', { static: false })  negocios: ElementRef;
  @ViewChild('clientes', { static: false })  clientes: ElementRef;
  @ViewChild('equipo', { static: false })  equipo: ElementRef;
  @ViewChild('fondeos', { static: false })  fondeos: ElementRef;
  @ViewChild('contacto', { static: false })  contacto: ElementRef;
  radian:any;

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      Nombres: new FormControl('', Validators.required),
      Correo: new FormControl(''),
      Telefono: new FormControl('', Validators.required),
      Comentarios: new FormControl('')
    });
  }

  scrollToSection(tab: number) {
    // console.log(this.clientes);
    // console.log(this.boton);
    // this.seccion1.nativeElement.scrollIntoView({ behavior: 'smooth' });
    // this.router.navigate(['#radian']);
    // const sectionElement;
    if (tab == 0) {
      this.negocios.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if(tab == 1){
      this.radian = this.elementRef.nativeElement.querySelector('#radian').scrollIntoView({ behavior: 'smooth' });
    } else if(tab == 2){
      this.clientes.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if(tab == 3){
      this.equipo.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }else if(tab == 4){
      this.fondeos.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }else if(tab == 5){
      this.contacto.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    // this.renderer.setProperty(sectionElement, 'scrollTop', sectionElement.offsetTop);
    // return sectionElement;
  } 

  getCorreoContacto(){
    // console.log("lista " + this.tipoDoc);
    if (this.formRegister.valid) {
      // this.user.nombre = this.prov.nombre;
      this.user.nombre = this.formRegister.value.Nombres;
      this.user.email = this.formRegister.value.Correo;
      this.user.telefono = this.formRegister.value.Telefono;
      this.user.comentarios = this.formRegister.value.Comentarios;
      // this.user.confirmaEmail = this.formRegister.value.ConfirmaEmail;
    }
    console.log("A ver los datos de contacto: ", this.user)
    this.usuarioService.correoContacto(this.user).subscribe(
      Response =>{
        console.error('response correocontacto: ', Response);

        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: 'top-end',
        //   showConfirmButton: false,
        //   // timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.addEventListener('mouseenter', Swal.stopTimer)
        //     toast.addEventListener('mouseleave', Swal.resumeTimer)
        //   }
        // })
        
        // Toast.fire({
        //   icon: 'error',
        //   title: Response.Descripcion
        // })
      },
      error => {
        console.error('Error: ', error);
        // Maneja el error de alguna manera en tu aplicación
      }
    );
  }
}

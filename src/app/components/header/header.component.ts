import { Component, ViewChild, ElementRef} from '@angular/core';
import { HomeComponent } from "../home/home/home.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private elementRef: ElementRef) {}
  @ViewChild('menumobile') menuMobile: ElementRef;
  @ViewChild('botonmenu') botonmenu: ElementRef;
  miElemento = document.getElementById('nosotros');
  
  visible: Boolean = false;
  clase : string;

  ngOnInit(): void{
  }
  
  menu(){
    if (this.visible == false) {
      this.visible = true;
    } else{
      this.visible = false;
    }
    // console.log("Este es el menu ", this.menuNosotros.nativeElement.classList[1]);
    // this.menuMobile.nativeElement.style.display = 'block';
    // const nativeElement = this.menuMobile.nativeElement as HTMLElement;
    // nativeElement.style.display = 'block';
    // console.log("Este es el menu ", nativeElement.style);
    // if (this.miElemento != null) {
    //   this.miElemento.addEventListener('mouseenter', () => {
    //     // Hacer algo cuando el mouse entra en el elemento
    //     if (this.miElemento != null) {
    //       this.miElemento.textContent = 'Mouse está sobre mí';
    //     }
    //   });
    // }

    // this.clase = this.nosotros.nativeElement.classList.value;
    // // console.log("si matchea? ", this.clase);
    // this.clase.match("show")
    // if (!this.clase.match("show")) {
    //   console.log("Denso, si matchea ", this.nosotros.nativeElement.classList);
    //   this.nosotros.nativeElement.classList.add('menuNosotros');
    // }
  }
}
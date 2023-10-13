import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-factelectronica',
  templateUrl: './factelectronica.component.html',
  styleUrls: ['./factelectronica.component.css']
})
export class FactelectronicaComponent {

  scrollPercentage = 0;
  primeraSeccion = false;
  segundoSeccion = false;


  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    // Verificar la posición actual de desplazamiento
    // const scrollY = window.scrollY;
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    this.scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;
    // Aquí puedes realizar acciones cuando ocurre el evento de scroll.
    // Por ejemplo, puedes verificar la posición actual de desplazamiento, etc.
    // console.log("A ver el porcentaje",this.scrollPercentage);
    if (this.scrollPercentage  >= 2) {
      this.primeraSeccion = true;
      console.log('Despues de 2%', this.scrollPercentage);
    } else if (this.scrollPercentage < 2 || this.scrollPercentage  >= 7) {
      this.primeraSeccion = false;
    }
    
    if (this.scrollPercentage >=27) {
      console.log('Despues de 27%', this.scrollPercentage);
      this.segundoSeccion = true;
      
    }
  }
}

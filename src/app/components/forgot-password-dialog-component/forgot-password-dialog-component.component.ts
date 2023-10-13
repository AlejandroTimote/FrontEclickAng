// En el archivo TypeScript del componente de diálogo
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-forgot-password-dialog-component',
  templateUrl: './forgot-password-dialog-component.component.html',
  styleUrls: ['./forgot-password-dialog-component.component.css'],
})
export class ForgotPasswordDialogComponentComponent {
  @Output() codigoObtenido = new EventEmitter();

  user: string = '';
  correo: string = '';

  isCodigoBEnabled(): boolean {
    return this.user.length > 4 && this.correo.length > 4;
  }

  obtenerCodigo() {
    // Emitir un evento para informar al componente principal que se ha obtenido el código
    this.codigoObtenido.emit();
  }

  inputsDisabled: boolean = false;
  // Método para deshabilitar los campos de entrada
  disableInputs() {
    this.inputsDisabled = true;
  }
}

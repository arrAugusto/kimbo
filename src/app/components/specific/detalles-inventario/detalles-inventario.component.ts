import { Component } from '@angular/core';

@Component({
  selector: 'app-detalles-inventario',
  templateUrl: './detalles-inventario.component.html',
  styleUrl: './detalles-inventario.component.css'
})
export class DetallesInventarioComponent {
  currentStep: number = 1; // Inicialmente, el paso 1 está activo

  // Método opcional para avanzar al siguiente paso
  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  // Método opcional para retroceder al paso anterior
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}
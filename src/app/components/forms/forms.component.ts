import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngresoBodega } from '../../models/Ingresos/IngresoBodega';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  formularioForm: FormGroup;
  ingreso: IngresoBodega;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ingresosServices: IngresosServices
  ) {
    this.formularioForm = this.formBuilder.group({});
    // Inicialización del objeto ingreso con valores vacíos
    this.ingreso = {
      idTransaccion: '',
      usuario: '',
      idNit: '',
      idImages: '',
      canalDigital: '',
      fechaGarita: '',
      fechaBodega: '',
      fechaOperativa: '',
      codigo_transaccion: '',
      documento: '',
      codigoQR: '',
      bultos: '',
      montoTotal: '',
      area: '',
      documento_top_pay: '',
      document: '',
      nombre: '',
      boleta_de_pago: '',
      comments: '',
      auth_transaction: '',
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id']; // Aquí obtienes el valor del parámetro 'id'
      console.log(id); // Haz lo que necesites con el valor del parámetro
    });

    const formControls: { [key: string]: any } = {}; // Definimos un tipo explícito para formControls
    for (const input of this.inputs) {
      formControls[input.tag] = [null, Validators.pattern(input.pattern)];
    }
    this.formularioForm = this.formBuilder.group(formControls);


  }

  inputs = [
    {
      id: 'icon_prefix',
      type: 'text',
      tag: 'montoTotal',
      label: 'Montos Totales',
      icon: 'input',
      size: 's6',
      required: true,
      disabled: false,
      pattern: '[0-9]+(?:.[0-9]{1,2})?', // regex para permitir números con hasta 2 decimales
    },
  ];

  aplicarNewIng() {
    this.inputs.forEach((element) => {
      this.ingreso[element.tag as keyof IngresoBodega] =
        this.formularioForm.get(element.tag)?.value;
    });
    console.log(this.ingreso);
    var numeroRandom = Math.floor(Math.random() * 9e12) + 1e12;
    console.log(numeroRandom);
    this.ingreso.usuario = '1';
    this.ingreso.canalDigital = 'KIMBO_PAGE_WEB';
    this.ingreso.idTransaccion = numeroRandom.toString();
    this.ingresosServices.newIngreso(this.ingreso).subscribe(
      (data) => {
        // Limpiar la variable forms antes de asignarle los nuevos datos
        console.log(data);

        // Manejar los datos de los formularios aquí
        console.log('Datos de formularios:', data);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener los formularios:', error);
      }
    );
  }
}

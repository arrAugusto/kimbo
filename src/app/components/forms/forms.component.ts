import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngresoBodega } from '../../models/Ingresos/IngresoBodega';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  formularioForm: FormGroup;
  ingreso: IngresoBodega;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.formularioForm = this.formBuilder.group({});
    // Inicialización del objeto ingreso con valores vacíos
    this.ingreso = {
      idTransaccion: '',
      usuario: '',
      idNit: '',
      idImages: '',
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
      canalDigital: '',
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
      id: 'icon_telephone',
      type: 'tel',
      tag: 'codigoQR',
      label: 'Codigo QR',
      icon: 'qr_code',
      size: 's12',
      required: true,
      disabled: false,
      pattern: '^[A-Za-z0-9]+$', // regex para permitir solo caracteres alfanuméricos
    },
    {
      id: 'icon_prefix',
      type: 'text',
      tag: 'idNit',
      label: 'Nit',
      icon: 'input',
      size: 's6',
      required: true,
      disabled: false,
      pattern: '[0-9]{3}', // regex para permitir solo números de 3 dígitos
    },
    {
      id: 'icon_prefix',
      type: 'text',
      tag: 'documento',
      label: 'Núm de documento',
      icon: 'input',
      size: 's6',
      required: true,
      disabled: false,
      pattern: '[0-9]{3}', // regex para permitir solo números de 3 dígitos
    },
    {
      id: 'icon_prefix',
      type: 'text',
      tag: 'bultos',
      label: 'Cantidad de bultos',
      icon: 'input',
      size: 's6',
      required: true,
      disabled: false,
      pattern: '[0-9]{3}', // regex para permitir solo números de 3 dígitos
    },
    {
      id: 'icon_prefix',
      type: 'text',
      tag: 'montoTotal',
      label: 'Monto Total',
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
  }
}

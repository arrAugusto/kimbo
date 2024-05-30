import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngresoBodega } from '../../models/Ingresos/IngresoBodega';
import { InputKimbo } from '../../models/View_kimbo/InputKimbo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';
import { ViewFormKimbo } from '../../services/view_kimbo/ViewFormKimbo';
@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  formularioForm: FormGroup;
  ingreso: IngresoBodega;
  inputs: InputKimbo[] = [];
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ingresosServices: IngresosServices,
    private viewFormKimbo: ViewFormKimbo
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
      this.id = params['id'];
    });
    this.constructorViewForm();

    const formControls: { [key: string]: any } = {}; // Definimos un tipo explícito para formControls
    for (const input of this.inputs) {
      formControls[input.tag] = [null, Validators.pattern(input.pattern)];
    }
    this.formularioForm = this.formBuilder.group(formControls);

  }

  constructorViewForm() {
    this.viewFormKimbo.getInputs("56").subscribe(
      (data) => {
        // Limpiar la variable forms antes de asignarle los nuevos datos
        this.inputs = [];
        this.inputs = data;

        console.log(this.inputs);

        // Manejar los datos de los formularios aquí
        console.log('Datos de formularios:', data);
      },
      (error) => {
        // Manejar errores aquí
        console.error('Error al obtener los formularios:', error);
      }
    );
  }
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

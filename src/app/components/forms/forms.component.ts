import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngresoBodega } from '../../models/Ingresos/IngresoBodega';
import { InputKimbo } from '../../models/View_kimbo/InputKimbo';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';
import { ViewFormKimbo } from '../../services/view_kimbo/ViewFormKimbo';
declare var M: any;
import flatpickr from 'flatpickr';
import { Spanish } from 'flatpickr/dist/l10n/es.js';  // Cambiar a español si es necesario

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit, AfterViewInit {
  @ViewChild('datePicker', { static: false }) datePicker!: ElementRef;
  @ViewChild('timePicker', { static: false }) timePicker!: ElementRef;
  @ViewChild('datetimePicker') datetimePicker!: ElementRef;


  formularioForm: FormGroup;
  ingreso: IngresoBodega;
  inputs: InputKimbo[] = [];
  id: string = '';
  selectedDateTime?: string = '';  // Inicializar con un valor por defecto

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private ingresosServices: IngresosServices,
    private viewFormKimbo: ViewFormKimbo
  ) {
    this.formularioForm = this.formBuilder.group({});
    this.ingreso = {
      cliente_id: '',
      usuario_id: '',
      id_bodega: '',
      id_transaccion: '',
      referencia_almacen: '',
      canal_digital: '',
      auth_transaction: '',
      numero_factura: '',
      estado: '',
      fecha: '',
      fecha_operativa: '',
      bultos: '',
      valor: '',
      bl: '',
      documento: '',
      codigoQR: '',
      acta: '',
      arribo: '',
      generica_1: '',
      generica_2: '',
      generica_3: '',
      generica_4: '',
      generica_5: '',
      generica_6: '',
      generica_7: '',
      generica_8: '',
      codigo_transaccion: '',
      idImages: '',
      area: '',
      documento_topay: '',
      nombre: '',
      boleta_de_pago: '',
      comments: '',
      nombre_cliente: '',
      direccion_cliente: '',
      tipoDocumento: '',
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.constructorViewForm();
    // Inicializa el datepicker después de que el componente esté inicializado
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.datepicker');
      M.Datepicker.init(elems, {
        // opciones de configuración del datepicker
        format: 'yyyy-mm-dd'
      });
    });
  }

  ngAfterViewInit() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {});

  }

  constructorViewForm() {
    this.viewFormKimbo.getInputs('56').subscribe(
      (data) => {
        // Luego, cuando recibas los datos, puedes asignarlos a this.inputs
        this.inputs = data as InputKimbo[];
        console.log(this.inputs[1].options_view_kimbo);

        this.createFormularioDynamics();
        // Inicializar selects después de renderizar inputs
        setTimeout(() => {
          const elems = document.querySelectorAll('select');
          //this.formularioForm.controls['cliente_id'].disable();
          for (const input of this.inputs) {
            if (input.disabled) this.formularioForm.controls[input.tag].disable();
          }

          M.FormSelect.init(elems, {});

          // Inicializar el datepicker
          if (this.datePicker) {
            M.Datepicker.init(this.datePicker.nativeElement, {
              format: 'yyyy-mm-dd'
              // Opciones adicionales si es necesario
            });
          }

          // Inicializar el datetimepicker con flatpickr
          if (this.datetimePicker) {
            flatpickr(this.datetimePicker.nativeElement, {
              enableTime: true,
              dateFormat: 'Y-m-d H:i:S', // Formato: yyyy-mm-dd hh:mm:ss
              locale: Spanish,
              time_24hr: true
            });
          }

        }, 0);
      },
      (error) => {
        console.error('Error al obtener los formularios:', error);
      }
    );
  }
  disabledInputs() {

  }
  createFormularioDynamics() {
    const formControls: { [key: string]: any } = {};
    console.log(this.inputs);

    for (const input of this.inputs) {
      const validators = [];
      if (input.required) {
        validators.push(Validators.required);
      }
      if (input.pattern) {
        validators.push(Validators.pattern(input.pattern));
      }
      formControls[input.tag] = [null, validators];
    }

    this.formularioForm = this.formBuilder.group(formControls);
  }

  aplicarNewIng() {

    if (this.formularioForm.invalid) {
      // Si el formulario no es válido, marca todos los controles como tocados
      this.markFormGroupTouched(this.formularioForm);
      console.error('El formulario es inválido. Por favor, revisa los campos.');
    };


    this.inputs.forEach((element) => {
      this.ingreso[element.tag as keyof IngresoBodega] =
        this.formularioForm.get(element.tag)?.value;
    });
    console.log(this.ingreso);
    var numeroRandom = Math.floor(Math.random() * 1e10);

    console.log(numeroRandom);
    this.ingreso.usuario_id = '1';
    this.ingreso.cliente_id = '1';
    this.ingreso.id_bodega = '1';
    this.ingreso.canal_digital = 'KIMBO_PAGE_WEB';
    this.ingreso.id_transaccion = numeroRandom.toString();
    this.ingresosServices.newIngreso(this.ingreso).subscribe(
      (data) => {
        console.log(data);
        console.log('Datos de formularios:', data);
      },
      (error) => {
        console.error('Error al obtener los formularios:', error);
      }
    );
  }

  action_id_client() {
    console.log(this.formularioForm.get('tipoDocumento')?.value);

    this.ingresosServices
      .getClient(this.formularioForm.get('cliente_id')?.value, this.formularioForm.get('tipoDocumento')?.value)
      .subscribe(
        (data) => {
          console.log(data);
          console.log('Get NIT:', data);
        },
        (error) => {
          console.error('Error al obtener los formularios:', error);
        }
      );
  }

  // Método auxiliar para marcar todos los controles en el FormGroup como tocados
  markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

}



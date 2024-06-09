import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngresoBodega } from '../../models/Ingresos/IngresoBodega';
import { InputKimbo } from '../../models/View_kimbo/InputKimbo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';
import { ViewFormKimbo } from '../../services/view_kimbo/ViewFormKimbo';
declare var M: any;

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit, AfterViewInit {
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
          M.FormSelect.init(elems, {});
        }, 0);
      },
      (error) => {
        console.error('Error al obtener los formularios:', error);
      }
    );
  }

  createFormularioDynamics() {
    const formControls: { [key: string]: any } = {};
    console.log(this.inputs);

    for (const input of this.inputs) {
      formControls[input.tag] = [null, Validators.pattern(input.pattern)];
    }
    this.formularioForm = this.formBuilder.group(formControls);
  }

  aplicarNewIng() {
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
}

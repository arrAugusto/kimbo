import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; // Aquí obtienes el valor del parámetro 'id'
      console.log(id); // Haz lo que necesites con el valor del parámetro
    });
  }
  inputs = [
    {
      id: 'icon_telephone',
      type: 'tel',
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
      label: 'Nit',
      icon: 'input',
      size: 's4',
      required: true,
      disabled: false,
      pattern: '[0-9]{3}', // regex para permitir solo números de 3 dígitos
    },
    {
      id: 'icon_prefix',
      type: 'text',
      label: 'Núm de documento',
      icon: 'input',
      size: 's4',
      required: true,
      disabled: false,
      pattern: '[0-9]{3}', // regex para permitir solo números de 3 dígitos
    },
    {
      id: 'icon_prefix',
      type: 'text',
      label: 'Bultos',
      icon: 'input',
      size: 's4',
      required: true,
      disabled: false,
      pattern: '[0-9]{3}', // regex para permitir solo números de 3 dígitos
    },
    {
      id: 'icon_prefix',
      type: 'text',
      label: 'CIF',
      icon: 'input',
      size: 's4',
      required: true,
      disabled: false,
      pattern: '[0-9]{3}', // regex para permitir solo números de 3 dígitos
    },
    {
      id: 'icon_prefix',
      type: 'text',
      label: 'Impuestos',
      icon: 'input',
      size: 's4',
      required: true,
      disabled: false,
      pattern: '[0-9]{3}', // regex para permitir solo números de 3 dígitos
    },

  ];
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { PenddingIncome } from '../../models/Ingresos/Pendding_income';
import { ActivatedRoute, Router } from '@angular/router';
import { IngresosServices } from '../../services/Ingresos/IngresosServices';
import { RequestAuth } from '../../models/Auth/RequestAuth';
import { AuthTransaction } from '../../services/auth/AuthTransaction';
import { ThreeJsAnimationComponent } from '../threejs-animation/threejs-animation.component';
import { environment } from '../../env/environment';
import { ResponseAuth } from '../../models/Auth/ResponseAuth';

@Component({
  selector: 'app-firmas-docs',
  templateUrl: './firmas-docs.component.html',
  styleUrls: ['./firmas-docs.component.css']
})
export class FirmasDocsComponent implements OnInit {
  @ViewChild(ThreeJsAnimationComponent) triggerLoading!: ThreeJsAnimationComponent;

  isLoading: boolean = true;
  isSuccessAlert: boolean = false;
  id: string = '';
  redirectForm: string = '';
  sub_form_two: string = '';
  nameForm?: string = '';
  penddingIncomes: PenddingIncome[] = [];

  // Inicializa requestAuth con valores vacíos
  requestAuth: RequestAuth = {
    idTransaction: '',
    moduloFirma: '',
    referenciaUnica: ''
  };

  response: ResponseAuth = {
    codeResponse: '',
    messageResponse: '',
    data: [
      [
        {
          idTransaction: '',
          validadorComprobante: '',
          fecha_creacion: '',
          url_comprobante: ''
        }
      ]
    ]
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ingresosServices: IngresosServices,
    private authTransaction: AuthTransaction
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.ingresosServices.getPendingIncome().subscribe(
      (data) => {
        console.log(data.data);
        if (data.codeResponse === "00") {
          this.penddingIncomes = data.data;
          this.isLoading = false;
        }
      }
    );
  }

  onFirmarClick(referenciaUnica: string, config_form: string, id_transaccion: string) {
    this.isLoading = true;
  
    // Configura requestAuth con los valores recibidos como parámetros
    this.requestAuth = {
      idTransaction: id_transaccion,
      moduloFirma: config_form,
      referenciaUnica: referenciaUnica
    };
  
    console.log('requestAuth configurado:', this.requestAuth);
  
    // Llama a postAuthTransaction pasando requestAuth
    this.authTransaction.postAuthTransaction(this.requestAuth).subscribe(
      response => {
        console.log('Respuesta de la transacción de autenticación:', response);
        this.response = response;
  
        // Verifica si codeResponse es "00" para proceder
        if (this.response.codeResponse === "00") {
  
          // Activa la animación de éxito
          this.triggerLoading.triggerAnimation(true);
  
          setTimeout(() => {
            this.isSuccessAlert = true;
            this.isLoading = false;
            this.playSuccessSound(true);
  
            // Espera y luego abre el comprobante en la nueva ventana en el segundo timeout
            setTimeout(() => {
              console.log(this.response.data[0][0].url_comprobante);
              
              // Abre la URL del comprobante en una nueva ventana
              window.open(this.response.data[0][0].url_comprobante, '_blank');
              
              this.isSuccessAlert = false;
            }, 3500); // Tiempo en milisegundos para mostrar la alerta de éxito
          }, 1500); // Tiempo de la animación
        } else {
          // Manejo si codeResponse no es "00"
          console.warn('Transacción fallida:', this.response.messageResponse);
          this.isLoading = false;
          this.playSuccessSound(false);
        }
      },
      error => {
        console.error('Error en la transacción de autenticación:', error);
        this.isLoading = false;
        this.playSuccessSound(false); // Opcional para reproducir sonido de error
      }
    );
  }
  
  
  
  playSuccessSound(success: boolean) {
    const audioUrl = success ? environment.urlSuccesSound : environment.urlSuccesSoundError;
    const audio = new Audio(audioUrl);
    audio.play();
  }
}

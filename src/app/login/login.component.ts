import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importa el Router
import * as paper from 'paper';
import { LoginService } from '../services/LoginService';
import { constConfig } from '../env/constantsConfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  signUpForm!: FormGroup;
  loginForm!: FormGroup;
  showLogin: boolean = true; // Controla qué formulario se muestra
  isLoading: boolean = false; // Controla el estado de carga
  errorMessage: string = ''; // Mensaje de error

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {} // Inyecta el Router

  ngOnInit(): void {
    this.initializeForms();
  }

  ngAfterViewInit(): void {
    this.initializeCanvas();
  }

  initializeForms(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  initializeCanvas(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    paper.setup(canvas);

    const shapeGroup = new paper.Group();
    const colors = ['#673AB7', '#03A9F4', '#FF5722'];

    for (let i = 0; i < 50; i++) {
      const circle = new paper.Path.Circle({
        center: [
          Math.random() * paper.view.size.width,
          Math.random() * paper.view.size.height
        ],
        radius: Math.random() * 5 + 2,
        fillColor: colors[Math.floor(Math.random() * colors.length)]
      });
      shapeGroup.addChild(circle);
    }

    paper.view.onFrame = () => {
      shapeGroup.children.forEach((child) => {
        child.position.y += 1;
        if (child.position.y > paper.view.size.height) {
          child.position.y = 0;
        }
      });
    };
  }

  toggleLogin(): void {
    this.showLogin = true;
  }

  toggleSignUp(): void {
    this.showLogin = false;
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      console.log('Sign Up Data:', this.signUpForm.value);
    }
  }

  onLogin(): void {
    this.isLoading = true;
    this.errorMessage = '';
  
    const loginData = {
      usuario: this.loginForm.value.username,
      secrete_pass: this.loginForm.value.password,
      chanel: constConfig.PAGE_ORIGIN,
    };
    console.log(loginData);
  
    this.loginService.startSession(loginData).subscribe({
      next: (response) => {
        console.log(response);
  
        if (response.codeResponse === '00') {
          const userData = response.data[0]; // JSON completo del usuario
          localStorage.setItem('userData', JSON.stringify(userData)); // Guarda todo el objeto como JSON
          console.log('Datos de usuario guardados:', userData);
  
          // Redirigir a la página principal o de dashboard
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = response.messageResponse || 'Error desconocido';
        }
      },
      error: (error) => {
        console.error('Error en el inicio de sesión:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  
  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('password-login') as HTMLInputElement;
    const visibilityIcon = document.getElementById('toggleVisibilityIcon') as HTMLElement;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      visibilityIcon.textContent = 'visibility';
    } else {
      passwordField.type = 'password';
      visibilityIcon.textContent = 'visibility_off';
    }
  }
}

import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginService = inject(LoginService);
  errorMessage: string = '';
  router = inject(Router);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const response = await this.loginService.login(this.loginForm.value);
        console.log(response);
        this.router.navigate(['/']); // Navegar a la página principal o alguna otra página protegida
      } catch (error) {
        this.errorMessage = 'El usuario y/o contraseña son incorrectos';
        console.error('Error al iniciar sesión:', error);
      }
    } else {
      this.errorMessage = 'Por favor, complete todos los campos correctamente.';
    }
  }
}

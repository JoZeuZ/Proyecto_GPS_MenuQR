import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FooterComponentComponent } from './public/components/footer-component/footer-component.component';
import { IngredientPageComponent } from './Ingredientes/components/ingredient-page/ingredient-page.component';
import { UserPageComponent } from './users/components/user-page/user-page.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './auth/components/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from './auth/services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    CommonModule,
    FooterComponentComponent,
    IngredientPageComponent,
    UserPageComponent,
    LoginComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  currentRoute: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = this.router.url;
      });
  }

  async ngOnInit() {
    // Verifica si el usuario está autenticado al iniciar el componente
    this.isLoggedIn = this.loginService.getAuthStatus();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  isIngredientesRouteActive(): boolean {
    return this.currentRoute === '/ingredientes';
  }

  navigateToIngredientes() {
    this.router.navigate(['/ingredientes']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }

  isUsersRouteActive(): boolean {
    return this.currentRoute === '/users';
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      height: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoggedIn = this.loginService.getAuthStatus();;// Actualiza el estado de autenticación
        console.log(this.isLoggedIn);
        console.log('Login Correcto!');
      }
    });
  }

  async onLogout() {
    try {
      await this.loginService.logout();
      this.isLoggedIn = false;  // Actualiza el estado de autenticación
      this.router.navigate(['/']);
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  checkCookie() {
    console.log(this.loginService.getAuthStatus());
  }
  
}

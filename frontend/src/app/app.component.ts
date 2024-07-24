import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { FooterComponentComponent } from './public/components/footer-component/footer-component.component';
import { IngredientPageComponent } from './Ingredientes/components/ingredient-page/ingredient-page.component';
import { PedidoPageComponent } from './Pedido/components/pedido-page/pedido-page.component';
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
import { ReviewPageComponent } from './reviews/components/review-page/review-page.component';
import { ReviewCardComponent } from './reviews/components/review-card/review-card.component';
import { CallWaiterComponent } from './components/waiter-call-button/waiter-call-button.component';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatButtonModule,
    CommonModule,
    FooterComponentComponent,
    IngredientPageComponent,
    PedidoPageComponent,
    UserPageComponent,
    LoginComponent,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    ReviewPageComponent,
    ReviewCardComponent,
    CallWaiterComponent,
    CartIconComponent,
    CartPageComponent
  ],

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  currentRoute: string = '';
  isAuthenticated: boolean = false;

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

  ngOnInit() {
    this.isAuthenticated = this.loginService.isAuthenticated();
    // Suscribirse al estado de autenticación
    this.loginService.getAuthState().subscribe(authState => {
      this.isAuthenticated = authState;
    });
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  isIngredientesRouteActive(): boolean {
    return this.currentRoute === '/ingredientes';
  }

  isUsersRouteActive(): boolean {
    return this.currentRoute === '/users';
  }

  isReviewRouteActive(): boolean {
    return this.currentRoute === '/reviews';
  }

  isReviewCardRouteActive(): boolean {
    return this.currentRoute === '/reviewsCard';
  }

  isWaiterCallRouteActive(): boolean {
    return this.currentRoute === '/call-waiter';
  }

  isCartRouteActive(): boolean {
    return this.currentRoute === '/cart';
  }

  isRootRouteActive(): boolean {
    return this.currentRoute === '/';
  }

  isPedidosRouteActive(): boolean {
    return this.currentRoute === '/pedidos';
  }

  isLoginRouteActive(): boolean {
    return this.currentRoute === '/login';
  }

  navigateToIngredientes() {
    this.router.navigate(['/ingredientes']);
  }

  navigateToPedidos() {
    this.router.navigate(['/pedidos']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }

  navigateToReview() {
    this.router.navigate(['/reviews']);
  }

  navigateToReviewCard() {
    this.router.navigate(['/reviewsCard']);
  }

  navigateToWaiterCall() {
    this.router.navigate(['/call-waiter']);
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      height: '300px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Login Correcto!');
      }
    });
  }

  onLogout() {
    this.loginService.logout().subscribe({
      next: () => {
        this.isAuthenticated = false;
        this.router.navigate(['/']);  // Navegar a la página principal o alguna otra página después de cerrar sesión
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
}

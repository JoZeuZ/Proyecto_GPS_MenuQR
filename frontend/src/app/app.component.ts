import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
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
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { ReviewPageComponent } from './reviews/components/review-page/review-page.component';
import { ReviewCardComponent } from './reviews/components/review-card/review-card.component';
import { CartIconComponent } from './Cart/components/cart-icon/cart-icon.component';
import { CartPageComponent } from './Cart/components/cart-page/cart-page.component';
import { CartService } from './Cart/services/cart.service';
import { PagoPageComponent } from './Pago/components/pago-page/pago-page.component';
import { ProductosFormComponent } from './Menu/components/productos-page/productos-page.component';
import { MesasComponent } from './mesas/components/mesas.component';
import { MesapedidoComponent } from './mesapedido/components/mesapedido.component';

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
    ProductosFormComponent,
    CartIconComponent,
    CartPageComponent,
    MesasComponent,
    MesapedidoComponent,
    PagoPageComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'frontend';
  currentRoute: string = '';
  isAuthenticated: boolean = false;
  roles : string[] = [];

  private routeRoles: { [key: string]: string[] } = {
    '/users': ['Administrador'],
    '/ingredientes': ['Administrador', 'Mesero'],
    '/reviewsCard': ['Administrador', 'Mesero'],
    '/mesas': ['Administrador','Mesero'],
    // Añadir otras rutas y roles requeridos aquí
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService,
    private cookieService: CookieService,
    private route: ActivatedRoute,
    private cartService: CartService

  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = this.router.url;
        this.checkUserRouteAccess();
      });

  }

  getUserRole(): string[] {
    const token = this.cookieService.get('awa');
    if (!token) {
      return [];
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.roles ? decodedToken.roles.map((role: any) => role.name) : [];
  }


  ngOnInit() {
    this.isAuthenticated = this.loginService.isAuthenticated();
    // Suscribirse al estado de autenticación
    this.loginService.getAuthState().subscribe(authState => {
      this.isAuthenticated = authState;
    });
    const rol = this.getUserRole()
    console.log(rol + "");

    // Manejo de query params para QR
    this.route.queryParams.subscribe(params => {
      const Nmesa = params['mesa'];
      if (Nmesa) {
        this.cartService.setMesa(parseInt(Nmesa, 10));
        this.router.navigate(['/']);
        console.log('Mesa:', Nmesa);
      }
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

  isHomeRouteActive(): boolean {
    return this.currentRoute === '/';
  }

  checkUserRouteAccess() {
    this.roles = this.getUserRole();
    const requiredRoles = this.routeRoles[this.currentRoute];

    if (requiredRoles && !requiredRoles.some(role => this.roles.includes(role))) {
      this.router.navigate(['/']);
    }
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

  isPagoRouteActive(): boolean {
    return this.currentRoute === '/pago';
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

  navigateToPago() {
    this.router.navigate(['/pago']);
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }


  navigateToCart() {
    this.router.navigate(['/cart']);
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
        this.router.navigate(['/']);
        window.location.reload(); 
      },
      error: (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    });
  }
  
  navigateToReview() {
    this.router.navigate(['/reviews']);
  }
  
  navigateToReviewCard() {
    this.router.navigate(['/reviewsCard']);
  }

  isMesasRouteActive(): boolean {
    return this.currentRoute === '/mesas';
  }

  isMesaPedidoRouteActive(): boolean {
    return this.currentRoute.startsWith('/mesas/pedido');
  }

}

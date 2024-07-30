import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule, MatDialog} from '@angular/material/dialog';
import { NameDialogComponent } from '../name-dialog/name-dialog.component';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatDialogModule
  ]
})
export class CartPageComponent implements OnInit {
  cart: any[] = [];
  mesa: number | null = null;
  nombreCliente: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private cartService: CartService, 
    private router: Router,
    private dialog: MatDialog,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => this.cart = cart);
    this.cartService.mesa$.subscribe(mesa => this.mesa = mesa);
    this.cartService.nombreCliente$.subscribe(nombre => this.nombreCliente = nombre);
    this.isAuthenticated = this.loginService.isAuthenticated();

    if (!this.isAuthenticated) {
      this.openNameDialog();
    }
  }

  openNameDialog(): void {
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: { nombre: this.nombreCliente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.setNombreCliente(result);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  updateQuantity(productoId: string, cantidad: number): void {
    this.cartService.updateQuantity(productoId, cantidad);
  }
  
  goToMenu(): void {
    this.router.navigate(['/']);
  }

  goToPayment(): void {
    this.router.navigate(['/pago']);
  }
}

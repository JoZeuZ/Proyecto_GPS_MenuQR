import { Component } from '@angular/core';
import { CartService } from '../../../Cart/services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-pago-page',
  templateUrl: './pago-page.component.html',
  styleUrls: ['./pago-page.component.css'],
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
    MatDividerModule
  ]
})
export class PagoPageComponent {
  metodoPago: string = 'Efectivo';
  propina: number = 0;
  nombreCliente: string = '';
  cart: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });
    this.cartService.nombreCliente$.subscribe(nombre => this.nombreCliente = nombre);
  }

  calculateTotal() {
    this.total = this.cart.reduce((acc, product) => acc + (product.cantidad * product.precio), 0);
  }

  setTip(percentage: number) {
    this.propina = (this.total * percentage) / 100;
  }

  goBackToCart(): void {
    this.router.navigate(['/cart']);
  }

  confirmPayment() {
    this.cartService.setMetodoPago(this.metodoPago);
    this.cartService.setPropina(this.propina);
    this.cartService.confirmOrder().subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/confirmation']);
      },
      error: error => console.error('Error placing order:', error)
    });
  }
}
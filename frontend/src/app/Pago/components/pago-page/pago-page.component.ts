import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
  ]
})
export class PagoPageComponent {
  metodoPago: string = 'Efectivo';
  propina: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  confirmPayment() {
    const orderDetails = {
      cliente: 'Nombre del Cliente', // Aquí debo traer el nombre del cliente
      mesa: this.cartService.getMesa(),
      productos: this.cartService.getCart(),
      metodoPago: this.metodoPago,
      total: this.cartService.getCart().reduce((acc, item) => acc + item.precio * item.cantidad, 0),
      propina: this.propina
    };
    this.cartService.confirmOrder(orderDetails).subscribe({
      next: () => {
        this.cartService.clearCart();
        this.router.navigate(['/confirmation']); // pag que muestra un mensaje de confirmación
      },
      error: error => console.error('Error placing order:', error)
    });
  }
}

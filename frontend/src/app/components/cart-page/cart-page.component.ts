import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule
  ]
})
export class CartPageComponent implements OnInit {
  cart: any[] = [];
  mesa: number | null = null;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => this.cart = cart);
    this.cartService.mesa$.subscribe(mesa => this.mesa = mesa);
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  goToMenu(): void {
    this.router.navigate(['/']);
  }

  realizarPedido(): void {
    const orderDetails = {
      cliente: 'Nombre del Cliente',  // Aquí puedes obtener el nombre real del cliente
      metodoPago: 'Tarjeta',  // Puedes obtener este valor dinámicamente
      propina: 0  // Puedes obtener este valor dinámicamente
    };
    this.cartService.confirmOrder(orderDetails).subscribe(() => {
      this.cartService.clearCart();
      this.router.navigate(['/']);
    });
  }
}

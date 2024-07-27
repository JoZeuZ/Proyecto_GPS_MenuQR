import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ]
})
export class CartPageComponent implements OnInit {
  cart: any[] = [];
  mesa: number | null = null;
  nombreCliente: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => this.cart = cart);
    this.cartService.mesa$.subscribe(mesa => this.mesa = mesa);
    this.cartService.nombreCliente$.subscribe(nombre => this.nombreCliente = nombre);
  }

  removeItem(index: number): void {
    this.cartService.removeFromCart(index);
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }

  goToPayment(): void {
    this.cartService.setNombreCliente(this.nombreCliente);
    this.router.navigate(['/pago']);
  }
}

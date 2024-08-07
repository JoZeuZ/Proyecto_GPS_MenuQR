import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CartIconComponent implements OnInit {
  cartItemCount: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = items.reduce((sum, item) => sum + item.cantidad, 0);
    });
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }
}

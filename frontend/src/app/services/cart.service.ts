import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>(this.getCartItemsFromLocalStorage());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  private getCartItemsFromLocalStorage(): any[] {
    if (typeof window !== 'undefined' && localStorage.getItem('cartItems')) {
      return JSON.parse(localStorage.getItem('cartItems') || '[]');
    }
    return [];
  }

  private setCartItemsToLocalStorage(items: any[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(items));
    }
  }

  addToCart(item: any): void {
    const currentItems = this.cartItemsSubject.value;
    currentItems.push(item);
    this.setCartItemsToLocalStorage(currentItems);
    this.cartItemsSubject.next(currentItems);
  }

  removeFromCart(index: number): void {
    const currentItems = this.cartItemsSubject.value;
    currentItems.splice(index, 1);
    this.setCartItemsToLocalStorage(currentItems);
    this.cartItemsSubject.next(currentItems);
  }

  clearCart(): void {
    this.setCartItemsToLocalStorage([]);
    this.cartItemsSubject.next([]);
  }
}
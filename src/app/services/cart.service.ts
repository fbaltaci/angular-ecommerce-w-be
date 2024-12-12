import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICartItem } from '../models/ICartItem';

/**
 * CartService to interact with other components.
 * This Service is not connected to any API.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly localStorageKey = 'guestCart';
  private cartItemsSubject = new BehaviorSubject<ICartItem[]>(
    this.getCartFromLocalStorage()
  );
  private cartItemCountSubject = new BehaviorSubject<number>(
    this.calculateCartItemCount()
  );

  cartItems: Observable<ICartItem[]> = this.cartItemsSubject.asObservable();
  cartItemCount: Observable<number> = this.cartItemCountSubject.asObservable();

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Add an item to the cart.
   *
   * @param cartItem - The item to add.
   */
  addToCart(items: ICartItem[]): void {
    const currentCart = this.getCartFromLocalStorage();
    items.forEach((item) => {
      const existingItemIndex = currentCart.findIndex(
        (cartItem) => cartItem.productId === item.productId
      );
      if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].quantity += item.quantity;
      } else {
        currentCart.push(item);
      }
    });
  
    this.updateCartInLocalStorage(currentCart);
  }  

  /**
   * Remove an item from the cart.
   *
   * @param productId - The ID of the product to remove.
   */
  removeFromCart(productId: number): void {
    const currentCart = this.getCartFromLocalStorage();
    const updatedCart = currentCart.filter(
      (item) => item.productId !== productId
    );

    this.updateCartInLocalStorage(updatedCart);
  }

  /**
   * Clear the cart.
   */
  clearCart(): void {
    localStorage.removeItem(this.localStorageKey);
    this.cartItemsSubject.next([]);
    this.cartItemCountSubject.next(0);
  }

  /**
   * Get the current cart items from localStorage.
   *
   * @returns An array of cart items.
   */
  private getCartFromLocalStorage(): ICartItem[] {
    return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
  }

  /**
   * Save the updated cart to localStorage and update subjects.
   *
   * @param cart - The updated cart.
   */
  private updateCartInLocalStorage(cart: ICartItem[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(cart));
    this.cartItemsSubject.next(cart);
    this.cartItemCountSubject.next(this.calculateCartItemCount(cart));
  }

  /**
   * Calculate the total quantity of items in the cart.
   *
   * @param cart - The cart to calculate from (optional, defaults to the current cart).
   * @returns The total quantity of items in the cart.
   */
  private calculateCartItemCount(
    cart: ICartItem[] = this.getCartFromLocalStorage()
  ): number {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}

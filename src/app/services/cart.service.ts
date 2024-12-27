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
  private cartItemsSubject: BehaviorSubject<ICartItem[]>;
  private cartItemCountSubject: BehaviorSubject<number>;
  cartItems: Observable<ICartItem[]>;
  cartItemCount: Observable<number>;

  /**
   * Constructor
   */
  constructor() {
    const defaultCartKey = 'guestCart';
    const initialCart = this.getCartFromLocalStorage(defaultCartKey);
    const initialItemCount = this.calculateCartItemCount(
      defaultCartKey,
      initialCart
    );

    this.cartItemsSubject = new BehaviorSubject<ICartItem[]>(initialCart);
    this.cartItemCountSubject = new BehaviorSubject<number>(initialItemCount);

    this.cartItems = this.cartItemsSubject.asObservable();
    this.cartItemCount = this.cartItemCountSubject.asObservable();
  }

  /**
   * Add an item to the cart.
   *
   * @param cartKey - The local storage key to add the item to
   * @param cartItem - The item to add.
   */
  addToCart(cartKey: string, items: ICartItem[] | ICartItem): void {
    const currentCart = this.getCartFromLocalStorage(cartKey);
    const itemsToAdd = Array.isArray(items) ? items : [items];

    itemsToAdd.forEach((item) => {
      const existingItemIndex = currentCart.findIndex(
        (cartItem) => cartItem.productId === item.productId
      );
      if (existingItemIndex !== -1) {
        currentCart[existingItemIndex].quantity += item.quantity;
      } else {
        currentCart.push(item);
      }
    });

    this.updateCartInLocalStorage(cartKey, currentCart);
  }

  /**
   * Remove an item from the cart.
   *
   * @param cartKey - The local storage key to add the item to
   * @param productId - The ID of the product to remove.
   */
  removeFromCart(cartKey: string, productId: number): void {
    const currentCart = this.getCartFromLocalStorage(cartKey);
    const updatedCart = currentCart.filter(
      (item) => item.productId !== productId
    );

    this.updateCartInLocalStorage(cartKey, updatedCart);

    this.cartItemsSubject.next(updatedCart);
    this.cartItemCountSubject.next(this.calculateCartItemCount(cartKey, updatedCart));
  }

  /**
   * Clear the cart.
   *
   * @param cartKey - The key to clear the cart from
   */
  clearCart(cartKey: string): void {
    localStorage.removeItem(cartKey);
    this.cartItemsSubject.next([]);
    this.cartItemCountSubject.next(0);
  }

  /**
   * Get the current cart items from localStorage.
   *
   * @param cartKey - The key to clear the cart from
   * @returns An array of cart items.
   */
  private getCartFromLocalStorage(cartKey: string): ICartItem[] {
    try {
      return JSON.parse(localStorage.getItem(cartKey) || '[]');
    } catch (e) {
      console.error('Error parsing cart data from localStorage', e);
      return [];
    }
  }

  /**
   * Save the updated cart to localStorage and update subjects.
   *
   * @param cartKey - The key to clear the cart from
   * @param cart - The updated cart.
   */
  private updateCartInLocalStorage(cartKey: string, cart: ICartItem[]): void {
    localStorage.setItem(cartKey, JSON.stringify(cart));
    this.cartItemsSubject.next(cart);
    this.cartItemCountSubject.next(this.calculateCartItemCount(cartKey, cart));
  }

  /**
   * Calculate the total quantity of items in the cart.
   *
   * @param cart - The cart to calculate from
   * @returns The total quantity of items in the cart.
   */
  private calculateCartItemCount(cartKey: string, cart: ICartItem[] = this.getCartFromLocalStorage(cartKey)): number {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }
}

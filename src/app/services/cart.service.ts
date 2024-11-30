import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * CartService to interact with other components.
 * This Service is not connected to any API.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount: Observable<number> = this.cartItemCountSubject.asObservable();

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Update the cart item count.
   *
   * @param count - Number of items in the cart.
   */
  updateCartItemCount(count: number): void {
    this.cartItemCountSubject.next(count);
  }
}

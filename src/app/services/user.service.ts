import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * UserService
 * This service has no API calls.
 * This Service is not connected to any API.
 */
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isUserLoggedIn);
  public userLoggedIn$: Observable<boolean> = this.userLoggedInSubject.asObservable();

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Check if the user is logged in
   */
  get isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Notify components about login state change
   */
  updateUserLoggedInState(isLoggedIn: boolean): void {
    this.userLoggedInSubject.next(isLoggedIn);
  }

  /**
   * Gets the customer id from the local storage
   */
  get customerId(): number {
    const customerId = localStorage.getItem('customerId');
    return customerId ? Number(customerId) : 0;
  }

  /**
   * Gets the cart id from the local storage
   */
  get cartId(): number {
    const cartId = localStorage.getItem('cartId');
    return cartId ? Number(cartId) : 0;
  }
}

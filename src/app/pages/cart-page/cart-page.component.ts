import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../models/ICreateCartPayload';
import { ECommerceService } from '../../services/ecommerce.service';

/**
 * Cart Page Component
 */
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartItems: ICartItem[] = [];
  isUserLoggedIn: boolean = false;
  cartTotal: number = 0;

  // Privates
  private readonly GUEST_CART_KEY = 'guestCart';
  private readonly CUSTOMER_CART_KEY = 'customerCart';

  /**
   * Constructor
   *
   * @param _ecommerceService ECommerceService
   */
  constructor(private _ecommerceService: ECommerceService) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.isUserLoggedIn = !!localStorage.getItem('token');

    if (this.isUserLoggedIn) {
      this.loadUserCart();
    } else {
      this.loadGuestCart();
    }
  }

  /**
   * Checks out the cart items
   */
  onCheckoutClick(): void {
    console.log('this.cartItems: ', this.cartItems);
  }

  /**
   * Removes an item from the cart
   *
   * @param item - The ID of the product to remove
   */
  onRemoveItemFromCart(item: ICartItem): void {
    const cartKey = this.isUserLoggedIn ? this.CUSTOMER_CART_KEY : this.GUEST_CART_KEY;
    const currentCart = this.getCartFromLocalStorage(cartKey);
    const updatedCart = currentCart.filter((cartItem) => cartItem.productId !== item.productId);

    this.updateCartInLocalStorage(cartKey, updatedCart);
    this.cartItems = updatedCart;
    this.calculateCartTotal();
  }

  /**
   * Load guest cart from localStorage
   */
  private loadGuestCart(): void {
    this.cartItems = this.getCartFromLocalStorage(this.GUEST_CART_KEY);
    this.calculateCartTotal();
  }

  /**
   * Load user cart from API
   */
  private loadUserCart(): void {
    const cartId = localStorage.getItem(this.CUSTOMER_CART_KEY);
    if (cartId) {
      this._ecommerceService.getCartItems(cartId).subscribe({
        next: (response) => {
          this.cartItems = response.data[0].cartItems;
          this.calculateCartTotal();
        },
        error: (error) => {
          console.error('Error fetching user cart:', error);
          this.cartItems = [];
        },
      });
    } else {
      console.warn('No cart ID found for logged-in user.');
    }
  }

  /**
   * Get cart data from localStorage
   * @param cartKey - The key for the cart in localStorage
   * @returns An array of cart items
   */
  private getCartFromLocalStorage(cartKey: string): ICartItem[] {
    try {
      return JSON.parse(localStorage.getItem(cartKey) || '[]');
    } catch (error) {
      console.error(`Error retrieving cart for key ${cartKey}:`, error);
      return [];
    }
  }

  /**
   * Save updated cart to localStorage
   * @param cartKey - The key for the cart in localStorage
   * @param cartItems - The updated cart items
   */
  private updateCartInLocalStorage(cartKey: string, cartItems: ICartItem[]): void {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }

  /**
   * Calculate the total price of items in the cart
   */
  private calculateCartTotal(): void {
    this.cartTotal = this.cartItems.reduce(
      (total, item) => total + item.productPrice * item.quantity,
      0
    );
  }
}

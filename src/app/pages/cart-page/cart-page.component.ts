import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../models/ICartItem';
import { ECommerceService } from '../../services/ecommerce.service';
import { ICartItemsResponse } from '../../models/ICartItemsResponse';

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
  cartItem!: ICartItem[];
  cartItemsResponse: ICartItemsResponse[] = [];
  cartTotal: number = 0;
  customerId: number = 1773; // Use actual customer ID

  /**
   * Constructor
   *
   * @param _ecommerceService ECommerce Service
   */
  constructor(private _ecommerceService: ECommerceService) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.fetchCartItems();
  }

  /**
   * Fetches cart items for the customer and calculates total
   */
  private fetchCartItems(): void {
    if (this.customerId) {
      this._ecommerceService
        .getCartItems(this.customerId)
        .subscribe((cartItemsResponse) => {
          this.cartItem = cartItemsResponse.data.cartItems;
          this.cartItemsResponse = Array.isArray(cartItemsResponse)
            ? cartItemsResponse
            : [cartItemsResponse];
          this.calculateCartTotal();
        });
    }
  }

  /**
   * Calculates the total price of items in the cart
   */
  private calculateCartTotal(): void {
    if (!this.cartItemsResponse || !Array.isArray(this.cartItemsResponse))
      return;

    this.cartTotal = this.cartItemsResponse.reduce((total, cart) => {
      const cartSubtotal = cart.data.cartItems.reduce(
        (subtotal, item) => subtotal + item.productPrice * item.quantity,
        0
      );
      return total + cartSubtotal;
    }, 0);
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../models/ICartItem';
import { ECommerceService } from '../../services/ecommerce.service';
import { ICartItemsResponse } from '../../models/ICartItemsResponse';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

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

  isUserLoggedIn: boolean = false;
  customerId: number = 0;
  cartId: number = 0;
  cartTotal: number = 0;

  /**
   * Constructor
   *
   * @param _ecommerceService ECommerce Service
   * @param userService User Service
   */
  constructor(
    private _ecommerceService: ECommerceService,
    private userService: UserService
  ) {
    this.cartId = this.userService.cartId;
  }

  /**
   * ngOnInit
   */
  ngOnInit(): void {    
    this.userService.userLoggedIn$.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
      this.customerId = isLoggedIn ? this.userService.customerId : 0;
    });
    this.fetchCartItems();
  }

  /**
   * Fetches cart items for the customer and calculates total
   */
  private fetchCartItems(): void {
    if (this.isUserLoggedIn) {
      this._ecommerceService
        .getCartItems(this.cartId)
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
      const cartSubtotal = cart.data.cartItems.reduce((subtotal, item) => subtotal + item.productPrice * item.quantity, 0);
      return total + cartSubtotal;
    }, 0);
  }
}

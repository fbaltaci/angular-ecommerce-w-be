import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../models/ICartItem';
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
  cartItem!: ICartItem[];
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
    this._ecommerceService
      .getCartItems(this.customerId)
      .subscribe((response) => {
        this.cartItem = response.data.cartItems;
        this.calculateCartTotal();
      });
  }

  /**
   * Calculates the total price of items in the cart
   */
  private calculateCartTotal(): void {
    if (!this.cartItem || !Array.isArray(this.cartItem)) return;

    this.cartTotal = this.cartItem.length;
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ECommerceService } from '../../services/ecommerce.service';
import { CartPreviewComponent } from '../cart-preview/cart-preview.component';

/**
 * Header component
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, CartPreviewComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showCartPreview: boolean = false;
  customerId: number = 1773; // Replace with actual customer ID from your logic
  cartItemCount: number = 0;

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
    this.fetchCartItemsCount();
  }

  /**
   * Fetches cart items for the customer and calculates the total count
   */
  private fetchCartItemsCount(): void {
    this._ecommerceService
      .getCartItems(this.customerId)
      .subscribe((cartResponse) => {
        this.cartItemCount = cartResponse.data.cartItems.length;
      });
  }
}

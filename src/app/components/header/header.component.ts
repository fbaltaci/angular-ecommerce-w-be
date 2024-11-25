import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ECommerceService } from '../../services/ecommerce.service';
import { CartPreviewComponent } from '../cart-preview/cart-preview.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { CartService } from '../../services/cart.service';
import { ProfilePreviewComponent } from '../profile-preview/profile-preview.component';

/**
 * Header component
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CartPreviewComponent,
    TopNavComponent,
    ProfilePreviewComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showCartPreview: boolean = false;
  showProfilePreview: boolean = false;
  cartId: number = 7;
  cartItemCount: number = 0;

  /**
   * Constructor
   *
   * @param _ecommerceService ECommerceService
   * @param cartService CartService
   */
  constructor(
    private _ecommerceService: ECommerceService,
    private cartService: CartService
  ) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.cartService.cartItemCount.subscribe((count) => {
      console.log('count: ', count);
      this.cartItemCount = count;
    });
    this.fetchCartItemsCount();
  }

  /**
   * Fetches cart items for the customer and calculates the total count
   */
  private fetchCartItemsCount(): void {
    this._ecommerceService
      .getCartItems(this.cartId)
      .subscribe((cartResponse) => {
        const currentTotal = cartResponse.data.cartItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        this.cartService.updateCartItemCount(currentTotal);
      });
  }
}

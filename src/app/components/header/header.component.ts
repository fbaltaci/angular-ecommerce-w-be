import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ECommerceService } from '../../services/ecommerce.service';
import { CartPreviewComponent } from '../cart-preview/cart-preview.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { CartService } from '../../services/cart.service';
import { ProfilePreviewComponent } from '../profile-preview/profile-preview.component';
import { UserService } from '../../services/user.service';

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
  cartId: string = '';

  /**
   * Constructor
   *
   * @param _ecommerceService ECommerceService
   * @param cartService CartService
   */
  constructor(
    private _ecommerceService: ECommerceService,
    private cartService: CartService,
    private userService: UserService
  ) {
    this.cartId = this.userService.cartId;
  }

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
    if (this.userService.isUserLoggedIn) {
      this._ecommerceService
        .getCartItems(this.userService.cartId)
        .subscribe((cartResponse) => {
          this.cartService.addToCart('customerCart', cartResponse.data.cartItems);
        });
    }
  }
}

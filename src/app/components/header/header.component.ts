import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ECommerceService } from '../../services/ecommerce.service';
import { CartPreviewComponent } from '../cart-preview/cart-preview.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
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
  cartId: string = '';
  cartItemCount: number = 0;
  isUserLoggedIn: boolean = false;

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
    this.checkLoginState();
    this.fetchCartItemsCount();
  }

  /**
   * Check login state from localStorage
   */
  private checkLoginState(): void {
    const token = localStorage.getItem('token');
    this.isUserLoggedIn = !!token;
    this.cartId = localStorage.getItem('cartId') || '';
  }

  /**
   * Fetches cart items for the customer and calculates the total count
   */
  private fetchCartItemsCount(): void {
    if (this.isUserLoggedIn && this.cartId) {
      this._ecommerceService.getCartItems(this.cartId).subscribe({
        next: (cartResponse) => {
          const cartItems = cartResponse.data?.[0]?.cartItems || [];
          this.cartItemCount = cartItems.reduce(
            (total, item) => total + item.quantity,
            0
          );
        },
        error: (error) => {
          console.error('Error fetching cart items:', error);
        },
      });
    } else {
      this.fetchGuestCartItemCount();
    }
  }

  /**
   * Fetch guest cart item count from localStorage
   */
  private fetchGuestCartItemCount(): void {
    const guestCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
    this.cartItemCount = guestCart.reduce(
      (total: number, item: any) => total + item.quantity,
      0
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../models/ICartItem';
import { ECommerceService } from '../../services/ecommerce.service';
import { UserService } from '../../services/user.service';

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
  cartItems!: ICartItem[];
  isUserLoggedIn: boolean = false;
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
  ) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.isUserLoggedIn = this.userService.isUserLoggedIn;
    if (this.isUserLoggedIn) {
      this.fetchCartItems();
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
    const custId = Number(localStorage.getItem('customerId'));
    const cartId = Number(localStorage.getItem('cartId'));
    this._ecommerceService.deleteCartItem(custId, cartId, [item]).subscribe({
      next: (response) => {
        if (response.results) {
          this.cartItems = this.cartItems.filter(
            (cartItem) => cartItem.productId !== item.productId
          );
          this.calculateCartTotal();
        }
      },
      error: (error) => {
        console.error('Error deleting cart item:', error);
      },
    });
  }

  /**
   * Load guest cart items from localStorage and calculate total
   */
  private loadGuestCart(): void {
    const storedCart = localStorage.getItem('guestCart');
    if (storedCart) {
      try {
        this.cartItems = JSON.parse(storedCart) as ICartItem[];
        this.calculateCartTotal();
      } catch (error) {
        console.error('Error parsing guestCart:', error);
        this.cartItems = [];
      }
    }
  }

  /**
   * Fetch cart items for the logged-in user
   */
  private fetchCartItems(): void {
    this._ecommerceService.getCartItems(this.userService.cartId).subscribe({
      next: (response) => {
        this.cartItems = response.data.cartItems;
        this.calculateCartTotal();
      },
      error: (error) => {
        console.error('Error fetching cart items:', error);
      },
    });
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

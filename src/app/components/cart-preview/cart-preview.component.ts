import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ECommerceService } from '../../services/ecommerce.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { ICartItem } from '../../models/ICreateCartPayload';

/**
 * CartPreviewComponent
 */
@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-preview.component.html',
  styleUrls: ['./cart-preview.component.css']
})
export class CartPreviewComponent implements OnInit {
  @Input() cartId: string = '';
  cartTotal: number = 0;
  cartItemCount: number = 0;

  // Private Values
  private cartItems: ICartItem[] = [];
  private readonly GUEST_CART_KEY = 'guestCart';
  private readonly CUSTOMER_CART_KEY = 'customerCart';

  /**
   * Constructor
   *
   * @param _ecommerceService ECommerceService
   * @param dialog MatDialog
   * @param router Router
   */
  constructor(
    private _ecommerceService: ECommerceService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.checkLoginState();
    if (this.cartId) {
      this.fetchCartItems();
    } else {
      this.loadCartFromLocalStorage();
    }
  }

  /**
   * Opens the checkout dialog
   */
  onCheckoutClick(): void {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/checkout']);
      }
    });
  }

  /**
   * Check login state and set cartId
   */
  private checkLoginState(): void {
    const token = localStorage.getItem('token');
    const isUserLoggedIn = !!token;
    this.cartId = isUserLoggedIn ? localStorage.getItem('cartId') || '' : '';
  }

  /**
   * Load cart items from localStorage
   */
  private loadCartFromLocalStorage(): void {
    const cartKey = this.cartId ? this.CUSTOMER_CART_KEY : this.GUEST_CART_KEY;
    const storedCart = JSON.parse(localStorage.getItem(cartKey) || '[]');

    this.cartItems = storedCart;
    this.cartItemCount = storedCart.reduce((count: number, item: ICartItem) => count + item.quantity, 0);
    this.cartTotal = storedCart.reduce((total: number, item: ICartItem) => total + item.productPrice * item.quantity, 0);
  }

  /**
     * Fetch cart items from the backend
     */
  private fetchCartItems(): void {
    this._ecommerceService.getCartItems(this.cartId).subscribe({
      next: (response) => {
        const cartData = response.data?.cartItems || [];
        this.cartItems = cartData;
        this.cartItemCount = cartData.reduce((count, item) => count + item.quantity, 0);
        this.cartTotal = cartData.reduce((total, item) => total + item.productPrice * item.quantity, 0);

        // Save the updated cart to localStorage
        localStorage.setItem(this.CUSTOMER_CART_KEY, JSON.stringify(cartData));
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
        this.cartItems = [];
      },
    });
  }
}

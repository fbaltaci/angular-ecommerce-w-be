import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ECommerceService } from '../../services/ecommerce.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';
import { CartService } from '../../services/cart.service';
import { ICartItem } from '../../models/ICartItem';
import { UserService } from '../../services/user.service';

/**
 * CartPreviewComponent
 */
@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.css',
})
export class CartPreviewComponent implements OnInit {
  @Input() cartId!: number;
  cartTotal: number = 0;
  cartItemCount: number = 0;
  private cartItems: ICartItem[] = [];

  /**
   * Constructor
   *
   * @param _ecommerceService
   * @param cartService
   * @param dialog
   * @param router
   */
  constructor(
    private _ecommerceService: ECommerceService,
    private cartService: CartService,
    private userService: UserService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.cartService.cartItemCount.subscribe((count) => {
      this.cartItemCount = count;
      if (this.cartItemCount > 0) {
        if (this.userService.isUserLoggedIn) {
          this.cartItems = JSON.parse(
            localStorage.getItem('customerCart') || '[]'
          );
        } else {
          this.cartItems = JSON.parse(
            localStorage.getItem('guestCart') || '[]'
          );
        }

        this.cartTotal = this.cartItems.reduce(
          (total, item) => total + item.productPrice * item.quantity,
          0
        );
      }
    });

    console.log('CartPreviewComponent: cartId:', this.cartId);

    if (this.cartId) {
      this.fetchCartItems();
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
   * Fetch cart items from the service
   */
  private fetchCartItems(): void {
    this._ecommerceService.getCartItems(this.cartId).subscribe({
      next: (response) => {
        this.cartItems = response.data?.cartItems || [];
        this.cartTotal = this.cartItems.reduce(
          (total, item) => total + item.productPrice * item.quantity,
          0
        );
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
        this.cartItems = [];
      },
    });
  }
}

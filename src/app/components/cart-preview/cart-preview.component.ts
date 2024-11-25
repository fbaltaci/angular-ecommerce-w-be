import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ICartItemsResponse } from '../../models/ICartItemsResponse';
import { ECommerceService } from '../../services/ecommerce.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from '../checkout-dialog/checkout-dialog.component';

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
  cartItemsResponse: ICartItemsResponse[] = [];
  cartTotal: number = 0;

  /**
   * Constructor
   *
   * @param _ecommerceService
   *
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
    if (this.cartId) {
      this._ecommerceService
        .getCartItems(this.cartId)
        .subscribe((cartItemsResponse) => {
          console.log('Received cartItemsResponse:', cartItemsResponse);
          this.cartItemsResponse = Array.isArray(cartItemsResponse)
            ? cartItemsResponse
            : [cartItemsResponse];
          this.calculateCartTotal();
        });
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
        // Navigate to the checkout page
        this.router.navigate(['/checkout']);
      }
    });
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

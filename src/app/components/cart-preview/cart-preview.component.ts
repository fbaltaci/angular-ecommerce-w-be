import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICartItemsResponse } from '../../models/ICartItemsResponse';
import { ECommerceService } from '../../services/ecommerce.service';

/**
 * CartPreviewComponent
 */
@Component({
  selector: 'app-cart-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-preview.component.html',
  styleUrl: './cart-preview.component.css',
})
export class CartPreviewComponent {
  @Input() custId!: number;
  cartItemsResponse: ICartItemsResponse[] = [];
  cartTotal: number = 0;

  /**
   * Constructor
   *
   * @param _ecommerceService
   */
  constructor(private _ecommerceService: ECommerceService) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    if (this.custId) {
      this._ecommerceService
        .getCartItems(this.custId)
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
   * Calculates the total price of items in the cart
   */
  private calculateCartTotal(): void {
    if (!this.cartItemsResponse || !Array.isArray(this.cartItemsResponse))
      return;

    this.cartTotal = this.cartItemsResponse.length;
  }
}

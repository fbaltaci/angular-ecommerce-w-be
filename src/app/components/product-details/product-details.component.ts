import { Component, Input } from '@angular/core';
import { IProductDetailsResponse } from '../../models/IProductDetailsResponse';
import { CommonModule } from '@angular/common';
import { ECommerceService } from '../../services/ecommerce.service';
import { ICartData } from '../../models/ICartData';
import { ICartItem } from '../../models/ICartItem';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  @Input() productDetail!: IProductDetailsResponse;
  cartId: number = 7;
  custId: number = 1;

  /**
   * Constructor
   *
   * @param _ecommerceService ECommerceService
   * @param messageService MessageService
   */
  constructor(
    private readonly _ecommerceService: ECommerceService,
    private readonly messageService: MessageService
  ) {}

  /**
   * Add product to cart
   */
  addToCart(productDetail: IProductDetailsResponse): void {
    const addToCartPayload: ICartData = {
      cartId: this.cartId,
      custId: this.custId,
      cartItems: [
        {
          productId: productDetail.productId,
          quantity: 1,
          productShortName: productDetail.productShortName,
          addedDate: new Date().toISOString(),
          productName: productDetail.productName,
          categoryName: productDetail.categoryName,
          productImageUrl: productDetail.productImageUrl,
          productPrice: productDetail.productPrice,
        } as ICartItem,
      ],
    };

    this._ecommerceService.postCartItems(addToCartPayload).subscribe({
      next: (response) => {
        this.messageService.showMessage('Added to cart', 2000);
      },
      error: (err) => {
        this.messageService.showMessage(`Error adding to cart: ${err}`, 2000);
      },
    });
  }
}

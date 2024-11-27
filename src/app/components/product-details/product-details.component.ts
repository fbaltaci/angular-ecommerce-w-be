import { Component, Input } from '@angular/core';
import { IProductDetailsResponse } from '../../models/IProductDetailsResponse';
import { CommonModule } from '@angular/common';
import { ECommerceService } from '../../services/ecommerce.service';
import { ICartData } from '../../models/ICartData';
import { ICartItem } from '../../models/ICartItem';

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
   */
  constructor(private readonly _ecommerceService: ECommerceService) {}

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
        console.log('Response:', response);
      },
      error: (err) => {
        console.error('Error adding to cart:', err);
      },
    });
  }
}

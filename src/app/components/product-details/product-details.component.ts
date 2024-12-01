import { Component, Input, OnInit } from '@angular/core';
import { IProductDetailsResponse } from '../../models/IProductDetailsResponse';
import { CommonModule } from '@angular/common';
import { ECommerceService } from '../../services/ecommerce.service';
import { ICartData } from '../../models/ICartData';
import { ICartItem } from '../../models/ICartItem';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

/**
 * Product Details Component
 */
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  @Input() productDetail!: IProductDetailsResponse;
  isUserLoggedIn: boolean = false;

  /**
   * Constructor
   *
   * @param _ecommerceService ECommerceService
   * @param messageService MessageService
   */
  constructor(
    private readonly _ecommerceService: ECommerceService,
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.userService.userLoggedIn$.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
    });
  }

  /**
   * Add product to cart
   */
  addToCart(productDetail: IProductDetailsResponse): void {
    const isGuest = !this.userService.isUserLoggedIn;

    const addToCartPayload: ICartData = {
      isGuest: isGuest,
      cartId: this.userService.cartId,
      custId: this.userService.customerId,
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
      next: () => {
        this.messageService.showMessage('Added to cart', 2000);
      },
      error: (err) => {
        this.messageService.showMessage(`Error adding to cart: ${err}`, 2000);
      },
    });
  }
}

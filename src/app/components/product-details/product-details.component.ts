import { Component, Input, OnInit } from '@angular/core';
import { IProductDetailsResponse } from '../../models/IProductDetailsResponse';
import { CommonModule } from '@angular/common';
import { ECommerceService } from '../../services/ecommerce.service';
import { ICreateCartPayload } from '../../models/ICreateCartPayload';
import { ICartItem } from '../../models/ICartItem';
import { MessageService } from '../../services/message.service';

/**
 * Product Details Component
 */
@Component({
    selector: 'app-product-details',
    imports: [CommonModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @Input() productDetail!: IProductDetailsResponse;
  isUserLoggedIn: boolean = false;

  // Privates
  private readonly GUEST_CART_KEY = 'guestCart';
  private readonly CUSTOMER_CART_KEY = 'customerCart';

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
   * ngOnInit
   */
  ngOnInit(): void {
    this.checkLoginState();
  }

  /**
   * Add product to cart
   * @param productDetail - The product details
   */
  addToCart(productDetail: IProductDetailsResponse): void {
    const cartItem: ICartItem = {
      productId: productDetail.productId,
      quantity: 1,
      productShortName: productDetail.productShortName,
      addedDate: new Date().toISOString(),
      productName: productDetail.productName,
      categoryName: productDetail.categoryName,
      productImageUrl: productDetail.productImageUrl,
      productPrice: productDetail.productPrice,
    };

    if (!this.isUserLoggedIn) {
      this.addToGuestCart(cartItem);
    } else {
      this.addToUserCart(cartItem);
    }
  }

  /**
   * Add product to guest cart
   * 
   * @param cartItem - The item to add to the guest cart
   */
  private addToGuestCart(cartItem: ICartItem): void {
    const existingCart: ICartItem[] = JSON.parse(
      localStorage.getItem(this.GUEST_CART_KEY) || '[]'
    );

    const existingItemIndex = existingCart.findIndex(
      (item) => item.productId === cartItem.productId
    );

    if (existingItemIndex === -1) {
      existingCart.push(cartItem);
    } else {
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    }

    localStorage.setItem(this.GUEST_CART_KEY, JSON.stringify(existingCart));
    this.messageService.showMessage('Item added to cart', 2000);
  }

  /**
   * Add product to user cart
   * 
   * @param cartItem - The item to add to the user cart
   */
  private addToUserCart(cartItem: ICartItem): void {
    const customerId = Number(localStorage.getItem('customerId')) || 0;

    if (!customerId) {
      this.messageService.showMessage('Error: User not authenticated.', 2000);
      return;
    }

    const addToCartPayload: ICreateCartPayload = {
      isGuest: false,
      customerId,
      cartItems: [cartItem],
    };

    this._ecommerceService.postCart(addToCartPayload).subscribe({
      next: () => {
        this.messageService.showMessage('Added to registered user cart', 2000);
      },
      error: (err) => {
        this.messageService.showMessage(`Error adding to cart: ${err}`, 2000);
      },
    });
  }

    /**
   * Check login state
   */
    private checkLoginState(): void {
      const token = localStorage.getItem('token');
      this.isUserLoggedIn = !!token;
    }
}

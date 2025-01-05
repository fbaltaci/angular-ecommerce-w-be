import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ECommerceService } from '../../services/ecommerce.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { IUserLoginPayload } from '../../models/IUserLoginPayload';
import { MessageService } from '../../services/message.service';
import { ICreateCartPayload } from '../../models/ICreateCartPayload';

/**
 * LoginDialogComponent
 */
@Component({
    selector: 'app-login-dialog',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
    ],
    templateUrl: './login-dialog.component.html',
    styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {
  loginForm: FormGroup;
  
  // Privates
  private readonly GUEST_CART_KEY = 'guestCart';
  private readonly CUSTOMER_CART_KEY = 'customerCart';

  /**
   * Constructor
   * 
   * @param dialogRef DialogRef
   * @param _ecommerceService ECommerceService
   * @param messageService MessageService
   * @param fb FormBuilder
   */
  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private _ecommerceService: ECommerceService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  /**
   * Closes the dialog
   */
  close(): void {
    this.dialogRef.close({ success: false });
  }

  /**
   * Submits the login form
   */
  submit(): void {
    if (this.loginForm.valid) {
      const payload: IUserLoginPayload = {
        username: this.loginForm.value.username,
        pwd: this.loginForm.value.password,
      };
      this._ecommerceService.loginUser(payload).subscribe({
        next: (response) => {
          console.log('response: ', response);
          const { customerId, token } = response;
          localStorage.setItem('customerId', customerId.toString());
          localStorage.setItem('token', token);
          localStorage.setItem('isUserLoggedIn', 'true');

          this.dialogRef.close({ success: true });
          this.messageService.showMessage('Login is successful.', 3000);

          const guestCart = this.getCartFromLocalStorage(this.GUEST_CART_KEY);
          if (guestCart.length > 0) {
            this.migrateGuestCart(customerId, guestCart);
          } else {
            this._ecommerceService.getLastCart(customerId).subscribe({
              next: (response) => {
                const cart = response.data?.[0];
                if (cart) {
                  localStorage.setItem(this.CUSTOMER_CART_KEY, cart.cartId);
                  this.updateCartInLocalStorage(this.CUSTOMER_CART_KEY, cart.cartItems);
                }
              },
              error: () => this.messageService.showMessage('Failed to fetch last cart.', 3000),
            });
          }
        },
        error: () => this.messageService.showMessage('Login failed. Please check your credentials.', 3000),
      });
    }
  }

  /**
   * Migrates guest cart
   * 
   * @param customerId Customer ID
   * @param guestCart Guest cart
   */
  private migrateGuestCart(customerId: number, guestCart: any[]): void {
    const payload: ICreateCartPayload = {
      isGuest: false,
      customerId,
      cartItems: guestCart,
    };

    this._ecommerceService.postCart(payload).subscribe({
      next: (response) => {
        const cartId = response.data?.[0]?.cartId || '';
        if (cartId) {
          localStorage.setItem(this.CUSTOMER_CART_KEY, cartId);
        }
      },
      error: () => this.messageService.showMessage('Failed to migrate guest cart.', 3000),
    });
  }

  /**
   * Gets cart from local storage
   * 
   * @param cartKey Cart key
   */
  private getCartFromLocalStorage(cartKey: string): any[] {
    try {
      return JSON.parse(localStorage.getItem(cartKey) || '[]');
    } catch (error) {
      console.error(`Error retrieving cart for key ${cartKey}`, error);
      return [];
    }
  }

  /**
   * Updates cart in local storage
   * 
   * @param cartKey Cart key
   * @param cartItems Cart items
   */
  private updateCartInLocalStorage(cartKey: string, cartItems: any[]): void {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }
}

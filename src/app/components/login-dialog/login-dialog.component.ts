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
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { ICartItem, ICreateCartPayload } from '../../models/ICreateCartPayload';

/**
 * LoginDialogComponent
 */
@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css',
})
export class LoginDialogComponent {
  isUserLoggedIn: boolean = false;
  loginForm: FormGroup;

  // Private Values
  private customerId: number = 0;
  private token: string = '';
  private lastCartId: string = '';
  private cartId: string = '';

  /**
   * Constructor
   */
  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private _ecommerceService: ECommerceService,
    private messageService: MessageService,
    private userService: UserService,
    private cartService: CartService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  /**
   * Close the dialog
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Submit the login form
   */
  submit(): void {
    if (this.loginForm.valid) {
      const payload: IUserLoginPayload = {
        username: this.loginForm.value.username,
        pwd: this.loginForm.value.password,
      };
      this._ecommerceService.loginUser(payload).subscribe({
        next: (response) => {
          this.customerId = response.customerId;
          this.token = response.token;
          this.userService.updateUserLoggedInState(true);
          this.isUserLoggedIn = true;
          localStorage.setItem('customerId', this.customerId.toString());
          localStorage.setItem('token', this.token);
          localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn.toString());
          this.dialogRef.close(this.loginForm.value);
          this.messageService.showMessage('Login is successful.', 3000);
          const guestCart: ICartItem[] = JSON.parse(localStorage.getItem('guestCart') || '[]');
          if (guestCart.length > 0) {
            console.log('guestCart ', guestCart);
            const payload: ICreateCartPayload = {
              isGuest: false,
              customerId: this.customerId,
              cartItems: [...guestCart],
            }
            console.log(payload);
            this._ecommerceService
              .postCart(payload).subscribe((response) => {
                this.cartId = response.data[0].cartId;
              });
          } else {
            console.log('102');
            this._ecommerceService
              .getLastCart(this.customerId)
              .subscribe((response) => {
                localStorage.setItem('cartId', response.data[0].cartId.toString());
                this.lastCartId = response.data[0].cartId;
                this.cartService.addToCart('customerCart', response.data[0].cartItems);
              });
          }
        },
        error: () => {
          this.messageService.showMessage('Login failed. Please check your credentials.', 3000);
        },
      });
    }
  }
}

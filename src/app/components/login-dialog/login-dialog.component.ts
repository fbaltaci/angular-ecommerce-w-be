import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
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

  /**
   * Constructor
   */
  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private _ecommerceService: ECommerceService,
    private messageService: MessageService,
    private userService: UserService,
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

          localStorage.setItem('customerId', this.customerId.toString());
          localStorage.setItem('token', this.token);

          this.userService.updateUserLoggedInState(true);

          this.isUserLoggedIn = true;
          this.dialogRef.close(this.loginForm.value);

          this.messageService.showMessage('Login is successful.', 3000);
          // Check if customer has any item in the localStorage cart.
          // If so, then POST this cart as new cart for the customer.
          this.getLastCartForCustomer();
        },
        error: () => {
          this.messageService.showMessage(
            'Login failed. Please check your credentials.',
            3000
          );
        },
      });
    }
  }

  /**
   * Fetches the last cart for the customer
   */
  private getLastCartForCustomer(): void {
    this._ecommerceService
      .getLastCart(this.customerId, this.token)
      .subscribe((response) => {
        localStorage.setItem('cartId', response.cartId.toString());
      });
  }
}

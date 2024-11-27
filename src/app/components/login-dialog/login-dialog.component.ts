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
  customerId: number = 0;

  // Private Values
  private token: string = '';

  /**
   * Constructor
   */
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private _ecommerceService: ECommerceService,
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
    console.log('Submit');
    if (this.loginForm.valid) {
      const payload: IUserLoginPayload = {
        username: this.loginForm.value.username,
        pwd: this.loginForm.value.password,
      };
      this._ecommerceService.loginUser(payload).subscribe({
        next: (response) => {
          this.customerId = response.customerId;
          this.token = response.token;

          this.isUserLoggedIn = true;
          this.getLastCartForCustomer();
          this.dialogRef.close(this.loginForm.value);
        },
        error: (err) => {
          console.error('Login failed:', err);
        },
      });

      console.log(this.customerId);

      this.isUserLoggedIn = true;
      this.getLastCartForCustomer();
      this.dialogRef.close(this.loginForm.value);
    }
  }

  /**
   * Fetches the last cart for the customer
   */
  private getLastCartForCustomer(): void {
    this._ecommerceService
      .getLastCart(this.customerId, this.token)
      .subscribe((response) => {
        console.log('Last cart:', response);
      });
  }
}

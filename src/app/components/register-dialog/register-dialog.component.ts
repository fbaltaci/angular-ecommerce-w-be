import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ECommerceService } from '../../services/ecommerce.service';
import { IUserRegisterPayload } from '../../models/IUserRegisterPayload';
import { MessageService } from '../../services/message.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

/**
 * RegisterDialogComponent
 */
@Component({
  selector: 'app-register-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.css'],
})
export class RegisterDialogComponent {
  isUserRegistered: boolean = false;
  registerForm: FormGroup;

  /**
   * Constructor
   *
   * @param fb FormBuilder
   * @param dialogRef DialogRef
   * @param _ecommerceService ECommerceService
   */
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RegisterDialogComponent>,
    private _ecommerceService: ECommerceService,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Close the dialog
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Submit the registration form
   */
  submit(): void {
    if (this.registerForm.valid) {
      const payload: IUserRegisterPayload = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        role: 'user',
      };

      this._ecommerceService.registerUser(payload).subscribe({
        next: (response) => {
          this.isUserRegistered = true;

          localStorage.setItem('customerId', response.customerId.toString());
          localStorage.setItem('cartId', '1');

          this.messageService.showMessage('Registration is successful, now you have to login with your credentials.', 2000);
          this.dialogRef.close(this.registerForm.value);

          this.dialog.open(LoginDialogComponent, {
            width: '500px',
          });
        },
        error: () => {
          this.messageService.showMessage('Registration failed', 2000);
        },
      });
    } else {
      this.messageService.showMessage('Please fill out the form correctly.', 2000);
    }
  }
}

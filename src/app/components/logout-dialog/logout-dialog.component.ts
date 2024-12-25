import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';

/**
 * LogOutDialogComponent
 */
@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css',
})
export class LogOutDialogComponent {

  /**
   * Constructor
   *
   * @param dialogRef MatDialogRef
   * @param userService UserService
   */
  constructor(
    private dialogRef: MatDialogRef<LogOutDialogComponent>,
    private userService: UserService,
    private cartService: CartService
  ) {}

  /**
   * Cancel sign out
   */
  cancel(): void {
    this.dialogRef.close(false);
  }

  /**
   * Confirm sign out
   */
  confirmSignOut(): void {
    if (this.userService.isUserLoggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('customerId');
      localStorage.removeItem('cartId');
    }
    this.cartService.clearCart();
    this.userService.updateUserLoggedInState(false);
    this.dialogRef.close(true);
  }
}

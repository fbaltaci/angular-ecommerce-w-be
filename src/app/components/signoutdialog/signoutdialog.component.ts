import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

/**
 * SignoutdialogComponent
 */
@Component({
  selector: 'app-signoutdialog',
  standalone: true,
  imports: [],
  templateUrl: './signoutdialog.component.html',
  styleUrl: './signoutdialog.component.css',
})
export class SignoutdialogComponent {

  /**
   * Constructor
   *
   * @param dialogRef MatDialogRef
   * @param userService UserService
   */
  constructor(
    private dialogRef: MatDialogRef<SignoutdialogComponent>,
    private userService: UserService
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

    this.userService.updateUserLoggedInState(false);

    this.dialogRef.close(true);
  }
}

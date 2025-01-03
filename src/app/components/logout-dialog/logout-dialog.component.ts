import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

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
   */
  constructor(
    private dialogRef: MatDialogRef<LogOutDialogComponent>
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
    localStorage.clear();
    localStorage.setItem('isUserLoggedIn', 'false');
    this.dialogRef.close(true);
  }
}
 
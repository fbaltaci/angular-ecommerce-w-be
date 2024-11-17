import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

/**
 * CheckoutDialogComponent
 */
@Component({
  selector: 'app-checkout-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './checkout-dialog.component.html',
  styleUrl: './checkout-dialog.component.css',
})
export class CheckoutDialogComponent {
  /**
   * Constructor
   *
   * @param dialogRef
   */
  constructor(private dialogRef: MatDialogRef<CheckoutDialogComponent>) {}

  /**
   * Closes the dialog
   */
  onConfirm() {
    this.dialogRef.close(true);
  }
}

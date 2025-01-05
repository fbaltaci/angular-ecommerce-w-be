import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

/**
 * CheckoutDialogComponent
 */
@Component({
    selector: 'app-checkout-dialog',
    imports: [MatDialogModule],
    templateUrl: './checkout-dialog.component.html',
    styleUrl: './checkout-dialog.component.css'
})
export class CheckoutDialogComponent {
  /**
   * Constructor
   *
   * @param dialogRef MatDialogRef<CheckoutDialogComponent>
   * @param router RouterModule
   */
  constructor(
    private dialogRef: MatDialogRef<CheckoutDialogComponent>,
    private router: Router
  ) {}

  /**
   * Opens the Checkout Page
   */
  onConfirm() {
    this.router.navigate(['cart']);
    this.dialogRef.close(true);
  }

  /**
   * Closes the dialog
   */
  onCancel() {
    this.dialogRef.close(true);
  }
}

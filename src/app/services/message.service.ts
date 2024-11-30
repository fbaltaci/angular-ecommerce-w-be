import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  /**
   * Constructor
   * 
   * @param snackbar MatSnackBar
   */
  constructor(private snackbar: MatSnackBar) { }

  /**
   * Display a message
   * 
   * @param message Message to display
   * @param duration Duration to display the message
   */
  showMessage(message: string, durationSec: number): void {
    this.snackbar.open(message, 'Close', {
      duration: durationSec,
    });
  }
}

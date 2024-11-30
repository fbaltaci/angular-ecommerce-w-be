import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

/**
 * ProfilePreviewComponent
 */
@Component({
  selector: 'app-profile-preview',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './profile-preview.component.html',
  styleUrl: './profile-preview.component.css',
})
export class ProfilePreviewComponent {
  /**
   * Constructor
   */
  constructor(private dialog: MatDialog) {}

  /**
   * On register click
   */
  onRegisterClick(): void {
    this.dialog.open(RegisterDialogComponent, {
      width: '500px',
    });
  }

  /**
   * On login click
   */
  onLoginClick(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '500px',
    });
  }
}

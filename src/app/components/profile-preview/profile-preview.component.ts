import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { LogOutDialogComponent } from '../logout-dialog/logout-dialog.component';

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
  isUserLoggedIn: boolean = false;
  customerId: number = 0;

  /**
   * Constructor
   * 
   * @param dialog MatDialog
   */
  constructor(
    private dialog: MatDialog
  ) {}

   /**
   * ngOnInit
   */
   ngOnInit(): void {
    this.checkLoginState();
  }

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
    }).afterClosed().subscribe(() => {
      this.checkLoginState();
    });
  }

  /**
   * User sign out
   */
  onLogOut(): void {
    const dialogRef = this.dialog.open(LogOutDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.handleLogout();
      }
    });
  }

  /**
   * Perform logout actions
   */
  private handleLogout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    localStorage.removeItem('cartId');
    this.isUserLoggedIn = false;
    this.customerId = 0;
  }

  /**
   * Check login state from localStorage
   */
  private checkLoginState(): void {
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');

    this.isUserLoggedIn = !!token;
    this.customerId = this.isUserLoggedIn && customerId ? Number(customerId) : 0;
  }
}

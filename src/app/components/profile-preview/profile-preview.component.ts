import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegisterDialogComponent } from '../register-dialog/register-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { UserService } from '../../services/user.service';
import { LogOutDialogComponent } from '../signoutdialog/logout-dialog.component';

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
   */
  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) {}

   /**
   * ngOnInit
   */
   ngOnInit(): void {
    // Subscribe to user login state
    this.userService.userLoggedIn$.subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
      this.customerId = isLoggedIn ? this.userService.customerId : 0;
    });
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
    });
  }

  /**
   * User sign out
   */
  onLogOut(): void {
    this.dialog.open(LogOutDialogComponent, {
      width: '500px',
    });
  }
}

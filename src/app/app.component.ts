import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './components/footer/footer.component';

/**
 * AppComponent
 */
@Component({
    selector: 'app-root',
    imports: [
        RouterModule,
        CommonModule,
        HeaderComponent,
        FooterComponent,
        MatDialogModule,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  /**
   * Constructor
   */
  constructor() {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    localStorage.setItem('isUserLoggedIn', 'false');
  }
}

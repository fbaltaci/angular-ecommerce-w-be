import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasketService } from './services/basket.service';
import { IGetAllProductsResponse } from './models/IGetAllProductsResponse';
import { IProductDetailsResponse } from './models/IProductDetailsResponse';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-ecommerce-w-be';

  getAllProductsResponse: IGetAllProductsResponse = {
    message: '',
    result: '',
    data: [] as IProductDetailsResponse[],
  };

  /**
   * Constructor
   */
  constructor(private _basketService: BasketService) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.getUserLoginFromService();
    this.getAllProductsFromService();
    console.log('ngOnInit');
  }

  getUserLoginFromService(): void {
    this._basketService
      .userLogin({
        username: 'testuser',
        pwd: 'password123',
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  /**
   * Calls getAllProducts Service
   */
  getAllProductsFromService(): void {
    this._basketService.getAllProducts().subscribe((response) => {
      this.getAllProductsResponse = response;
    });
    console.log('this.getAllProductsResponse: ', this.getAllProductsResponse);
  }
}

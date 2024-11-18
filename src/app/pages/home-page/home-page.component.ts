import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ECommerceService } from '../../services/ecommerce.service';
import { IGetAllProductsResponse } from '../../models/IGetAllProductsResponse';
import { IProductDetailsResponse } from '../../models/IProductDetailsResponse';
import { RouterModule } from '@angular/router';

/**
 * HomePageComponent
 */
@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  /**
   * Constructor
   */
  constructor(private readonly _ecommerceService: ECommerceService) {}
  bestSellers: IProductDetailsResponse[] = [];
  customerFavorites: IProductDetailsResponse[] = [];

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.loadProducts();
  }

  /**
   * Load products and select random ones for Best Sellers and Customer Favorites
   */
  private loadProducts(): void {
    this._ecommerceService.getAllProducts().subscribe({
      next: (response: IGetAllProductsResponse) => {
        const allProducts = response.data; // Assuming response contains a 'data' array of products
        this.bestSellers = this.getRandomProducts(allProducts, 4);
        this.customerFavorites = this.getRandomProducts(allProducts, 4);
      },
      error: (err) => {
        console.error('Failed to fetch products', err);
      },
    });
  }

  /**
   * Utility function to get random products from the list
   *
   * @param count Number of products to fetch
   * @returns Array of random products
   */
  private getRandomProducts(
    products: IProductDetailsResponse[],
    count: number
  ): IProductDetailsResponse[] {
    return [...products].sort(() => 0.5 - Math.random()).slice(0, count);
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IGetAllProductsResponse } from '../../models/IGetAllProductsResponse';
import { ECommerceService } from '../../services/ecommerce.service';
import { IProductDetailsResponse } from '../../models/IProductDetailsResponse';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';
import { CONSTANTS } from '../../constants/constants';

/**
 * ProductsPageComponent
 */
@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductDetailsComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent {
  categories = CONSTANTS.CATEGORIES;
  productsListAll: IProductDetailsResponse[] = [];
  productsList: IProductDetailsResponse[] = [];
  activeCategoryId: string | null = null;

  /**
   * Constructor
   *
   * @param _basketService { ECommerceService }
   */
  constructor(private _basketService: ECommerceService) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.getUserLoginFromService();
    this.getAllProductsFromService();
    console.log('ngOnInit');
  }

  /**
   * Calls userLogin Service
   */
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
      this.productsListAll = response.data;
      this.productsList = this.productsListAll;
    });
  }

  /**
   * Toggle category filter
   *
   * @param categoryName { string }
   */
  toggleCategoryFilter(categoryName: string): void {
    if (this.activeCategoryId === categoryName) {
      this.activeCategoryId = null;
      this.productsList = [...this.productsListAll];
    } else {
      this.activeCategoryId = categoryName;
      this.productsList = this.productsListAll.filter(
        (product) => product.categoryName === categoryName
      );
    }
  }
}

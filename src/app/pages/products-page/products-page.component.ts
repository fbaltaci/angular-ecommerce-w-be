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
    imports: [CommonModule, ProductDetailsComponent],
    templateUrl: './products-page.component.html',
    styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  categories = CONSTANTS.CATEGORIES;
  productsListAll: IProductDetailsResponse[] = [];
  productsList: IProductDetailsResponse[] = [];
  activeCategoryName: string = 'all';

  /**
   * Constructor
   *
   * @param _ecommerceService { ECommerceService }
   */
  constructor(private _ecommerceService: ECommerceService) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    this.getAllProductsFromService();
  }

  /**
   * Calls getAllProducts Service
   */
  getAllProductsFromService(): void {
    this._ecommerceService.getAllProducts().subscribe((response) => {
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
    if (categoryName === 'all' || this.activeCategoryName === categoryName) {
      this.activeCategoryName = 'all';
      this.productsList = [...this.productsListAll];
    } else {
      this.activeCategoryName = categoryName;
      this.productsList = this.productsListAll.filter(
        (product) => product.categoryName === categoryName
      );
    }
  }
}

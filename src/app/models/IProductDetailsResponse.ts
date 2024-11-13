/**
 * Interface for getAllProducts.data Response
 */
export interface IProductDetailsResponse {
  productId: number;
  quantity: number;
  productShortName: string;
  addedDate: string;
  productName: string;
  categoryName: string;
  productImageUrl: string;
  productPrice: number;
}

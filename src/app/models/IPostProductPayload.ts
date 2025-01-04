/**
 * Interface for PostProduct
 */
export interface IPostProductPayload {
  productSku: string;
  productName: string;
  productPrice: number;
  productShortName: string;
  productDescription: string;
  deliveryTimeSpan: string;
  categoryId: number;
  productImageUrl: string;
  categoryName: string;
}

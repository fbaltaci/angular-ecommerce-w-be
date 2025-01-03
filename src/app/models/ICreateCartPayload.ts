/**
 * Interface for Cart Data
 */
export interface ICreateCartPayload {
  isGuest: boolean;
  customerId: number;
  cartItems: ICartItem[];
}

export interface ICartItem {
  productId: number;
  quantity: number;
  productShortName: string;
  addedDate: string;
  productName: string;
  categoryName: string;
  productImageUrl: string;
  productPrice: number;
}

/**
 * Interface for Cart Data
 */
export interface IUpdateCartPayload {
  isGuest: boolean;
  customerId: number;
  cartId: string;
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

import { ICartItem } from './ICreateCartPayload';

/**
 * Interface for the response of the postCartItems.
 */
export interface ICreateCartResponse {
  message: string;
  result: string;
  data: ICartData[];
}

export interface ICartData {
  isGuest: boolean;
  customerId: number;
  cartItems: ICartItem[];
  cartId: string;
}

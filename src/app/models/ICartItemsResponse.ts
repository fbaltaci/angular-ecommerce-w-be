import { ICartData } from './ICartData';

/**
 * Interface for the response from the cart items API
 */
export interface ICartItemsResponse {
  cartId: string;
  custId: number;
  data: ICartData;
}

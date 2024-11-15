import { ICartData } from './ICartData';

/**
 * Interface for the response from the cart items API
 */
export interface ICartItemsResponse {
  cartId: number;
  custId: number;
  data: ICartData;
}

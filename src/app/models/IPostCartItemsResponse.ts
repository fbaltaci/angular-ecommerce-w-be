import { ICartData } from './ICartData';

/**
 * Interface for the response of the postCartItems method in the CartService.
 */
export interface IPostCartItemsResponse {
  message: string;
  result: string;
  data: ICartData[];
}

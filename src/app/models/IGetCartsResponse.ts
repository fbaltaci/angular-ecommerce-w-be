import { ICartData } from './IPostCartItemsResponse';

/**
 * Interface for the response of the fetch carts API
 */
export interface IGetCartsResponse {
  message: string;
  results: boolean;
  data: ICartData;
}

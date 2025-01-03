import { ICartData } from './IPostCartItemsResponse';

/**
 * Interface for IGetCartResponse
 */
export interface IGetCartResponse {
  message: string;
  result: boolean;
  data: ICartData;
}

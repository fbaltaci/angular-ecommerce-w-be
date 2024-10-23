import { IProductDetailsResponse } from './IProductDetailsResponse';

/**
 * Interface to use for getAllProducts call response
 */
export interface IGetAllProductsResponse {
  message: string;
  result: string;
  data: IProductDetailsResponse[];
}

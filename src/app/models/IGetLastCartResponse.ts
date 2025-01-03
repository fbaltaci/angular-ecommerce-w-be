import { IUpdateCartPayload } from './IUpdateCartPayload';

/**
 * Interface for Get Last Cart Response
 */
export interface IGetLastCartResponse {
  message: string;
  result: string;
  data: IUpdateCartPayload[];
}

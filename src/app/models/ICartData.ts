import { ICartItem } from './ICartItem';

/**
 * Interface for Cart Data
 */
export interface ICartData {
  cartId: number;
  custId: number;
  cartItems: ICartItem[];
}

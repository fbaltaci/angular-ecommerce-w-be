import { ICartItem } from './ICartItem';

/**
 * Interface for Cart Data
 */
export interface ICartData {
  isGuest: boolean;
  cartId: number;
  custId: number;
  cartItems: ICartItem[];
}

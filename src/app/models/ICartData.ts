import { ICartItem } from './ICartItem';

/**
 * Interface for Cart Data
 */
export interface ICartData {
  isGuest: boolean;
  cartId: string;
  customerId: number;
  cartItems: ICartItem[];
}

/**
 * Interface for User Register Response
 */
export interface IUserRegisterResponse {
  message: string;
  customerId: number;
  cartId: string; // UUID
}

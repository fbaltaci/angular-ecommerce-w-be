/**
 * Interface for user register payload
 */
export interface IUserRegisterPayload {
  email: string;
  username: string;
  password: string;
  role: string; // 'user' | 'admin'
}

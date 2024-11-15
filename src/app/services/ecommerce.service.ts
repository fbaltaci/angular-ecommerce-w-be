import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICartItemsResponse } from '../models/ICartItemsResponse';
import { IGetAllProductsResponse } from '../models/IGetAllProductsResponse';
import { IUserLoginPayload } from '../models/IUserLoginPayload';
import { IUserLoginResponse } from '../models/IUserLoginResponse';
import { IUserRegisterPayload } from '../models/IUserRegisterPayload';
import { IUserRegisterResponse } from '../models/IUserRegisterResponse';

/**
 * ECommerceService
 */
@Injectable({
  providedIn: 'root',
})
export class ECommerceService {
  private readonly baseURL: string = 'http://localhost:3000/api';
  private readonly tokenKey: string = 'authToken';

  /**
   * Constructor
   *
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Calls userRegister
   *
   * @param payload Payload for userRegister
   * @returns Observable<IUserRegisterResponse>
   */
  userRegister(
    payload: IUserRegisterPayload
  ): Observable<IUserRegisterResponse> {
    const endpoint = `${this.baseURL}/auth/register`;
    return this.http.post<IUserRegisterResponse>(endpoint, payload);
  }

  /**
   * Calls userLogin
   *
   * @param payload Payload for userLogin
   * @returns Observable<IUserLoginResponse>
   */
  userLogin(payload: IUserLoginPayload): Observable<IUserLoginResponse> {
    const endpoint = `${this.baseURL}/auth/login`;
    return this.http.post<IUserLoginResponse>(endpoint, payload).pipe(
      tap((response: IUserLoginResponse) => {
        this.storeToken(response.token);
      })
    );
  }

  /**
   * Calls GetAllProducts
   */
  getAllProducts(): Observable<IGetAllProductsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/products`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.get<IGetAllProductsResponse>(endpoint, { headers });
  }

  /**
   * Fetches cart items for the specified customer ID
   * @param custId The ID of the customer
   * @returns Observable of cart items
   */
  getCartItems(custId: number): Observable<ICartItemsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/cart/${custId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.get<ICartItemsResponse>(endpoint, { headers });
  }

  /**
   * Retrieves the token from local storage
   * @returns The stored token or null
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Clears the token from local storage (for logout)
   */
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Stores the token in local storage
   * @param token Authentication token
   */
  private storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { IGetAllProductsResponse } from '../models/IGetAllProductsResponse';
import { IUserLoginPayload } from '../models/IUserLoginPayload';
import { IUserLoginResponse } from '../models/IUserLoginResponse';
import { IUserRegisterPayload } from '../models/IUserRegisterPayload';
import { IUserRegisterResponse } from '../models/IUserRegisterResponse';
import { ICreateCartResponse  } from '../models/IPostCartItemsResponse';
import { ICreateCartPayload } from '../models/ICreateCartPayload';
import { IPostProductPayload } from '../models/IPostProductPayload';
import { IDeleteProductResponse } from '../models/IDeleteProductResponse';
import { IDeleteCartResponse } from '../models/IDeleteCartResponse';
import { IGetCartsResponse } from '../models/IGetCartsResponse';
import { IUpdateCartPayload } from '../models/IUpdateCartPayload';
import { IGetLastCartResponse } from '../models/IGetLastCartResponse';

/**
 * ECommerceService
 */
@Injectable({
  providedIn: 'root',
})
export class ECommerceService {
  // Privates
  private readonly baseURL: string = 'https://expressjs-ts-ecommerce-app.onrender.com/api/ecommerce';

  /**
   * Constructor
   *
   * @param http HttpClient
   */
  constructor(private http: HttpClient) {}

  /**
   * Calls registerUser
   *
   * @param payload Payload for userRegister
   */
  registerUser(payload: IUserRegisterPayload): Observable<IUserRegisterResponse> {
    const endpoint = `${this.baseURL}/auth/register`;
    return this.http.post<IUserRegisterResponse>(endpoint, payload);
  }

  /**
   * Calls loginUser
   *
   * @param payload Payload for userLogin
   */
  loginUser(payload: IUserLoginPayload): Observable<IUserLoginResponse> {
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
    return this.http.get<IGetAllProductsResponse>(endpoint);
  }

  /**
   * Fetches products by category id
   *
   * @param categoryId Category ID
   */
  getProductsByCategory(categoryId: number): Observable<IGetAllProductsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/products/${categoryId}`;
    return this.http.get<IGetAllProductsResponse>(endpoint);
  }

  /**
   * Creates a new product in the DB - Admin only
   *
   * @param payload Payload IPostProduct
   */
  postProducts(payload: IPostProductPayload): Observable<IGetAllProductsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/products`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.post<IGetAllProductsResponse>(endpoint, payload, { headers });
  }

  /**
   * Updates a product in DB - Admin only
   *
   * @param productId Product ID
   * @param payload Payload IPostProduct
   */
  putProducts(productId: number, payload: IPostProductPayload): Observable<IGetAllProductsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/products/${productId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.put<IGetAllProductsResponse>(endpoint, payload, { headers });
  }

  /**
   * Deletes a product
   *
   * @param productId Product ID
   */
  deleteProduct(productId: number): Observable<IDeleteProductResponse> {
    const endpoint = `${this.baseURL}/ecommerce/product/${productId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.delete<IDeleteProductResponse>(endpoint, { headers });
  }

  /**
   * Fetches all cart items
   */
  getAllCarts(): Observable<IGetCartsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/carts`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.get<IGetCartsResponse>(endpoint, { headers });
  }

  /**
   * Fetches cart items for the specified customer ID
   * 
   * @param cartId cartId
   */
  getCartItems(cartId: string): Observable<IGetCartsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/cart/${cartId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.get<IGetCartsResponse>(endpoint, { headers });
  }

  /**
   * Calls getLastCart
   *
   * @param customerId Customer ID
   */
  getLastCart(customerId: number): Observable<IGetLastCartResponse> {
    const endpoint = `${this.baseURL}/ecommerce/lastCart/${customerId}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    return this.http.get<IGetLastCartResponse>(endpoint, { headers });
  }

  /**
   * Creates a new empty cart for registered users
   *
   * @param productId Product ID
   */
  postCart(payload: ICreateCartPayload): Observable<ICreateCartResponse > {
    const endpoint = `${this.baseURL}/ecommerce/cart`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.post<ICreateCartResponse >(endpoint, payload, { headers });
  }

  /**
   * Updates the cart items
   *
   * @param cartId Cart ID
   * @param payload Payload
   * @returns Observable of cart items
   */
  updateCart(cartId: string, payload: IUpdateCartPayload): Observable<ICreateCartResponse > {
    const endpoint = `${this.baseURL}/ecommerce/cart/${cartId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.put<ICreateCartResponse >(endpoint, payload, { headers });
  }

  /**
   * Deletes the cart
   *
   * @param cartId Cart ID
   */
  deleteCart(cartId: number): Observable<IDeleteCartResponse> {
    const endpoint = `${this.baseURL}/ecommerce/cart/${cartId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.delete<IDeleteCartResponse>(endpoint, { headers });
  }

  /**
   * Deletes a cart item
   *
   * @param cartId Cart ID
   * @param productId Product ID
   */
  deleteCartItem(cartId: number, productId: number): Observable<IDeleteCartResponse> {
    const endpoint = `${this.baseURL}/ecommerce/cart/${cartId}/cartItem/${productId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );
    return this.http.delete<IDeleteCartResponse>(endpoint, { headers });
  }

  /**
   * Retrieves the token from local storage
   * @returns The stored token or null
   */
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Stores the token in local storage
   * @param token Authentication token
   */
  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }
}

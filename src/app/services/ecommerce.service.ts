import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ICartItemsResponse } from '../models/ICartItemsResponse';
import { IGetAllProductsResponse } from '../models/IGetAllProductsResponse';
import { IUserLoginPayload } from '../models/IUserLoginPayload';
import { IUserLoginResponse } from '../models/IUserLoginResponse';
import { IUserRegisterPayload } from '../models/IUserRegisterPayload';
import { IUserRegisterResponse } from '../models/IUserRegisterResponse';
import { IPostCartItemsResponse } from '../models/IPostCartItemsResponse';
import { ICartData } from '../models/ICartData';
import { IPostProduct } from '../models/IPostProduct';
import { IDeleteProductResponse } from '../models/IDeleteProductResponse';
import { IDeleteCartResponse } from '../models/IDeleteCartResponse';
import { CartService } from './cart.service';

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
   * @param cartService CartService
   */
  constructor(private http: HttpClient, private cartService: CartService) {}

  /**
   * Calls registerUser
   *
   * @param payload Payload for userRegister
   * @returns Observable<IUserRegisterResponse>
   */
  registerUser(
    payload: IUserRegisterPayload
  ): Observable<IUserRegisterResponse> {
    const endpoint = `${this.baseURL}/auth/register`;
    return this.http.post<IUserRegisterResponse>(endpoint, payload);
  }

  /**
   * Calls loginUser
   *
   * @param payload Payload for userLogin
   * @returns Observable<IUserLoginResponse>
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
   * @returns Observable of products
   */
  getProductsByCategory(
    categoryId: number
  ): Observable<IGetAllProductsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/products/${categoryId}`;
    return this.http.get<IGetAllProductsResponse>(endpoint);
  }

  /**
   * Creates a new product in the DB - Admin only
   *
   * @param payload Payload
   * @returns Observable of products
   */
  postProducts(payload: IPostProduct): Observable<IGetAllProductsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/products`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    return this.http
      .post<IGetAllProductsResponse>(endpoint, payload, { headers })
      .pipe(
        tap((response: IGetAllProductsResponse) => {
          const totalItems = response.data.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          this.cartService.updateCartItemCount(totalItems);
        })
      );
  }

  /**
   * Updates a product in DB - Admin only
   *
   * @param productId Product ID
   * @param payload Payload
   * @returns Observable of products
   */
  putProducts(
    productId: number,
    payload: IPostProduct
  ): Observable<IGetAllProductsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/products/${productId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    return this.http.put<IGetAllProductsResponse>(endpoint, payload, {
      headers,
    });
  }

  /**
   * Deletes a product
   *
   * @param productId Product ID
   * @returns Observable of products
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
   *
   * @returns Observable of cart items
   */
  getAllCarts(): Observable<ICartItemsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/cart`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    return this.http.get<ICartItemsResponse>(endpoint, { headers });
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
    return this.http.get<ICartItemsResponse>(endpoint, { headers }).pipe(
      tap((response: ICartItemsResponse) => {
        this.cartService.updateCartItemCount(response.data.cartItems.length);
      })
    );
  }

  /**
   * Adds an item to the cart
   *
   * @param custId Customer ID
   * @param productId Product ID
   */
  postCartItems(payload: ICartData): Observable<IPostCartItemsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/cart`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    return this.http
      .post<IPostCartItemsResponse>(endpoint, payload, { headers })
      .pipe(
        tap((response: IPostCartItemsResponse) => {
          const addedItemsCount = response.data[0].cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          // Get the current cart count
          const currentCount = this.cartService.cartItemCountSubject.getValue();

          // Increment the count instead of overriding it
          this.cartService.updateCartItemCount(currentCount + addedItemsCount);
        })
      );
  }

  /**
   * Updates the cart items
   *
   * @param payload Payload
   * @returns Observable of cart items
   */
  putCartItems(payload: ICartData): Observable<IPostCartItemsResponse> {
    const endpoint = `${this.baseURL}/ecommerce/cart`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    return this.http.put<IPostCartItemsResponse>(endpoint, payload, {
      headers,
    });
  }

  /**
   * Deletes a cart item
   *
   * @param cartId Cart ID
   * @returns Observable of cart items
   */
  deleteCart(cartId: number): Observable<IDeleteCartResponse> {
    const endpoint = `${this.baseURL}/ecommerce/cart/${cartId}`;
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.getToken()}`
    );

    return this.http.put<IDeleteCartResponse>(endpoint, {
      headers,
    });
  }

  /**
   * Retrieves the token from local storage
   * @returns The stored token or null
   */
  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Clears the token from local storage (for logout)
   */
  private clearToken(): void {
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

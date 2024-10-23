import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetAllProductsResponse } from '../models/IGetAllProductsResponse';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private baseURL = 'https://freeapi.gerasim.in/api/BigBasket';

  constructor(private http: HttpClient) {}

  /**
   * Calls GetAllProducts
   */
  getAllProducts(): Observable<IGetAllProductsResponse> {
    const endpoint = `${this.baseURL}/GetAllProducts`;
    console.log('response: ', this.http.get<IGetAllProductsResponse>(endpoint));
    return this.http.get<IGetAllProductsResponse>(endpoint);
  }
}

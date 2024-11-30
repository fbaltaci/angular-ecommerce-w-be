import { Injectable } from '@angular/core';

/**
 * UserService
 * This service has no API calls.
 * This Service is not connected to any API.
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

  isUserLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}

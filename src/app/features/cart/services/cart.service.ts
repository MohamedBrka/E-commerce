import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
countNumber:BehaviorSubject<number> = new BehaviorSubject(0);

  myHeader: object = {
    headers: {
      token: this.cookieService.get('token'),
    },
  };
  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl + `cart`,
      {
        productId: id,
      },
      this.myHeader
    );
  }
  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart', this.myHeader);
  }
  removeItemCart(id: string): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + `cart/${id}`,
      this.myHeader
    );
  }
  updateCountCart(id: string, count: number): Observable<any> {
    return this.httpClient.put(
      environment.baseUrl + `cart/${id}`,
      {
        count: count,
      },
      this.myHeader
    );
  }
  getCheckoutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(
      environment.baseUrl +
        `orders/checkout-session/${id}?url=http://localhost:4200`,
      data,
      this.myHeader
    );
  }
  getOrderCash(id: string | null , data:object):Observable<any>{
    return this.httpClient.post( environment.baseUrl + `orders/${id}`, data)
  }

  
  getUserOrder(id:string|undefined):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `orders/user/${id}`)
  }

    clearCart(): Observable<any> {
    return this.httpClient.delete(
      environment.baseUrl + `cart`,
      this.myHeader
    );
  }

}

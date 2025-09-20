import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  private wishList = new BehaviorSubject<string[]>([]); // نخزن IDs فقط
  wishList$ = this.wishList.asObservable();

  myHeader: object = {
    headers: {
      token: this.cookieService.get('token'),
    },
  };

  /** تحميل المفضلة من السيرفر */
  loadUserWishList(): void {
    this.httpClient.get<any>(environment.baseUrl + 'wishlist', this.myHeader).subscribe({
      next: (res) => {
        const ids = res.data.map((item: any) => item._id);
        this.wishList.next(ids);
      },
      error: (err) => console.error(err),
    });
  }

  /** جلب المفضلة (للرجوع العادي) */
  getLoggedUserWishList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'wishlist', this.myHeader);
  }

  /** إضافة منتج للمفضلة */
  addProductToWishList(id: string): Observable<any> {
    return this.httpClient
      .post(
        environment.baseUrl + `wishlist`,
        { productId: id },
        this.myHeader
      )
      .pipe(
        tap(() => {
          const updated = [...this.wishList.getValue(), id];
          this.wishList.next(updated);
        })
      );
  }

  /** إزالة منتج من المفضلة */
  removeItemWishList(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.baseUrl + `wishlist/${id}`, this.myHeader)
      .pipe(
        tap(() => {
          const updated = this.wishList.getValue().filter((itemId) => itemId !== id);
          this.wishList.next(updated);
        })
      );
  }

  /** تشيك إذا المنتج موجود في المفضلة */
  isInWishList(id: string): boolean {
    return this.wishList.getValue().includes(id);
  }

  

}

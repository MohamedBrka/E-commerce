import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);

  countHeart: WritableSignal<number> = signal(0);

  private wishList = new BehaviorSubject<string[]>([]);
  wishList$ = this.wishList.asObservable();

  myHeader: object = {
    headers: {
      token: this.cookieService.get('token'),
    },
  };

  loadUserWishList(): void {
    this.httpClient.get<any>(environment.baseUrl + 'wishlist', this.myHeader).subscribe({
      next: (res) => {
        const ids = res.data.map((item: any) => item._id);
        this.wishList.next(ids);
        this.countHeart.set(ids.length); // ✅ تحديث العداد
      },
      error: (err) => console.error(err),
    });
  }

  getLoggedUserWishList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'wishlist', this.myHeader);
  }

  addProductToWishList(id: string): Observable<any> {
    return this.httpClient
      .post(environment.baseUrl + `wishlist`, { productId: id }, this.myHeader)
      .pipe(
        tap(() => {
          const updated = [...this.wishList.getValue(), id];
          this.wishList.next(updated);
          this.countHeart.set(updated.length); // ✅ تحديث العداد
        })
      );
  }

  removeItemWishList(id: string): Observable<any> {
    return this.httpClient
      .delete(environment.baseUrl + `wishlist/${id}`, this.myHeader)
      .pipe(
        tap(() => {
          const updated = this.wishList.getValue().filter((itemId) => itemId !== id);
          this.wishList.next(updated);
          this.countHeart.set(updated.length); // ✅ تحديث العداد
        })
      );
  }

  isInWishList(id: string): boolean {
    return this.wishList.getValue().includes(id);
  }
}

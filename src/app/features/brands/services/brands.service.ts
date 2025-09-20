import { HttpClient, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private readonly httpClient = inject(HttpClient)

  getAllBrands(pageNabmer: number = 1):Observable<any>{
    return this.httpClient.get(environment.baseUrl + `brands?page=${pageNabmer}`)
  }
}

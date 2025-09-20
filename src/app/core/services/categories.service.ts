import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly http= inject(HttpClient);

 
  getAllCategories():Observable<any>{
    return this.http.get(  environment.baseUrl  + 'categories'   )
  }
}

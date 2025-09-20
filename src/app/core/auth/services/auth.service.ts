import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Allorders } from '../../model/allorders.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  registerForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }
  loginForm(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }
  logoutForm(): void {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }
  decodeToken() {
    let token: Allorders|undefined = undefined;
    try {
      token = jwtDecode(this.cookieService.get('token'));
    } catch (error) {
      this.logoutForm();
    }

    return token;
  }
  submitVeryfiyEmail(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`auth/forgotPasswords`,data)
  }
  submitVeryfiyCode(data:object):Observable<any>{
    return this.httpClient.post(environment.baseUrl+`auth/verifyResetCode`,data)
  }
  submitResetPassword(data:object):Observable<any>{
    return this.httpClient.put(environment.baseUrl+`auth/resetPassword`,data)
  }
}

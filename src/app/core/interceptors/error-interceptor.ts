import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const id = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err) => {
      if (isPlatformBrowser(id)) {
        toastrService.error(err.error.message);
      }

      return throwError(() => err);
    })
  );
};

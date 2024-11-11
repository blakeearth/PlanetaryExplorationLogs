import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { retry, catchError, delay } from 'rxjs/operators';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({ count: 5, delay: (_error, retryCount) => timer(1000 * retryCount) }),
      catchError((error: HttpErrorResponse) => {
        console.error('Request failed after retries:', {
          url: request.url,
          error: error
        });
        return throwError(() => error);
      })
    );
  }
}

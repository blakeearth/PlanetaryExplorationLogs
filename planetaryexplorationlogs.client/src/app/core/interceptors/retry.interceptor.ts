import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export const retryInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    retry({ count: 5, delay: (_error, retryCount) => timer(1000 * retryCount) }),
    catchError((error: HttpErrorResponse) => {
      console.error('Request failed after retries:', {
        url: req.url,
        error: error
      });
      return throwError(() => error);
    })
  );
};

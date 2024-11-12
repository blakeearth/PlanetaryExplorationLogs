import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

interface RequestResult<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(
    protected http: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) { }

  protected get<T>(url: string): Observable<T> {
    return this.http.get<RequestResult<T>>(url).pipe(
      map((response: { data: any; }) => response.data),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  protected post<T>(url: string, data: any): Observable<T> {
    return this.http.post<RequestResult<T>>(url, data).pipe(
      map((response: { data: any; }) => response.data),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  protected put<T>(url: string, data: any): Observable<T> {
    return this.http.put<RequestResult<T>>(url, data).pipe(
      map((response: { data: any; }) => { response.data; console.log(response); return response.data }),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<RequestResult<T>>(url).pipe(
      map((response: { data: any; }) => response.data),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }
}

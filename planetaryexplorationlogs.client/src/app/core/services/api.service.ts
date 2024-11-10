import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ErrorHandlerService } from './error-handler.service';

interface APIResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export class APIService {
  constructor(
    protected http: HttpClient,
    protected errorHandler: ErrorHandlerService
  ) { }

  protected get<T>(url: string): Observable<T> {
    return this.http.get<APIResponse<T>>(url).pipe(
      map(response => response.data),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }

  protected post<T>(url: string, data: any): Observable<T> {
    return this.http.post<APIResponse<T>>(url, data).pipe(
      map(response => response.data),
      catchError(error => {
        this.errorHandler.handleError(error);
        throw error;
      })
    );
  }
}

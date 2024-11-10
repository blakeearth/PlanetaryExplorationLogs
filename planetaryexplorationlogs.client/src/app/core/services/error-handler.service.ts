import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unspecified error occurred.';

    if (error.status === 404) {
      errorMessage = 'Resource not found. Is the proxy setup working?';
    } else if (error.status >= 500) {
      errorMessage = 'Server error occurred.';
    }

    console.error('API Error:', errorMessage, error);

    return errorMessage;
  }
}

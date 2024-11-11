import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService extends APIService {
  private readonly API_PATH = '/api/mission';

  constructor(http: HttpClient, errorHandler: ErrorHandlerService) {
    super(http, errorHandler);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { DiscoveryType } from '../models/discovery-type.model';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService extends APIService {
  private readonly API_PATH = '/api/discovery';

  private types: number[] = []

  constructor(http: HttpClient, errorHandler: ErrorHandlerService) {
    super(http, errorHandler);
  }

  getDiscoveryTypes(): Observable<DiscoveryType[]> {
    return this.get<DiscoveryType[]>(`${this.API_PATH}/types`);
  }

  deleteDiscovery(id: number): Observable<number> {
    return this.delete<number>(`${this.API_PATH}/${id}`);
  }

}

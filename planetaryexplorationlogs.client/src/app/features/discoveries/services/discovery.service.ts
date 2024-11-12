import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { DiscoveryType } from '../models/discovery-type.model';
import { Discovery } from '../models/discovery.model';
import { DiscoveryFormDto } from '../dtos/discovery-form.dto';

@Injectable({
  providedIn: 'root'
})
export class DiscoveryService extends APIService {
  private readonly API_PATH = '/api/discovery';

  constructor(http: HttpClient, errorHandler: ErrorHandlerService) {
    super(http, errorHandler);
  }

  getDiscoveryTypes(): Observable<DiscoveryType[]> {
    return this.get<DiscoveryType[]>(`${this.API_PATH}/types`);
  }

  deleteDiscovery(id: number): Observable<number> {
    return this.delete<number>(`${this.API_PATH}/${id}`);
  }

  updateDiscovery(id: number, discovery: DiscoveryFormDto): Observable<number> {
    return this.put<number>(`${this.API_PATH}/${id}`, discovery);
  }
}

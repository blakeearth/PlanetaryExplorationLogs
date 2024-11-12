import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Discovery } from '../../discoveries/models/discovery.model';
import { MissionFormDTO } from '../dtos/mission-form.dto';

@Injectable({
  providedIn: 'root'
})
export class MissionService extends APIService {
  private readonly API_PATH = '/api/mission';

  constructor(http: HttpClient, errorHandler: ErrorHandlerService) {
    super(http, errorHandler);
  }

  getDiscoveriesForMission(missionId: number): Observable<Discovery[]> {
    return this.get<Discovery[]>(`${this.API_PATH}/${missionId}/discovery`);
  }

  createMission(mission: MissionFormDTO): Observable<MissionFormDTO> {
    return this.post<MissionFormDTO>(this.API_PATH, mission);
  }
}

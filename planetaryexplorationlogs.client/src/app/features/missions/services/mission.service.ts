import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { Discovery } from '../../discoveries/models/discovery.model';
import { MissionFormDto } from '../dtos/mission-form.dto';
import { DiscoveryFormDto } from '../../discoveries/dtos/discovery-form.dto';

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

  createDiscoveryForMission(discovery: DiscoveryFormDto): Observable<DiscoveryFormDto> {
    return this.post<DiscoveryFormDto>(`${this.API_PATH}/${discovery.missionId}/discovery`, discovery);
  }

  createMission(mission: MissionFormDto): Observable<MissionFormDto> {
    return this.post<MissionFormDto>(this.API_PATH, mission);
  }

  deleteMission(missionId: number): Observable<number> {
    return this.delete<number>(`${this.API_PATH}/${missionId}`);
  }
}

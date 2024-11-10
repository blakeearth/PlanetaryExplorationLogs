import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../../core/services/api.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { PlanetDropdownDTO } from '../dtos/planet-dropdown.dto';
import { Planet } from '../models/planet.model';

@Injectable({
  providedIn: 'root'
})
export class PlanetService extends APIService {
  private readonly API_PATH = '/api/planet';

  constructor(http: HttpClient, errorHandler: ErrorHandlerService) {
    super(http, errorHandler);
  }

  getPlanetDropdown(): Observable<PlanetDropdownDTO[]> {
    return this.get<PlanetDropdownDTO[]>(`${this.API_PATH}/dropdown`);
  }

  getPlanet(id: number): Observable<Planet> {
    return this.get<Planet>(`${this.API_PATH}/${id}`);
  }

  createPlanet(planet: Planet): Observable<Planet> {
    return this.post<Planet>(this.API_PATH, planet);
  }
}

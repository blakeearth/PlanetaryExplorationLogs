import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PlanetDropdownDTO } from './features/planets/dtos/planet-dropdown.dto';
import { Planet } from './features/planets/models/planet.model';
import { PlanetService } from './features/planets/services/planet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './features/missions/components/missions/missions.component';
import { PlanetDisplayComponent } from './features/planets/components/planet-display/planet-display.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule, PlanetDisplayComponent, MissionsComponent]
})
export class AppComponent implements OnInit {
  public selectedPlanetDropdown?: PlanetDropdownDTO;
  public selectedPlanet?: Planet;

  constructor(private planetService: PlanetService) { }

  ngOnInit(): void {
  }

  title = 'planetaryexplorationlogs.client';
}

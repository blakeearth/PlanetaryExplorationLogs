import { Component, OnInit } from '@angular/core';
import { PlanetDropdownDTO } from './features/planets/dtos/planet-dropdown.dto';
import { Planet } from './features/planets/models/planet.model';
import { PlanetService } from './features/planets/services/planet.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './features/missions/components/missions/missions.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule, MissionsComponent]
})
export class AppComponent implements OnInit {
  public dropdownDtos?: PlanetDropdownDTO[];
  public selectedPlanetDropdown?: PlanetDropdownDTO;
  public selectedPlanet?: Planet;

  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.loadPlanetData();
  }

  loadPlanetData() {
    this.planetService.getPlanetDropdown().subscribe((v: PlanetDropdownDTO[]) => this.dropdownDtos = v);
  }

  onPlanetSelect() {
    console.log(this.selectedPlanetDropdown);
    this.selectedPlanetDropdown && this.planetService.getPlanet(this.selectedPlanetDropdown.id).subscribe((v: Planet) => { this.selectedPlanet = v; this.selectedPlanet.id = this.selectedPlanetDropdown!.id });
  }

  title = 'planetaryexplorationlogs.client';
}

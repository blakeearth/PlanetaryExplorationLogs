import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Planet } from '../../models/planet.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanetDropdownDTO } from '../../dtos/planet-dropdown.dto';
import { PlanetService } from '../../services/planet.service';

@Component({
  selector: 'app-planet-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planet-display.component.html',
  styleUrl: './planet-display.component.css'
})
export class PlanetDisplayComponent {

  selectedPlanetDropdown?: PlanetDropdownDTO;

  @Input() selectedPlanet?: Planet;
  @Output() selectedPlanetChange = new EventEmitter<Planet>();

  public dropdownDtos?: PlanetDropdownDTO[];
  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.loadPlanetData();
  }

  loadPlanetData() {
    this.planetService.getPlanetDropdown().subscribe((v: PlanetDropdownDTO[]) => {
      this.dropdownDtos = v;
      if (this.dropdownDtos.length > 0) {
        this.selectedPlanetDropdown = v[0];
        this.onPlanetSelect();
      }
    });
  }

  onPlanetSelect() {
    this.selectedPlanetDropdown && this.planetService.getPlanet(this.selectedPlanetDropdown.id).subscribe((v: Planet) => {
      this.selectedPlanet = v;
      this.selectedPlanet.id = this.selectedPlanetDropdown!.id;
      this.selectedPlanetChange.emit(this.selectedPlanet);
    });
  }
}

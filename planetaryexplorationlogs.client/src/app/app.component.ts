import { Component, OnInit } from '@angular/core';
import { PlanetDropdownDTO } from './features/planets/dtos/planet-dropdown.dto';
import { Planet } from './features/planets/models/planet.model';
import { PlanetService } from './features/planets/services/planet.service';

   @Component({
     selector: 'app-root',
     templateUrl: './app.component.html',
     styleUrls: ['./app.component.css']
   })
   export class AppComponent implements OnInit {
     public dropdownDtos: PlanetDropdownDTO[] = [];
     public selectedPlanet: Planet | undefined;

     constructor(private planetService: PlanetService) {}

     ngOnInit() {
       this.loadPlanetData();
     }

     loadPlanetData() {
       this.planetService.getPlanetDropdown().subscribe((v) => this.dropdownDtos = v);
     }

     onPlanetSelect(id: number) {
       this.planetService.getPlanet(id).subscribe((v) => this.selectedPlanet = v);
     }

     title = 'planetaryexplorationlogs.client';
   }

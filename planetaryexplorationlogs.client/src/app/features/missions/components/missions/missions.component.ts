import { Component, Input, SimpleChanges } from '@angular/core';
import { MissionFormComponent } from '../mission-form/mission-form.component';
import { PlanetService } from '../../../planets/services/planet.service';
import { Mission } from '../../models/mission.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [CommonModule, FormsModule, MissionFormComponent],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.css'
})
export class MissionsComponent {

  @Input({ required: true }) planetId!: number;
  missions: Mission[] = []
  newMission?: Mission;
  constructor(private planetService: PlanetService) { }

  ngOnInit() {
    this.loadPlanetMissions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['planetId']) {
      this.loadPlanetMissions();
    }
  }

  loadPlanetMissions() {
    this.planetService.getPlanetMissions(this.planetId).subscribe((v: Mission[]) => { this.missions = v });
  }

  onNewMission() {
    this.newMission = {};
  }
}

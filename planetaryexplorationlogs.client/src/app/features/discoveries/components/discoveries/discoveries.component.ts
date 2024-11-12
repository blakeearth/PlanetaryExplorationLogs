import { Component, Input, SimpleChanges } from '@angular/core';
import { Discovery } from '../../models/discovery.model';
import { MissionService } from '../../../missions/services/mission.service';
import { DiscoveryFormComponent } from '../discovery-form/discovery-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discoveries',
  standalone: true,
  imports: [CommonModule, DiscoveryFormComponent],
  templateUrl: './discoveries.component.html',
  styleUrl: './discoveries.component.css'
})
export class DiscoveriesComponent {
  @Input({ required: true }) missionId: number = -1;
  discoveries: Discovery[] = []
  constructor(private missionService: MissionService) { }

  ngOnInit() {
    console.log(this.missionId);
    this.loadDiscoveriesForMission();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['missionId']) {
      this.loadDiscoveriesForMission();
    }
  }

  loadDiscoveriesForMission() {
    this.missionService.getDiscoveriesForMission(this.missionId).subscribe((v: Discovery[]) => { this.discoveries = v; });
  }
}

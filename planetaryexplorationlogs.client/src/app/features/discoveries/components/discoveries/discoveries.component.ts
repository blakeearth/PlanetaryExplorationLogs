import { Component, Input, SimpleChanges } from '@angular/core';
import { Discovery } from '../../models/discovery.model';
import { MissionService } from '../../../missions/services/mission.service';
import { DiscoveryFormComponent } from '../discovery-form/discovery-form.component';
import { CommonModule } from '@angular/common';
import { DiscoveryType } from '../../models/discovery-type.model';
import { DiscoveryService } from '../../services/discovery.service';

@Component({
  selector: 'app-discoveries',
  standalone: true,
  imports: [CommonModule, DiscoveryFormComponent],
  templateUrl: './discoveries.component.html',
  styleUrl: './discoveries.component.css'
})
export class DiscoveriesComponent {
  @Input({ required: true }) missionId!: number;

  discoveries: Discovery[] = []
  newDiscovery?: Discovery;

  discoveryTypes: DiscoveryType[] = [];

  constructor(private missionService: MissionService, private discoveryService: DiscoveryService) { }

  ngOnInit() {
    this.loadDiscoveriesForMission();
    this.loadDiscoveryTypes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['missionId']) {
      this.loadDiscoveriesForMission();
    }
  }

  loadDiscoveriesForMission() {
    this.missionService.getDiscoveriesForMission(this.missionId).subscribe((v: Discovery[]) => { this.discoveries = v; console.log(this.discoveries); });
  }

  loadDiscoveryTypes() {
    this.discoveryService.getDiscoveryTypes().subscribe((v: DiscoveryType[]) => this.discoveryTypes = v)
  }

  onNewDiscovery() {
    this.newDiscovery = {
      missionId: this.missionId
    };
  }

  onDiscoveryChange() {
    this.loadDiscoveriesForMission();
  }
}

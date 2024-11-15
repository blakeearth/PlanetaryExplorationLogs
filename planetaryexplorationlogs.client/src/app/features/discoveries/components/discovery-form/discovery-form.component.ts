import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Discovery } from '../../models/discovery.model';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DiscoveryService } from '../../services/discovery.service';
import { DiscoveryFormDto } from '../../dtos/discovery-form.dto';
import { MissionService } from '../../../missions/services/mission.service';
import { DiscoveryType } from '../../models/discovery-type.model';

@Component({
  selector: 'app-discovery-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './discovery-form.component.html',
  styleUrl: './discovery-form.component.css'
})
export class DiscoveryFormComponent {
  @Input() discovery?: Discovery;
  @Output() discoveryChange = new EventEmitter<Discovery>();

  @Input({ required: true }) missionId!: number;

  @Input({ required: true }) discoveryTypes!: DiscoveryType[];

  newDiscovery: boolean = false;
  discoveryForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private missionService: MissionService, private discoveryService: DiscoveryService) { }

  ngOnInit(): void {
    this.discoveryForm = this.formBuilder.group({
      name: [this.discovery?.name ?? '', [Validators.required, Validators.maxLength(150)]],
      discoveryTypeId: [this.discovery?.discoveryTypeId ?? 0, [Validators.required]],
      description: [this.discovery?.description ?? '', [Validators.required, Validators.maxLength(500)]],
      location: [this.discovery?.location ?? '', [Validators.required, Validators.maxLength(200)]]
    });
  }

  onSubmit(): void {
    if (this.discoveryForm.valid) {
      let discovery = this.discoveryForm.value as DiscoveryFormDto;
      discovery.missionId = this.missionId;
      this.missionService.createDiscoveryForMission(discovery).subscribe((_v: Discovery) => { this.onCancel() });
    } else {
      console.log('Failed to submit: Form is invalid');
    }
  }

  onUpdate(): void {
    if (this.discovery?.id && this.discoveryForm.valid) {
      let discovery: DiscoveryFormDto = this.discoveryForm.value as DiscoveryFormDto;
      discovery.missionId = this.missionId;
      this.discoveryService.updateDiscovery(this.discovery.id, discovery).subscribe();
    }
    else {
      console.log('Failed to save update: form is invalid');
    }
  }

  delete(e?: Event) {
    // Prevent any submission attempt before unmounting the form
    e?.preventDefault();

    this.discoveryService.deleteDiscovery(this.discovery?.id ?? 0).subscribe((_v: number) => {
      this.onCancel();
      this.discovery = undefined;
    });
  }

  onCancel(e?: Event) {
    // Prevent any submission attempt before unmounting the form
    e?.preventDefault();

    // Output that this was canceled
    this.discovery = undefined;
    this.discoveryChange.emit(this.discovery);
  }
}

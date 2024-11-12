import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Discovery } from '../../../discoveries/models/discovery.model';
import { MissionService } from '../../services/mission.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mission } from '../../models/mission.model';
import { DiscoveriesComponent } from '../../../discoveries/components/discoveries/discoveries.component';
import { MissionFormDTO } from '../../dtos/mission-form.dto';

@Component({
  selector: 'app-mission-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DiscoveriesComponent],
  templateUrl: './mission-form.component.html',
  styleUrl: './mission-form.component.css'
})
export class MissionFormComponent {

  @Input({ required: true }) planetId!: number;
  @Input() mission?: Mission;
  @Output() missionChange = new EventEmitter<Mission>();

  newMission: boolean = false;
  discoveries: Discovery[] = [
    { id: 1, name: 'Discovery 1', description: 'Discovery 1 description', missionId: 1, discoveryTypeId: 1, location: 'Marqarth' },
    { id: 2, name: 'Discovery 2', description: 'Discovery 2 description', missionId: 2, discoveryTypeId: 2, location: 'Pansino' }
  ];
  missionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private missionService: MissionService) { }

  ngOnInit(): void {
    this.missionForm = this.formBuilder.group({
      date: [this.mission?.date ?? '', [Validators.required]],
      name: [this.mission?.name ?? '', [Validators.required]],
      description: [this.mission?.description ?? '', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.missionForm.valid) {
      let mission: MissionFormDTO = this.missionForm.value as MissionFormDTO;
      mission.planetId = this.planetId;
      this.missionService.createMission(this.missionForm.value).subscribe((_v: Mission) => { this.onCancel() })
    }
    else {
      console.log('Form is invalid');
    }
  }

  onCancel(e?: Event) {
    // Prevent any submission attempt before unmounting the form
    e?.preventDefault();

    // Output that this was canceled
    this.mission = undefined;
    this.missionChange.emit(this.mission);
  }
}

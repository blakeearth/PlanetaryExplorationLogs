import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Discovery } from '../../../discoveries/models/discovery.model';
import { MissionService } from '../../services/mission.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mission } from '../../models/mission.model';
import { MissionFormDto } from '../../dtos/mission-form.dto';

@Component({
  selector: 'app-mission-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mission-form.component.html',
  styleUrl: './mission-form.component.css'
})
export class MissionFormComponent {

  @Input({ required: true }) planetId!: number;
  @Input() mission?: Mission;
  @Output() missionChange = new EventEmitter<Mission>();

  newMission: boolean = false;
  submissionAttempted: boolean = false;
  discoveries: Discovery[] = [];
  missionForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private missionService: MissionService) { }

  ngOnInit(): void {
    this.missionForm = this.formBuilder.group({
      date: [this.mission?.date ? this.formatDate(new Date(this.mission?.date ?? '')) : undefined, [Validators.required]],
      name: [this.mission?.name ?? '', [Validators.required, Validators.maxLength(150)]],
      description: [this.mission?.description ?? '', [Validators.required, Validators.maxLength(500)]],
      id: [this.mission?.id ?? 0]
    });
  }

  onSubmit(): void {
    this.submissionAttempted = true;
    if (this.missionForm.valid) {
      let mission: MissionFormDto = this.missionForm.value as MissionFormDto;
      mission.planetId = this.planetId;
      this.missionService.createMission(mission).subscribe((_v: Mission) => { this.onCancel() })
    }
    else {
      console.log('Failed to submit: Form is invalid');
    }
  }

  onUpdate(): void {
    if (this.mission?.id && this.missionForm.valid) {
      let mission: MissionFormDto = this.missionForm.value as MissionFormDto;
      mission.planetId = this.planetId;
      this.missionService.updateMission(this.mission.id, mission).subscribe();
    }
    else {
      console.log('Failed to save update: form is invalid');
    }
  }

  onDelete(e?: Event) {
    // Prevent any submission attempt before unmounting the form
    e?.preventDefault();

    this.missionService.deleteMission(this.mission?.id ?? 0).subscribe((_v: number) => this.onCancel());
  }

  onCancel(e?: Event) {
    // Prevent any submission attempt before unmounting the form
    e?.preventDefault();

    // Output that this was canceled
    this.mission = undefined;
    this.missionChange.emit(this.mission);
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
}

import { Component, Input } from '@angular/core';
import { Discovery } from '../../models/discovery.model';
import { ValidatedFieldComponent } from '../../../../core/components/validated-field/validated-field.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discovery-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidatedFieldComponent],
  templateUrl: './discovery-form.component.html',
  styleUrl: './discovery-form.component.css'
})
export class DiscoveryFormComponent {
  @Input() discovery?: Discovery;

  newDiscovery: boolean = false;
  discoveryForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.discoveryForm = this.formBuilder.group({
      name: [this.discovery?.name ?? '', [Validators.required]],
      description: [this.discovery?.description ?? '', [Validators.required]],
      location: [this.discovery?.location ?? '', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.discoveryForm.valid) {
      console.log('Form Submitted', this.discoveryForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}

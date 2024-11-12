import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetDisplayComponent } from './planet-display.component';

describe('PlanetDisplayComponent', () => {
  let component: PlanetDisplayComponent;
  let fixture: ComponentFixture<PlanetDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

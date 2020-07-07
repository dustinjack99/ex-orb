import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetMapComponent } from './planet-map.component';

describe('PlanetSearchComponent', () => {
  let component: PlanetMapComponent;
  let fixture: ComponentFixture<PlanetMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlanetMapComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetMapRoutingModule } from './planet-map-routing.module';
import { PlanetMapComponent } from './planet-map.component';
import { MaterialModule } from '@ex-orb/material';

@NgModule({
  declarations: [PlanetMapComponent],
  imports: [CommonModule, PlanetMapRoutingModule, MaterialModule],
  exports: [PlanetMapComponent],
})
export class PlanetMapModule {}

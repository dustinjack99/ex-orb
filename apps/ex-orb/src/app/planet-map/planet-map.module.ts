import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetMapRoutingModule } from './planet-map-routing.module';
import { PlanetMapComponent } from './planet-map.component';
import { MaterialModule } from '@ex-orb/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlanetMapComponent],
  imports: [CommonModule, PlanetMapRoutingModule, MaterialModule, FormsModule],
  exports: [PlanetMapComponent],
})
export class PlanetMapModule {}

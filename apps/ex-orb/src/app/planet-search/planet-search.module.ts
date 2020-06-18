import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetSearchRoutingModule } from './planet-search-routing.module';
import { PlanetSearchComponent } from './planet-search.component';
import { MaterialModule } from '@ex-orb/material';

@NgModule({
  declarations: [PlanetSearchComponent],
  imports: [CommonModule, PlanetSearchRoutingModule, MaterialModule],
  exports: [PlanetSearchComponent],
})
export class PlanetSearchModule {}

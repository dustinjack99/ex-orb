import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanetSearchRoutingModule } from './planet-search-routing.module';
import { PlanetSearchComponent } from './planet-search.component';


@NgModule({
  declarations: [PlanetSearchComponent],
  imports: [
    CommonModule,
    PlanetSearchRoutingModule
  ]
})
export class PlanetSearchModule { }

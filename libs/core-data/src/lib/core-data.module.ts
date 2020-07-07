import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PlanetMapService } from './planet-search/planet-search.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [PlanetMapService],
})
export class CoreDataModule {}

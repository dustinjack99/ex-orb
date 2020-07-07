import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PlanetSearchService } from './planet-search/planet-search.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [PlanetSearchService],
})
export class CoreDataModule {}

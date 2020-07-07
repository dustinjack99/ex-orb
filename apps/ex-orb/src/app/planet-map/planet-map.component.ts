import { Component, OnInit } from '@angular/core';
import { PlanetMapService, PlanetMap } from '@ex-orb/core-data';
import { Observable } from 'rxjs';

@Component({
  selector: 'ex-orb-planet-search',
  templateUrl: './planet-map.component.html',
  styleUrls: ['./planet-map.component.scss'],
})
export class PlanetMapComponent implements OnInit {
  selectedPlanet: PlanetMap;
  planets$;

  constructor(private planetMapService: PlanetMapService) {}

  ngOnInit(): void {
    this.getPlanets();
  }

  selectPlanet(planet) {
    this.selectedPlanet = planet;
    console.log('selected planet', planet);
  }

  getPlanets() {
    this.planets$ = this.planetMapService.all();
  }

  cancel() {
    this.selectPlanet(null);
  }
}

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
    this.resetPlanet();
  }

  selectPlanet(planet) {
    this.selectedPlanet = planet;
    console.log('selected planet', planet);
  }

  resetPlanet() {
    const emptyPlanet: PlanetMap = {
      pl_bmasse: 0,
      pl_edelink: '',
      pl_hostname: '',
      pl_name: '',
      pl_orbper: 0,
      pl_pelink: '',
      pl_pnum: 0,
      pl_rade: 0,
      st_glat: 0,
      st_glon: 0,
      st_metaratio: '',
    };
    this.selectPlanet(emptyPlanet);
  }

  // sortPlanets(planets) {
  //   planets.sort((a, b) => {
  //     return b.st_glat - a.st_glat;
  //   });
  //   this.planets$ = planets;
  // }

  getPlanets() {
    this.planets$ = this.planetMapService.all();
  }

  savePlanet(planet) {
    console.log('planet conquered', planet);
  }

  cancel() {
    this.resetPlanet();
  }
}

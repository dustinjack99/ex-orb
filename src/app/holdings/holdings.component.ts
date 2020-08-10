import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../shared/services/planets.service';

@Component({
  selector: 'ex-orb-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.scss'],
})
export class HoldingsComponent implements OnInit {
  currentPlanet = null;
  planets = null;
  //this will eventually be the API call
  // OR this could be your current planetary holding
  // now that I think about it, this list should be
  // your current planetary holdings, that way we
  // wont have to populate all planets at once;

  constructor(private planetService: PlanetsService) {}

  ngOnInit(): void {
    this.resetSelectPlanet();
    this.planets = this.planetService.all();
  }

  resetSelectPlanet() {
    //set real empty planet data
    const emptyPlanet = {
      id: null,
      title: '',
      description: '',
      percentComplete: 0,
      favorite: false,
    };

    this.currentPlanet = emptyPlanet;
  }

  cancel() {
    this.resetSelectPlanet();
  }

  deletePlanet(planet) {
    this.planetService.delete(planet);
    console.log(planet + 'deleted');
  }

  savePlanet(planet) {
    if (planet.id) {
      this.planetService.update(planet);
    } else {
      this.planetService.create(planet);
    }
  }

  selectPlanet(planet) {
    this.currentPlanet = planet;
  }
}

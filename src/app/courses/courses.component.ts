import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  currentPlanet = null;

  //this will eventually be the API call
  // OR this could be your current planetary holding
  // now that I think about it, this list should be
  // your current planetary holdings, that way we
  // wont have to populate all planets at once;
  planets = [
    {
      id: 1,
      title: 'Terra',
      description:
        'Abundant life and liquid water. Birthplace of homo sapien sapiens.',
      percentComplete: 26,
      favorite: true,
    },
    {
      id: 2,
      title: 'Mars',
      description: 'Red planet with solid water at poles.',
      percentComplete: 26,
      favorite: true,
    },
    {
      id: 3,
      title: 'Venus',
      description: 'Barren, heated rock with valuable gases in atmosphere.',
      percentComplete: 26,
      favorite: true,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.resetSelectPlanet();
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
    console.log(planet + 'deleted');
  }

  savePlanet() {
    console.log('planet saved');
  }

  selectPlanet(planet) {
    this.currentPlanet = planet;
  }
}

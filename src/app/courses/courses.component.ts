import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  currentPlanet = null;
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

  ngOnInit(): void {}

  selectPlanet(planet) {
    this.currentPlanet = planet;
  }

  deletePlanet(planet) {
    console.log(planet + 'deleted');
  }
}

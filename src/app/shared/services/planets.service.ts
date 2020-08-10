import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  private planets = [
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

  all() {
    return this.planets;
  }

  find(planetId) {}

  create(planet) {
    console.log('PLANET BIRTHED', planet);
  }

  update(planet) {
    console.log('PLANET ORDER GIVEN', planet);
  }

  delete(planetId) {
    console.log('PLANET OBLITERATED', planetId);
  }
}

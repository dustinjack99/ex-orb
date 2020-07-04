import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ex-orb-planet-search',
  templateUrl: './planet-search.component.html',
  styleUrls: ['./planet-search.component.scss'],
})
export class PlanetSearchComponent implements OnInit {
  planets = [];
  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { PlanetSearchService, PlanetSearch } from '@ex-orb/core-data';

@Component({
  selector: 'ex-orb-planet-search',
  templateUrl: './planet-search.component.html',
  styleUrls: ['./planet-search.component.scss'],
})
export class PlanetSearchComponent implements OnInit {
  selectedProject: PlanetSearch;
  projects: PlanetSearch[];

  constructor(private planetSearchService: PlanetSearchService) {}

  ngOnInit(): void {
    this.getPlanets();
  }

  selectProject(project) {
    this.selectedProject = project;
    console.log('selected project', project);
  }

  getPlanets() {
    this.planetSearchService
      .all()
      .subscribe((result: any) => (this.projects = result));
  }

  cancel() {
    this.selectProject(null);
  }
}

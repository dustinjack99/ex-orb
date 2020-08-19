import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Pipe,
  PipeTransform,
} from '@angular/core';
import {
  MapService,
  makeMap,
  mapBounds,
  dimensions,
} from '../shared/services/map.service';
import * as _ from 'lodash';

@Pipe({
  name: 'filterUnique',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform(val: any): any {
    if (val !== undefined && val !== null) {
      return _.uniqBy(val, 'pl_hostname');
    }
    return val;
  }
}

@Component({
  selector: 'ex-orb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  color: string = 'red';
  mapStars = new Array();
  response;
  JSON;

  @ViewChild('svg', { static: true })
  svg: ElementRef<SVGElement>;

  constructor(private mapService: MapService) {
    this.JSON = JSON;
  }

  dismissBtn() {
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    starBox.style.display = 'none';
  }

  // Finds the coordinates of the X / Y for star based on ecliptic latitude / longitude
  getX = (x) => {
    let position =
      (x - mapBounds.minGlat) / (mapBounds.maxGlat - mapBounds.minGlat);
    return dimensions.width * position;
  };

  getY = (y) => {
    let position =
      (y - mapBounds.minGlon) / (mapBounds.maxGlon - mapBounds.minGlon);
    return dimensions.height * position;
  };

  // Gets indexes and planets to push to Star function.
  getIndexes(res, starName) {
    let indexes = [],
      i;
    for (i = 0; i < res.length; i++) {
      if (res[i].pl_hostname === starName) {
        indexes.push(i);
      }
    }
    return indexes;
  }

  getPlanets(res, indexes) {
    let planets = [];

    for (let i = 0; i < indexes.length; i++) {
      let numI = indexes[i];
      planets.push(res[numI]);
    }
    return planets;
  }

  printPlanets = (planets) => {
    const starBox = <HTMLUListElement>document.querySelector('#starBox');
    const starStats = document.querySelector('#starStats');
    starStats.innerHTML = '';

    planets.map((planet) => {
      const li = document.createElement('li');
      li.textContent = planet.pl_name;
      starStats.appendChild(li);
    });
    starBox.style.display = 'flex';
  };

  zoomIn() {
    const map = document.querySelector('svg');
    const viewBox = map.viewBox.baseVal;

    // viewBox.x = viewBox.x + viewBox.width / 4;
    // viewBox.y = viewBox.y + viewBox.height / 4;
    // viewBox.width = viewBox.width / 2;
    // viewBox.height = viewBox.height / 2;

    console.log(viewBox);
  }

  ngOnInit() {
    makeMap(this.svg);

    //Service Mapping Stars and Planets onto Star Map
    this.mapService.all().subscribe((response) => {
      this.mapStars = response;
    });
  }
}

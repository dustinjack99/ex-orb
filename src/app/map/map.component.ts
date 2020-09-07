import {
  Component,
  ElementRef,
  OnInit,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import {
  MapService,
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
  area = `0 0 ${dimensions.width} ${dimensions.height}`;
  dimensions;
  dragPosition = {
    x: 0,
    y: 0,
  };
  img = '../../assets/milky.jpg';
  mapStars$ = new Array();
  loading = true;

  @ViewChild('svg', { static: true })
  svg: ElementRef<SVGElement>;

  @ViewChild('matspinner', { static: true })
  spinner: ElementRef<HTMLElement>;

  constructor(private mapService: MapService) {
    this.dimensions = dimensions;
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

  printPlanets = (planets, starx, stary) => {
    const starBox = <HTMLElement>document.querySelector('#starBox');
    const starStats = document.querySelector('#starStats');
    starStats.innerHTML = '';

    if (stary - 90 < 0) {
      this.dragPosition = { x: starx + 15, y: 0 };
    } else {
      this.dragPosition = { x: starx + 15, y: stary - 90 };
    }

    planets.map((planet) => {
      const li = document.createElement('li');
      li.textContent = planet.pl_name;
      starStats.appendChild(li);
    });

    starBox.style.display = 'flex';
  };

  loadListen(): any {
    setInterval(() => {
      if (this.svg.nativeElement.children.length < 2) {
        this.loading = true;
      } else {
        this.loading = false;
      }
    }, 1000);
  }

  zoomIn() {
    const map = document.querySelector('svg');
    const viewBox = map.viewBox.baseVal;

    // viewBox.x = viewBox.x + viewBox.width / 4;
    // viewBox.y = viewBox.y + viewBox.height / 4;
    // viewBox.width = viewBox.width / 2;
    // viewBox.height = viewBox.height / 2;

    // console.log(viewBox);
  }

  ngOnInit() {
    // console.log(this.svg);
    // makeMap(map.nativeElement);
    this.loadListen();
    //Service Mapping Stars and Planets onto Star Map
    this.mapService.all().subscribe((response) => {
      this.mapStars$ = response;
    });
  }
}

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
  mapStars = new Array();
  response;
  red = 'red';
  one = '5';

  @ViewChild('svg', { static: true })
  svg: ElementRef<SVGElement>;

  constructor(private mapService: MapService) {}

  dismissBtn() {
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    starBox.style.display = 'none';
  }

  zoomIn() {
    const map = document.querySelector('svg');
    const viewBox = map.viewBox.baseVal;

    // viewBox.x = viewBox.x + viewBox.width / 4;
    // viewBox.y = viewBox.y + viewBox.height / 4;
    // viewBox.width = viewBox.width / 2;
    // viewBox.height = viewBox.height / 2;

    console.log(viewBox);
  }

  // Finds the coordinates of the X / Y for star based on ecliptic latitude / longitude
  getX = (x) => {
    let position =
      (x - mapBounds.minGlat) / (mapBounds.maxGlat - mapBounds.minGlat);
    return dimensions.width * position;
  };

  getY = (y) => {
    let yPI = y * Math.PI;
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
    // console.log(planets);
    return planets;
  }

  ngOnInit() {
    // const disBtn = document.querySelector('dismissBtn');
    // const zoomBtn = document.querySelector('zoomBtn');

    makeMap(this.svg);

    //Service Mapping Stars and Planets onto Star Map
    this.mapService.all().subscribe((response) => {
      this.mapStars = response;
      // console.log(response);
      // this.mapStars.map((star) => {
      //   let x = getX(star.st_elat);
      //   let y = getY(star.st_elon);
      //   let radius = '0.5%';
      //   let starStats = {
      //     name: star.pl_hostname,
      //     x: x,
      //     y: y,
      //     r: radius,
      //     planets: getPlanets(response, getIndexes(response, star.pl_hostname)),
      //   };

      //   const newStar = new Star(starStats, this.svg);
      //   newStar.draw();
      // });
    });
  }

  // resetPlanet() {
  //   const emptyPlanet: PlanetMap = {
  //     pl_bmasse: 0,
  //     pl_edelink: '',
  //     pl_hostname: '',
  //     pl_name: '',
  //     pl_orbper: 0,
  //     pl_pelink: '',
  //     pl_pnum: 0,
  //     pl_rade: 0,
  //     st_glat: 0,
  //     st_glon: 0,
  //     st_metaratio: '',
  //   };
  //   this.selectPlanet(emptyPlanet);
  // }
}

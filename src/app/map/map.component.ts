import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  MapService,
  makeMap,
  Star,
  getIndexes,
  getPlanets,
  getX,
  getY,
} from '../shared/services/map.service';

@Component({
  selector: 'ex-orb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapStars = new Array();

  @ViewChild('svg', { static: true })
  svg: ElementRef<SVGElement>;

  constructor(private mapService: MapService) {}

  dismissBtn() {
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    starBox.style.display = 'none';
  }

  ngOnInit() {
    // const disBtn = document.querySelector('dismissBtn');
    // const zoomBtn = document.querySelector('zoomBtn');

    makeMap(this.svg);

    //Service Mapping Stars and Planets onto Star Map
    this.mapService.all().subscribe((response) => {
      this.mapStars = response;

      this.mapStars.map((star) => {
        let x = getX(star.st_elat);
        let y = getY(star.st_elon);
        let radius = 3;
        let starStats = {
          name: star.pl_hostname,
          x: x,
          y: y,
          r: radius,
          planets: getPlanets(response, getIndexes(response, star.pl_hostname)),
        };

        const newStar = new Star(starStats, this.svg);
        newStar.draw();
      });
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

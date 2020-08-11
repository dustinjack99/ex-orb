import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService, Planet } from '../shared/services/map.service';
import { Observable } from 'rxjs';
import { PlanetsService } from '../shared/services/planets.service';
// import { defaultMaxListeners } from 'stream';

@Component({
  selector: 'ex-orb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapPlanets = new Array<Planet>();

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    const mapBounds = {
      minGlon: -5,
      maxGlon: 365,
      minGlat: -95,
      maxGlat: 95,
    };

    const dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const getX = (x) => {
      let position =
        (x - mapBounds.minGlon) / (mapBounds.maxGlon - mapBounds.minGlon);
      return dimensions.width * position;
    };

    const getY = (y) => {
      let position =
        (y - mapBounds.minGlat) / (mapBounds.maxGlat - mapBounds.minGlat);
      return dimensions.height * position;
    };

    const map = this.canvas.nativeElement;
    const c = map.getContext('2d');
    map.width = dimensions.width;
    map.height = dimensions.height;

    this.mapService.all().subscribe((response) => {
      this.mapPlanets = response;
      this.mapPlanets.map((planet) => {
        let x = getX(planet.st_glon);
        let y = getY(planet.st_glat);
        let dx = 4;
        let dy = 4;
        const radius = 5;

        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue';
        c.stroke();
      });

      // const animate = () => {
      //   requestAnimationFrame(animate);
      //   c.clearRect(0, 0, innerWidth, innerHeight);

      //   c.beginPath();
      //   c.arc(x, y, radius, 0, Math.PI * 2, false);
      //   c.strokeStyle = 'blue';
      //   c.stroke();

      //   if (x + radius > innerWidth || x - radius < 0) {
      //     dx = -dx;
      //   }
      //   if (y + radius > innerHeight || y - radius < 0) {
      //     dy = -dy;
      //   }

      //   x += dx;
      //   y += dy;
      // };

      // animate();
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

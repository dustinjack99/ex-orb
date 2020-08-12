import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ViewChildren,
} from '@angular/core';
import { MapService, Planet } from '../shared/services/map.service';
import { Observable } from 'rxjs';
import { PlanetsService } from '../shared/services/planets.service';

@Component({
  selector: 'ex-orb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapPlanets = new Array<Planet>();

  // @ViewChild('canvas', { static: true })
  @ViewChild('svg', { static: true })
  // @ViewChild('svgImg', { static: true })
  // canvas: ElementRef<HTMLCanvasElement>;
  svg: ElementRef<SVGElement>;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    // Sets Maps Galactic Coordinates onto Canvas Map
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
      return Math.floor(dimensions.width * position);
    };

    const getY = (y) => {
      let position =
        (y - mapBounds.minGlat) / (mapBounds.maxGlat - mapBounds.minGlat);
      return Math.floor(dimensions.height * position);
    };

    const map = this.svg.nativeElement;
    const svgImg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'image'
    );

    map.setAttribute('height', `${dimensions.height}`);
    map.setAttribute('width', `${dimensions.width}`);
    map.setAttribute('viewBox', `0 0 ${dimensions.width} ${dimensions.height}`);
    svgImg.setAttribute('height', `${dimensions.height}`);
    svgImg.setAttribute('width', `${dimensions.width}`);
    svgImg.setAttribute('preserveAspectRatio', 'none');
    svgImg.setAttribute('href', '../../assets/starCoordlarge.jpg');
    svgImg.setAttribute('transform', 'rotate(-90s)');

    map.appendChild(svgImg);
    // const map = this.canvas.nativeElement;
    // const c = map.getContext('2d');
    // map.width = dimensions.width;
    // map.height = dimensions.height;

    //Planet Class
    function Planet(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;

      this.draw = () => {
        // c.beginPath();
        // c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        // c.strokeStyle = 'blue';
        // c.stroke();
        const planet = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );
        planet.setAttribute('cx', `${this.x}`);
        planet.setAttribute('cy', `${this.y}`);
        planet.setAttribute('r', `${this.radius}`);
        planet.setAttribute('fill', `red`);
        planet.addEventListener('mouseover', function (e) {
          console.log(e.target);
        });
        console.log(planet);
        map.appendChild(planet);
      };
    }

    //Mouse Position on Canvas Star Map
    let mouse = {
      x: undefined,
      y: undefined,
    };

    const planetCoords = [];

    // map.addEventListener('mousemove', (e) => {
    //   mouse.x = e.x;
    //   mouse.y = e.y;
    //   // console.log(mouse);

    //   for (let i = 0; i < planetCoords.length; i++) {
    //     let dx = mouse.x - planetCoords[i].x;
    //     let dy = mouse.y - planetCoords[i].y;

    //     if (dx * dx + dy * dy < planetCoords[i].r * planetCoords[i].r) {
    //       console.log('lets see if this works');
    //     }
    //   }
    // });

    //Service Mapping planets onto Star Map
    this.mapService.all().subscribe((response) => {
      this.mapPlanets = response;
      this.mapPlanets.map((planet) => {
        let x = getX(planet.st_glon);
        let y = getY(planet.st_glat);
        let radius = 3;
        let planetCoord = {
          x: x,
          y: y,
          r: radius,
        };

        planetCoords.push(planetCoord);

        let newPlanet = new Planet(x, y, radius);
        newPlanet.draw();
      });
      console.log(planetCoords);
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

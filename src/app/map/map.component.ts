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
  mapStars = new Array();

  @ViewChild('svg', { static: true })
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
    // svgImg.setAttribute('transform', 'rotate(-90s)');

    map.appendChild(svgImg);

    //Star Class
    function Star(starStats) {
      this.x = starStats.x;
      this.y = starStats.y;
      this.radius = starStats.r;
      this.planets = starStats.planets;
      this.alertPlanets = () => {};
      this.draw = () => {
        const star = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );
        star.setAttribute('cx', `${this.x}`);
        star.setAttribute('cy', `${this.y}`);
        star.setAttribute('r', `${this.radius}`);
        star.setAttribute('fill', `red`);
        star.addEventListener(
          'click',
          (this.alertPlanets = () => {
            console.log(this.planets.map((planet) => planet));
            // console.log(th)
          })
        );
        // console.log(star);
        map.appendChild(star);
      };
    }

    //Service Mapping planets onto Star Map
    this.mapService.all().subscribe((response) => {
      this.mapStars = response;

      function getIndexes(res, starName) {
        let indexes = [],
          i;
        for (i = 0; i < res.length; i++) {
          if (res[i].pl_hostname === starName) {
            indexes.push(i);
          }
        }
        return indexes;
      }

      function getPlanets(res, indexes) {
        let planets = [];
        // console.log(indexes);
        for (let i = 0; i < indexes.length; i++) {
          let numI = indexes[i];
          planets.push(res[numI]);
        }
        return planets;
      }

      this.mapStars.map((star) => {
        let x = getX(star.st_glon);
        let y = getY(star.st_glat);
        let radius = 3;
        let starStats = {
          name: star.pl_hostname,
          x: x,
          y: y,
          r: radius,
          planets: getPlanets(response, getIndexes(response, star.pl_hostname)),
        };

        // console.log(starStats);

        const newStar = new Star(starStats);
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

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
  getIndexes,
  getPlanets,
  getX,
  getY,
  dimensions,
} from '../shared/services/map.service';
import * as _ from 'lodash';
import { gsap, TweenMax } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(MotionPathPlugin, PixiPlugin, TextPlugin);

@Pipe({
  name: 'filterUnique',
  pure: false,
})

//Pipe to filter repeated star systems
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
  dragPosition = { x: 0, y: 0 };
  getIndexes;
  getPlanets;
  getX;
  getY;
  img = '../../assets/milky.jpg';
  loader;
  mapStars$ = new Array();
  loading = true;

  @ViewChild('container', { static: true })
  private _container: ElementRef;

  @ViewChild('svg', { static: true })
  svg: ElementRef<SVGElement>;

  @ViewChild('matspinner', { static: true })
  spinner: ElementRef<HTMLElement>;

  constructor(private mapService: MapService) {
    this.dimensions = dimensions;
    this.getIndexes = getIndexes;
    this.getPlanets = getPlanets;
    this.getX = getX;
    this.getY = getY;
  }

  dismissBtn() {
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    starBox.style.display = 'none';
  }

  private get container(): HTMLDivElement {
    return this._container.nativeElement;
  }

  loadListen(): any {
    let loader;
    loader = setInterval(() => {
      if (this.svg.nativeElement.children.length < 2) {
        this.loading = true;
      } else {
        this.loading = false;
        this._container.nativeElement.style.display = 'flex';
        this._container.nativeElement.style.justifyContent = 'center';
        this._container.nativeElement.style.border = '1px solid blue';
        this._container.nativeElement.style.borderRadius = '5px';
        this._container.nativeElement.style.padding = '30px 0px 30px 0px';
        TweenMax.fromTo(
          this.container,
          1.5,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1 }
        );
        clearInterval(loader);
      }
    }, 1000);
  }

  printPlanets(planets, starx, stary, event) {
    const starBox = <HTMLElement>document.querySelector('#starBox');
    const starStats = document.querySelector('#starStats');
    starStats.innerHTML = '';

    this.dragPosition = { x: event[0].layerX, y: event[0].layerY };

    planets.map((planet) => {
      const li = document.createElement('li');
      li.textContent = planet.pl_name;
      starStats.appendChild(li);
    });

    starBox.style.display = 'flex';
  }

  zoomIn() {
    const map = document.querySelector('svg');
    const viewBox = map.viewBox.baseVal;
  }

  ngOnInit() {
    this.loadListen();

    //Service Mapping Stars and Planets onto Star Map
    this.mapService.all().subscribe((response) => {
      fetch('http://localhost:7777/db', {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
      this.mapStars$ = response;
      console.log(response);
    });
  }
}

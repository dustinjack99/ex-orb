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
import { TweenLite, TimelineLite, Linear } from 'gsap';

@Pipe({
  name: 'filterUnique',
  pure: false,
})

//Pipe to filter repeated star systems
export class FilterPipe implements PipeTransform {
  uniqBy = (arr, predicate) => {
    const cb =
      typeof predicate === 'function' ? predicate : (o) => o[predicate];
    return [
      ...arr
        .reduce((map, item) => {
          const key = item === null || item === undefined ? item : cb(item);
          map.has(key) || map.set(key, item);
          return map;
        }, new Map())
        .values(),
    ];
  };

  transform(val: any): any {
    if (val !== undefined && val !== null) {
      return this.uniqBy(val, 'pl_hostname');
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
  currentSystem;
  dimensions;
  dragPosition = { x: 0, y: 0 };
  getIndexes;
  getPlanets;
  getX;
  getY;
  img = '../../assets/milky.jpg';
  loader;
  loading = true;
  mapStars$ = new Array();
  opened = false;
  // planetColors = {
  // "[Fe/H]": "slategray", 2843 total
  // "[M/H]": "red", 58 total
  // "[m/H]": "blue", 20 total
  // null: "black", 1355 total
  // }
  zoomed = false;

  @ViewChild('container', { static: true })
  private _container: ElementRef;

  @ViewChild('matspinner', { static: true })
  spinner: ElementRef<HTMLElement>;

  @ViewChild('star', { static: true })
  star: ElementRef<HTMLElement>;

  @ViewChild('svg', { static: true })
  svg: ElementRef<SVGElement>;

  @ViewChild('svgImg', { static: true })
  svgImg: ElementRef<HTMLElement>;

  constructor(private mapService: MapService) {
    this.dimensions = dimensions;
    this.getIndexes = getIndexes;
    this.getPlanets = getPlanets;
    this.getX = getX;
    this.getY = getY;
  }

  private get container(): HTMLDivElement {
    return this._container.nativeElement;
  }

  close() {
    this.opened = false;
  }

  dismissBtn() {
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    starBox.style.display = 'none';
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
        TweenLite.fromTo(this.container, 1.5, { opacity: 0 }, { opacity: 1 });
        clearInterval(loader);
      }
    }, 10);
  }

  open() {
    this.opened = true;

    setTimeout(() => {
      const star = <SVGCircleElement>document.querySelector('.star');
      const planets = document.querySelectorAll('.planets');
      const starBBoxX = `${star.getBBox().x + star.getBBox().width / 2}`;
      const starBBoxY = `${star.getBBox().y + star.getBBox().height / 2}`;
      const master = new TimelineLite();

      planets.forEach((planet) => {
        TweenLite.to(planet, {
          duration: planet.getAttribute('orbit'),
          rotation: 360,
          svgOrigin: starBBoxX + ' ' + starBBoxY,
          repeat: -1,
          ease: Linear.easeNone,
        });
      });
    }, 10);
  }

  printPlanets(planets, event) {
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    const { layerX } = event[0];
    const { layerY } = event[0];

    if (this.opened) {
      this.open();
    }

    this.currentSystem = planets;

    const starBounds = {
      x: `${event[0].path[0].getBBox().x}`,
      y: `${event[0].path[0].getBBox().y}`,
      width: `${event[0].path[0].getBBox().width}`,
      height: `${event[0].path[0].getBBox().height}`,
    };

    TweenLite.fromTo(starBox, 0.5, { opacity: 0 }, { opacity: 1 });

    this.dragPosition = { x: layerX + 20, y: layerY - 90 };
    if (this.dragPosition.y < 0) {
      this.dragPosition.y = 0;
    }
    if (this.dragPosition.y + 150 > event[0].view.innerHeight) {
      this.dragPosition.y = layerY - 150;
    }
    if (this.dragPosition.x + 300 > event[0].view.innerWidth) {
      this.dragPosition.x = layerX - 320;
    }

    starBox.setAttribute('zoomBox', JSON.stringify(starBounds));
    starBox.style.display = 'flex';
  }

  readPlanet(event) {
    console.log(event[0].path[0]);
  }

  zoomIn() {
    this.zoomed = true;
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    const z = JSON.parse(starBox.getAttribute('zoomBox'));

    TweenLite.fromTo(
      this.svg.nativeElement,
      2,
      { attr: { viewBox: this.area } },
      {
        attr: {
          viewBox: `${z.x} ${z.y} ${z.width} ${z.height}`,
        },
      }
    );

    TweenLite.fromTo(
      document.querySelectorAll('.stars'),
      2,
      { attr: { r: '0.5%' } },
      { attr: { r: '1.5%' } }
    );
  }

  zoomOut() {
    this.zoomed = false;
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    const z = JSON.parse(starBox.getAttribute('zoomBox'));

    TweenLite.fromTo(
      this.svg.nativeElement,
      2,
      {
        attr: {
          viewBox: `${z.x} ${z.y} ${z.width} ${z.height}`,
        },
      },
      { attr: { viewBox: this.area } }
    );

    TweenLite.fromTo(
      document.querySelectorAll('.stars'),
      2,
      { attr: { r: '1.5%' } },
      { attr: { r: '0.5%' } }
    );
  }

  ngOnInit() {
    this.loadListen();

    // Service Mapping Stars and Planets onto Star Map
    // this.mapService.all().subscribe((response) => {
    //   this.mapStars$ = response;
    // });

    this.mapService.offline().subscribe((response) => {
  let res = JSON.parse(response);
  this.mapStars$ = res;

});
  }
}

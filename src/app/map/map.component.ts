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
import { TweenLite } from 'gsap';

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

  @ViewChild('container', { static: true })
  private _container: ElementRef;

  @ViewChild('matspinner', { static: true })
  spinner: ElementRef<HTMLElement>;

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
        TweenLite.fromTo(this.container, 1.5, { opacity: 0 }, { opacity: 1 });
        clearInterval(loader);
      }
    }, 500);
  }

  printPlanets(planets, event) {
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    const starStats = document.querySelector('#starStats');
    const { layerX } = event[0];
    const { layerY } = event[0];
    starStats.innerHTML = '';

    TweenLite.fromTo(starBox, 0.5, { opacity: 0 }, { opacity: 1 });

    this.dragPosition = { x: layerX + 20, y: layerY - 90 };
    if (this.dragPosition.y < 0) {
      this.dragPosition.y = 0;
    }
    if (this.dragPosition.y + 150 > event[0].view.innerHeight) {
      this.dragPosition.y = layerY - 150;
    }
    if (this.dragPosition.x + 300 > event[0].view.innerWidth) {
      this.dragPosition.x = layerX - 280;
    }

    planets.map((planet) => {
      const li = document.createElement('li');
      li.textContent = planet.pl_name;
      starStats.appendChild(li);
    });

    starBox.style.display = 'flex';
  }

  zoomIn() {}

  ngOnInit() {
    this.loadListen();

    // Service Mapping Stars and Planets onto Star Map
    this.mapService.all().subscribe((response) => {
      this.mapStars$ = response;
    });

    //Offline DB query
    // this.mapService.offline().subscribe((response) => {
    //   let res = JSON.parse(response);
    //   this.mapStars$ = res;
    //   console.log(res);
    // });

    //FOR WRITING OFFLINE DB FILE, PLACE INSIDE mapService.all() call
    // fetch('http://localhost:7777/db', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(response),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
  }
}

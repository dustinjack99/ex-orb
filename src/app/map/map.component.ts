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
  printPlanets,
  getIndexes,
  getPlanets,
  getX,
  getY,
  dimensions,
} from '../shared/services/map.service';
import * as _ from 'lodash';

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
  dragPosition = {
    x: 0,
    y: 0,
  };
  getIndexes;
  getPlanets;
  getX;
  getY;
  img = '../../assets/milky.jpg';
  mapStars$ = new Array();
  printPlanets;
  loading = true;

  @ViewChild('container', { static: true })
  container: ElementRef<HTMLDivElement>;

  @ViewChild('svg', { static: true })
  svg: ElementRef<SVGElement>;

  @ViewChild('matspinner', { static: true })
  spinner: ElementRef<HTMLElement>;

  constructor(private mapService: MapService) {
    this.dimensions = dimensions;
    this.printPlanets = printPlanets;
    this.getIndexes = getIndexes;
    this.getPlanets = getPlanets;
    this.getX = getX;
    this.getY = getY;
  }

  dismissBtn() {
    const starBox = <HTMLDivElement>document.querySelector('#starBox');
    starBox.style.display = 'none';
  }

  loadListen(): any {
    setInterval(() => {
      if (this.svg.nativeElement.children.length < 2) {
        this.loading = true;
      } else {
        this.loading = false;
        this.container.nativeElement.style.display = 'flex';
        this.container.nativeElement.style.justifyContent = 'center';
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
    // makeMap(map.nativeElement);
    this.loadListen();
    //Service Mapping Stars and Planets onto Star Map
    this.mapService.all().subscribe((response) => {
      this.mapStars$ = response;
    });
  }
}

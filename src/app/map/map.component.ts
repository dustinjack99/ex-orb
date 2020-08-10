import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from '../shared/services/map.service';

@Component({
  selector: 'ex-orb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  mapPlanets = null;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    const starMap = this.canvas.nativeElement;

    starMap.width = window.innerWidth;
    starMap.height = window.innerHeight;
    console.log(starMap);
  }
}

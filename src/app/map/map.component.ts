import { Component, OnInit } from '@angular/core';
import { MapService } from '../shared/services/map.service';
import L from 'leaflet';

@Component({
  selector: 'ex-orb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService) {}

  ngOnInit(): void {}
}

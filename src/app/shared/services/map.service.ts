import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';

export interface Planet {
  pl_bmasse: number;
  pl_edelink: string;
  pl_hostname: string;
  pl_name: string;
  pl_orbper: number;
  pl_pelink: string;
  pl_pnum: number;
  pl_rade: number;
  st_glat: number;
  st_glon: number;
  st_metaratio: string;
}

const FULL_URL =
  'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,pl_rade,st_glon,st_glat,st_elat,st_elon,dec,st_metratio&format=json';
const THIN_URL =
  'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_bmasse,st_glon,st_glat,st_metratio';
@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  // to popluate all planet data at top level
  all(): Observable<Planet[]> {
    // axios.get(FULL_URL).then((res) => res.data);
    return this.http.get<Planet[]>(FULL_URL);
  }
}

// Sets Maps Galactic Coordinates onto Canvas Map
const mapBounds = {
  minGlon: 0,
  maxGlon: 360,
  maxGlat: 90,
  minGlat: -90,
};

const dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Navigation for the Star Map
const NAV_MAP = {};

export function makeMap(svg) {
  const starMap = svg.nativeElement;
  const svgImg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'image'
  );

  starMap.setAttribute('height', `${dimensions.height}`);
  starMap.setAttribute('width', `${dimensions.width}`);
  starMap.setAttribute(
    'viewBox',
    `0 0 ${dimensions.width} ${dimensions.height}`
  );

  svgImg.setAttribute('height', `${dimensions.height}`);
  svgImg.setAttribute('width', `${dimensions.width}`);
  svgImg.setAttribute('preserveAspectRatio', 'none');
  svgImg.setAttribute('href', '../../assets/milky.jpg');
  starMap.appendChild(svgImg);
}

//Star Class
export function Star(starStats, map) {
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
      })
    );

    map.nativeElement.appendChild(star);
  };
}

// Finds the coordinates of the X / Y for star based on ecliptic latitude / longitude
export const getX = (x) => {
  let position =
    (x - mapBounds.minGlat) / (mapBounds.maxGlat - mapBounds.minGlat);
  return dimensions.width * position;
};

export const getY = (y) => {
  let yPI = y * Math.PI;
  let position =
    (y - mapBounds.minGlon) / (mapBounds.maxGlon - mapBounds.minGlon);
  return dimensions.height * position;
};

// Gets indexes and planets to push to Star function.
export function getIndexes(res, starName) {
  let indexes = [],
    i;
  for (i = 0; i < res.length; i++) {
    if (res[i].pl_hostname === starName) {
      indexes.push(i);
    }
  }
  return indexes;
}

export function getPlanets(res, indexes) {
  let planets = [];

  for (let i = 0; i < indexes.length; i++) {
    let numI = indexes[i];
    planets.push(res[numI]);
  }
  return planets;
}

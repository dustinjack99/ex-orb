import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  st_metratio: string;
}

const FULL_URL =
  'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,st_elat,st_elon,st_metratio&format=json';

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

  offline() {
    return this.http.get('assets/db.json', {
      responseType: 'text',
      headers: { 'Content-Type': 'appplication/json' },
    });
  }
}

// Sets Maps Galactic Coordinates onto Canvas Map
export const mapBounds = {
  minGlon: 0,
  maxGlon: 360,
  maxGlat: 90,
  minGlat: -90,
};

export const dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Finds the coordinates of the X / Y for star based on ecliptic latitude / longitude
export const getX = (x) => {
  let position =
    (x - mapBounds.minGlat) / (mapBounds.maxGlat - mapBounds.minGlat);
  return dimensions.width * position;
};

export const getY = (y) => {
  let position =
    (y - mapBounds.minGlon) / (mapBounds.maxGlon - mapBounds.minGlon);
  return dimensions.height * position;
};

// Gets indexes and planets to push to Star function.
export const getIndexes = (res, starName) => {
  let indexes = [],
    i;
  for (i = 0; i < res.length; i++) {
    if (res[i].pl_hostname === starName) {
      indexes.push(i);
    }
  }
  return indexes;
};

export const getPlanets = (res, indexes) => {
  let planets = [];

  for (let i = 0; i < indexes.length; i++) {
    let numI = indexes[i];
    planets.push(res[numI]);
  }
  return planets;
};

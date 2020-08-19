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

// Navigation for the Star Map
const NAV_MAP = {
  wheelUp: { act: 'zoom', dir: 1 },
  wheelDown: { act: 'zoom', dir: 1 },
  dragLeft: { act: 'pan', dir: 1 },
  // dragLeft: { act: 'pan', dir: 1 },
  // dragLeft: { act: 'pan', dir: 1 },
  // dragLeft: { act: 'pan', dir: 1 },
};

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

export function makeMap(svg) {
  const starMap = svg.nativeElement;
  const svgImg = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'image'
  );

  //Map of all interactive Stars
  starMap.setAttribute('height', `${dimensions.height}`);
  starMap.setAttribute('width', `${dimensions.width}`);
  starMap.style.zIndex = '-10';
  starMap.setAttribute(
    'viewBox',
    `0 0 ${dimensions.width} ${dimensions.height}`
  );

  // starMap.prepend(svgImg);

  //Galaxy Image
  svgImg.setAttribute('height', `${dimensions.height}`);
  svgImg.setAttribute('width', `${dimensions.width}`);
  svgImg.setAttribute('preserveAspectRatio', 'none');
  svgImg.setAttribute('href', '../../assets/milky.jpg');
  svgImg.style.position = 'absolute';
  svgImg.style.zIndex = '-9';
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlanetMapService {
  query =
    //full planet data
    // 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,pl_rade,st_glon,st_glat,st_metratio,pl_edelink,pl_pelink&format=json';
    //base planet data
    'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_name,pl_bmasse,st_glon,st_glat&format=json';

  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get(`${this.query}`);
  }

  // getPlanetId(id) {
  //   return `${this.all}`
  // }
}

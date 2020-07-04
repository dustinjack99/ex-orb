const apiKey = '1SIasJixVbclLj0bvF93Z0Yf9hxqa7EaaDklQ9Ba';

const query =
  'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,pl_rade,st_glon,st_glat,st_metratio, pl_edelink, pl_pelink&format=json';

//NOTES ON DATA//

//pl_hostname = planet's start
//pl_name = planet name
//pl_pnum = # of planet's in system
//pl_orbper = Time in days (earth) for planet to orbit host star
//pl_bmasse = Mass of planet measured in earths.
//pl_rade = radius from denter of core measured in earth radii.
//st_glon = galactic longitutde.
//st_glat = galactic latitude.
//st_metatario = measurement of metals in star system
//pl_edelink = link to Expoplanet Data Explorer
//pl_pelink = link to Exoplanet Encyclopaedia

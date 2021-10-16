import axios from "axios";
import { gsap } from "gsap";
import "regenerator-runtime/runtime";
import "core-js/stable";
const url = `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,st_elat,st_elon,st_metratio&format=json`;
const url2 = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,st_elat,st_elon,st_metratio&format=json`;

const mapBounds = {
  minGlon: 0,
  maxGlon: 360,
  maxGlat: 90,
  minGlat: -90,
};
// to popluate all planet data at top level
export const all = async () => {
  const resp = await axios.get(url);
  let string = resp.data.replace(/(\*\*\*).*(html)/g, "");
  return JSON.parse(string);
};
export const offline = async () => {
  return await axios.get("assets/db.json", {
    responseType: "text",
    headers: { "Content-Type": "appplication/json" },
  });
};

export const getX = (x, dimensions) => {
  let position = (x - mapBounds.minGlat) / (mapBounds.maxGlat - mapBounds.minGlat);
  return dimensions.width * position;
};

export const getY = (y, dimensions) => {
  let position = (y - mapBounds.minGlon) / (mapBounds.maxGlon - mapBounds.minGlon);
  return dimensions.height * position;
};

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

export const printPlanets = (planets, event, setCurrentSystem, dragPosition, setDragPosition) => {
  const starBox = document.querySelector(".starBox");
  const { layerX } = event[0];
  const { layerY } = event[0];

  setCurrentSystem(planets);

  const starBounds = {
    x: `${event[0].path[0].getBBox().x}`,
    y: `${event[0].path[0].getBBox().y}`,
    width: `${event[0].path[0].getBBox().width}`,
    height: `${event[0].path[0].getBBox().height}`,
  };

  gsap.fromTo(starBox, { opacity: 0 }, { opacity: 1 }, 0.5);

  setDragPosition({ x: layerX + 20, y: layerY - 90 });
  if (dragPosition.y < 0) {
    setDragPosition({ ...dragPosition }, (dragPosition.y = 0));
  }
  if (dragPosition.y + 150 > event[0].view.innerHeight) {
    setDragPosition({ ...dragPosition }, (dragPosition.y = layerY - 150));
  }
  if (dragPosition.x + 300 > event[0].view.innerWidth) {
    setDragPosition({ ...dragPosition }, (dragPosition.x = layerX - 320));
  }

  starBox.setAttribute("zoomBox", JSON.stringify(starBounds));
  starBox.style.display = "flex";
};

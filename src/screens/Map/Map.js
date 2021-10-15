import React, { useEffect, useState } from "react";
import StarBox from "./components/StarBox";
import axios from "axios";
import { gsap } from "gsap";
import "./map.css";
// Finds the coordinates of the X / Y for star based on ecliptic latitude / longitude
const mapBounds = {
  minGlon: 0,
  maxGlon: 360,
  maxGlat: 90,
  minGlat: -90,
};

const getX = (x, dimensions) => {
  let position =
    (x - mapBounds.minGlat) / (mapBounds.maxGlat - mapBounds.minGlat);
  return dimensions.width * position;
};

const getY = (y, dimensions) => {
  let position =
    (y - mapBounds.minGlon) / (mapBounds.maxGlon - mapBounds.minGlon);
  return dimensions.height * position;
};

// Gets indexes and planets to push to Star function.
const getIndexes = (res, starName) => {
  let indexes = [],
    i;
  for (i = 0; i < res.length; i++) {
    if (res[i].pl_hostname === starName) {
      indexes.push(i);
    }
  }
  return indexes;
};

const getPlanets = (res, indexes) => {
  let planets = [];

  for (let i = 0; i < indexes.length; i++) {
    let numI = indexes[i];
    planets.push(res[numI]);
  }
  return planets;
};

const printPlanets = (
  planets,
  event,
  setCurrentSystem,
  dragPosition,
  setDragPosition
) => {
  const starBox = document.querySelector(".starBox");
  const { layerX } = event[0];
  const { layerY } = event[0];

  // if (this.opened) {
  //   this.open();
  // }

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

const Map = () => {
  const [currentSystem, setCurrentSystem] = useState({});
  const [mapStars, setMapStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });

  const area = `0 0 ${dimensions.width} ${dimensions.height}`;
  const url = `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,st_elat,st_elon,st_metratio&format=json`;
  const url2 = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,st_elat,st_elon,st_metratio&format=json`;

  // to popluate all planet data at top level
  const all = async () => {
    const resp = await axios.get(url);
    let string = resp.data.replace(/(\*\*\*).*(html)/g, "");
    return JSON.parse(string);
  };
  const offline = async () => {
    return await axios.get("assets/db.json", {
      responseType: "text",
      headers: { "Content-Type": "appplication/json" },
    });
  };
  const loadListen = async () => {
    let loader;
    const svg = document.querySelector("#svg");
    const container = document.querySelector(".container");
    console.log(svg);
    console.log(container);
    loader = setInterval(async () => {
      if (loading) {
        setMapStars(await all());
        setLoading(false);
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.border = "1px solid blue";
        container.style.borderRadius = "5px";
        container.style.padding = "30px 0px 30px 0px";
        gsap.fromTo(container, { opacity: 0 }, { opacity: 1 }, 0.5);
        clearInterval(loader);
      }
    }, 10);
  };
  useEffect(() => {
    if (mapStars.length === 0) {
      loadListen();
    }
  }, []);
  console.log(loading);
  return (
    <>
      {/* <StarBox /> */}

      {loading ? (
        <div className="spinner">
          <h2>Loading the Milky Way...</h2>
        </div>
      ) : (
        <div className="container">
          <svg
            height={dimensions.height}
            width={dimensions.width}
            viewBox={area}
            className="svg"
            id="svg"
            fill="red"
            preserveAspectRatio="xMidYMin slice"
            style={{ width: "90%", height: "70%", overflow: "visible" }}
          >
            <image
              id="svgImg"
              className="svgImg"
              preserveAspectRatio="none"
              href="../../assets/milky-min.jpg"
              width={dimensions.width}
              height={dimensions.height}
            ></image>
            {mapStars.map((star, i) => {
              return (
                <circle
                  key={star.pl_hostname + i}
                  cx={getX(star.st_elat, dimensions)}
                  cy={getY(star.st_elon, dimensions)}
                  className="stars"
                  id="star"
                  r="0.5%"
                  name={star.pl_hostname}
                  onClick={(e) => {
                    printPlanets(
                      getPlanets(
                        mapStars,
                        getIndexes(mapStars, star.pl_hostname)
                      ),
                      e,
                      setCurrentSystem,
                      dragPosition,
                      setDragPosition
                    );
                  }}
                />
              );
            })}
          </svg>
        </div>
      )}
    </>
  );
};

export default Map;
